# crm-AgMon-api

# 1. Description
This project is a Node API to manage a customers/users administration site. The API manages users and customers and is very easily extendable.

# 2. How to run the application

## 2.1. Running the project locally
You can run the project locally with your own local [Postgres](https://www.postgresql.org) instance.

You need to do a copy of the file .env.sample and rename that to .env and later update the configuration variables to your local values


```
PORT=<port> # port you want to run the application
HOST=<host> # host where is running the application

# INITIAL USER
# This parameters are going to generate the first user in the application 
INITIAL_USER_NAME=<seed user name> 
INITIAL_USER_EMAIL=<seed user email>
INITIAL_USER_PASSWORD=<seed user password>


# JWT SECRET KEY
JWT_SECRET_KEY=<secret key>

# DATABASE PARAMETERS
# the first time you are going to run the application we suggest do synchronize true to auto-generate the DB.
DB_SYNCHRONIZE=<true or false>
DB_USER=<db user>
DB_PASSWORD=<db Password>
DB_HOST=<db Host> # in local usually is localhost
DB_PORT =<db Port> # if its postgres usually is 5432
DB_DATABASE=<db database>
```

Open a terminal and run this command in the root directory.

```
npm install
npm run dev
```

Later you can run this command to check if its running well the api.

```
curl http://localhost:PORT/ping
```
You will receive the below response: 
```
pong
```

## 2.2. Running the project locally with docker compose
You need to have Docker ([Docker](https://www.docker.com/)) up and running in your system

To launch the application just follow the next steps:

- Replace DB_HOST parameter in .env.docker with the according value.in one field:
  ```
  # the DB host should be this value to connect to the api
  DB_HOST=database
  ``` 

- You need to run this command
  ```
  docker-compose up
  ```
 

 # 3. Documentation
There is a swagger document you can use in swagger page.
 - you can copy & paste the swagger yaml document from
```
config/swagger.json
```

