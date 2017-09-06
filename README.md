# NodeJS MySQL

This app defines a very neat and modular structure to start you next nodejs project.

Using: MySQL, NodeJS, Express, Bookshelf, Knex, Json Web Token(JWT)

Using ES6, with Babel (http://babeljs.io/)


## Pre-requisites:
1. NodeJS (https://nodejs.org/en/)
2. Globally installed nodemon (https://nodemon.io/)


## Steps to run:
```
git clone git@gitlab.com:username/reponame.git
cd reponame
cp env.example .env
nano .env #now edit credentials according to your machine (mandatory for db connection)
npm install
```
Now to migrate Database
```
npm install knex -g

# To create the tables
npm run migrate-up

# To drop the tables
npm run migrate-down
```
Now to start the server
```
npm start
```
The app will be started on the mentioned port which will be printed in the console upon starting the server like: `http://localhost:8080`.


## Available routes
```
-> GET / : (open*) Just show the message
-> POST / : (open*) Another message.

-> GET /users : (open*) Show all the users in the app

-> POST /users/filter : Show filter users detail(), TO check the filter data, add this object in POSTMAN as post filter data

<<<<<<< HEAD
	{"filter" : [{"filterby":"cell_number","value":"%11%","type":"like","tab":"user"},{"filterby":"firstname","value":"%uo%","type":"like","tab":"identity"}]}

-> Get /user/:id   Show specific user detail
 
->Get /user/holdings/:id   To get account and currency detail of specific user

->  Get /user/transactions/:id    To get user Transactions 
=======
	{"filter" : [{"filterby":"email","value":"ac@eratVivamus.org","type":"like"}]}

>>>>>>> ce701b9d6b450681293af256f47cc03fd4d9267b


# guide
open* - means route is un-protected, anyone can access the route
protected* - means a valid jwt token has to be used to access the route in header "Authorization" with value "Bearer {token}"
```
