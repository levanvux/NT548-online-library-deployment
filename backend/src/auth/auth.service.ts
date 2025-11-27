import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

interface JwtPayload {
  sub: number; // ID người dùng
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const { username, email, password } = dto;

    const exists = await this.usersRepo.findOne({
      where: [{ username }, { email }],
    });

    if (exists) {
      throw new ConflictException('Tên đăng nhập hoặc email đã tồn tại');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = this.usersRepo.create({
      username,
      email,
      passwordHash,
      role: 'user',
      isActive: 1,
    });

    const saved = await this.usersRepo.save(newUser);

    return {
      id: saved.id,
      username: saved.username,
      email: saved.email,
      role: saved.role,
      isActive: Boolean(saved.isActive),
    };
  }

  async login(dto: LoginDto) {
    const { username, password } = dto;

    const user = await this.usersRepo.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('Tài khoản không tồn tại');
    if (!user.isActive) throw new UnauthorizedException('Tài khoản bị khóa');

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) throw new UnauthorizedException('Mật khẩu không chính xác');

    const accessToken = this.createAccessToken(user.id);
    const refreshToken = this.createRefreshToken(user.id);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: Boolean(user.isActive),
      },
      accessToken,
      refreshToken,
    };
  }

  createAccessToken(userId: number) {
    return this.jwtService.sign(
      { sub: userId },
      {
        secret: this.config.get('JWT_ACCESS_SECRET'),
        expiresIn: this.config.get('JWT_ACCESS_EXPIRES') ?? '15m',
      },
    );
  }

  createRefreshToken(userId: number) {
    return this.jwtService.sign(
      { sub: userId },
      {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get('JWT_REFRESH_EXPIRES') ?? '7d',
      },
    );
  }

  async refresh(refreshToken: string) {
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Refresh token không hợp lệ');
    }

    const user = await this.usersRepo.findOne({
      where: { id: payload.sub },
    });

    if (!user) throw new UnauthorizedException('User không tồn tại');
    if (!user.isActive) throw new UnauthorizedException('Tài khoản bị khóa');

    const newAccess = this.createAccessToken(user.id);
    const newRefresh = this.createRefreshToken(user.id);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken: newAccess,
      refreshToken: newRefresh,
    };
  }

  sendTokens(res: Response, access: string, refresh: string) {
    const isProd = this.config.get('NODE_ENV') === 'production';

    res.cookie('access_token', access, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', refresh, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
