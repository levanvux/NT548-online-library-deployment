# eShelf Project

## Requirements

- Docker
- Node.js & npm

## MySQL

```bash
docker run --name eshelf-mysql -p 3307:3306 \
-e MYSQL_ROOT_PASSWORD=root_password \
-e MYSQL_DATABASE=eshelf_db \
-e MYSQL_USER=eshelf_user \
-e MYSQL_PASSWORD=eshelf_password \
-v eshelf-mysql-data:/var/lib/mysql -d mysql
```

## Backend

```bash
cd backend
npm install
npm run start:dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: [http://localhost:3000](http://localhost:3000)
