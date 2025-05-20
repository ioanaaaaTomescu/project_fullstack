# Project setup

$ npm install

# Database setup

docker run --name my-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres:14

docker exec -it my-postgres env

docker exec -it my-postgres psql -U admin

npx prisma migrate dev --name init

npm install -D ts-node

The file for the databae -> docker-compose.yml

Populate the database
npx prisma db seed
Compile and run the project
# development
front end: 
$ npm run start
back-end:
$ npm run start:dev

Links
back-end: http://localhost:3000

front-end: http://localhost:5173

Routes
for login: http://localhost:5173/auth/login

for invoices: http://localhost:5173/invoices

for one invoice: http://localhost:5173/invoices/f6ecfeb6-aa54-436a-be62-e3072094512d

Credentials for the login
{ "email": "admin@test.com", "password": "password123" }# project_fullstack
