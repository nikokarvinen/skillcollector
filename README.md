# Skill Collector

## Description

Created with universities and IT companies in mind, Skill Collector is a user-friendly tool that originated from the WimmaLab course at the Jamk University of Applied Sciences. Its purpose is to pinpoint exactly what skills businesses are looking for in recent graduates. This information can then be used by universities to shape their courses, ensuring they are preparing students for the realities of the job market. Companies also benefit from this process, as they can expect a pool of candidates better suited to meet industry challenges.

To accomplish its task, Skill Collector works with widely used programs like Excel and Power Automate. It sends out surveys, collects responses, and then leverages Power BI to present the data in an easy-to-understand format.

## Setting up the Application

Skill Collector is crafted using popular technologies such as Node.js, Express, Vue.js, TypeScript, and PostgreSQL. This guide will assist you in setting up the application and will explain its functionalities in a simple way.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Docker](#docker)
- [Database](#database)
- [User Management](#user-management)
- [API Documentation](#api-documentation)
- [Power Automate](#power-automate)
- [Testing](#testing-for-skill-collector)
- [WIMMA Lab](#wimma-lab)

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- Postman, Thunder Client or similar tool to test API calls
- Git to clone the repositories

## Installation

1. Clone the skillcollector repository.

```bash
git clone https://github.com/nikokarvinen/skillcollector.git

```

## Docker

### Navigate to docker folder and run Docker Compose to start the services.

```bash
cd skill-collector-1-0-docker
docker-compose up -d
```

Upon running the Docker Compose, a default hash 0123456789 is created in the database. You can use this hash to test the service. The frontend of the service will be running on your local machine and can be accessed by navigating to http://localhost:5173.

## Database

### Database Initialization

When you run docker-compose up for the first time, Docker Compose will execute the init.sql script which sets up the PostgreSQL database. This script does the following:

- Creates a role named skillcollector with the password skillcollector.
- Connects to the default postgres database and creates a new database named answerdb, owned by skillcollector.
- Connects to the answerdb database as skillcollector and creates four tables: ratings, skills, users and user_credentials.
- Changes the ownership of all tables to skillcollector.
- Inserts a default user with the hash 0123456789 into the users table.

The init.sql script is only run the first time you run docker-compose up. If you need to reinitialize the database, you need to stop Docker Compose and remove the volume where PostgreSQL stores its data, and then run docker-compose up again. Here are the steps to do that:

```bash
docker-compose down
docker volume rm pgdata
docker-compose up -d

```

### Connect to the Database

```bash
docker exec -it postgres psql -U skillcollector -d answerdb
```

### Add a New User

```bash
insert into users (user_hash) values ('1234567890');
```

## User Management

```bash
You can register, login, and delete users using the provided API endpoints. For these operations, use a tool like Postman or Thunder Client.

```

### JWT Authentication

```bash
Upon successful registration or login, the server sets a JWT in an HttpOnly cookie in the client. This token is used for subsequent authentication of requests.

When testing with Postman:
- Send a `POST` request to `/register` or `/login` with the `username` and `password` in the request body.
- After sending the request, go to the "Cookies" tab in Postman. You should see a cookie named "token". This cookie will automatically be included in your subsequent requests to the server.

Please note that the token is set to expire after 2 hours. You would need to re-login after this period to get a new token.

```

### Register a User

- Set the request method to POST
- Enter the URL http://localhost:3000/api/register
- Go to the "Body" tab and select the "raw" radio button
- From the dropdown menu, select "JSON"
- In the request body field, enter the following:

```bash
{
"username": "YourUsername",
"password": "YourPassword"
}
```

### Login as a User

- Set the request method to POST
- Enter the URL http://localhost:3000/api/login
- Go to the "Body" tab and select the "raw" radio button
- From the dropdown menu, select "JSON"
- In the request body field, enter the following:

```bash
{
"username": "YourUsername",
"password": "YourPassword"
}
```

### Deleteting a User

To delete a user, you must be authenticated with a valid token. The following instructions will guide you through the process.

1. Obtain an authentication token:

- Set the request method to POST
- Enter the URL http://localhost:3000/api/login
- Go to the "Body" tab and select the "raw" radio button
- From the dropdown menu, select "JSON"
- In the request body field, enter the following:

```bash
{
  "username": "YourUsername",
  "password": "YourPassword"
}

Click "Send". If successful, you should receive a response containing a token:

{
  "token": "TheAuthenticationToken"
}
```

2. Delete a user:

- Set the request method to DELETE
- Enter the URL http://localhost:3000/api/users/<UserID> (Replace <UserID> with the id of the user you want to delete)
- Click "Send"

## API Documentation

The application exposes various endpoints for handling user management, skill management, and rating operations. Some endpoints require JWT authentication, and the auth middleware is used for these routes.

1. Check if a user hash exists: `GET http://localhost:3000/api/:hash` - This endpoint checks if a user hash exists in the database. A successful request returns a 200 status with a message that the hash exists, and an unsuccessful request returns a 401 status with a message that the hash does not exist.
2. Update user data: `PUT http://localhost:3000/api/:hash` - This endpoint updates user data in the database. It expects a request body containing user data and validates it before saving.
3. User login: `POST http://localhost:3000/login`- This endpoint handles user login. It expects a request body with username and password fields. If the login details are correct, it returns a JWT token in an HTTP-Only cookie that expires in 2 hours. This cookie is set to be secure and will only be sent over HTTPS when not in development.
4. Save ratings: `POST http://localhost:3000/ratings` - This endpoint saves user ratings to the database. It expects a request body with a user_hash and ratings fields.
5. User registration: `POST http://localhost:3000/registe` - This endpoint registers a new user. It expects a request body with username and password fields. The username should be alphanumeric and between 3 to 30 characters, and the password should be a string matching the pattern '^[a-zA-Z0-9]{3,30}$'. Upon successful registration, the server responds with a 201 status code, a JWT token in an HTTP-Only cookie, and a message stating "User created successfully". If the username already exists in the database, the server responds with a 400 status code and a message stating "Username already taken".
6. Fetch skills: `GET http://localhost:3000/skills` - This endpoint fetches skills from the skills database.
7. Fetch all users:`GET http://localhost:3000/use` - Requires Authentication. This endpoint fetches all users from the database.
8. Fetch a specific user: `GET http://localhost:3000/user/:id`- Requires Authentication. This endpoint fetches a specific user from the database using the user's id.
9. Add a new user: `POST http://localhost:3000/use` - Requires Authentication. This endpoint adds a new user to the database. It expects a user object or an array of user objects in the request body.
10. Delete a user: `DELETE http://localhost:3000/user/:i` - Requires Authentication. This endpoint deletes a user from the database using the user's id. A successful request returns a 200 status with a message "User deleted successfully", and an unsuccessful request returns a 404 status with a message "User not found or could not be deleted".
11. Fetch all answers: `GET http://localhost:3000/api/answer` - Requires Authentication. This endpoint fetches all answers from the database. It requires JWT authentication via a cookie. If the JWT authentication fails, it returns an error message with a 401 status code. If the request is successful, it returns a 200 status code with a JSON object containing all the answers from the database.

Note: For all endpoints that require authentication, an HTTP-Only cookie named token containing a valid JWT should be included in the request. This cookie is set upon successful user login.

```bash
For detailed error messages and status codes, please refer to the specific route implementation in the backend repository.

Please replace http://localhost:3000 with the actual server URL if the application is deployed elsewhere. The route paths remain the same.
```

## Power Automate

### Register a User and Login

1. Open Power Automate and click on "Create". Then choose "Instant flow".
2. Name your flow and select "Manually trigger a flow" in the dropdown, then click on "Create".
3. Click on "New Step". In the search bar, type "http" and select "HTTP - HTTP".
4. Set the Method to "POST", and Uri to your API endpoint for user registration, e.g., "http://localhost:3000/api/register".
5. In the Headers, put "Content-Type" as Key and "application/json" as Value.
6. In the Body, enter your desired username and password in this format:

```bash
{
  "username": "YourUsername",
  "password": "YourPassword"
}
```

Save the flow and test it. If everything is set up correctly, you should receive a "201 Created" status with the user ID and a message indicating the user was created successfully.

To login, follow the same steps, but replace the Uri with the login endpoint (e.g., "http://localhost:3000/api/login"), and replace the Body with the username and password you just registered. Save and test the flow. You should receive a JWT token in the response.

### Use the JWT Cookie to Get Answers

1. Create a new instant flow as before.
2. In the new step, again select "HTTP - HTTP".
3. Set the Method to "GET" and Uri to your API endpoint for fetching answers, e.g., "http://localhost:3000/api/answers".
4. This time in the Headers, you need two keys and values:
   "Content-Type" as Key and "application/json" as Value.
   "Cookie" as Key and "YourJWTToken" as Value. Replace "YourJWTToken" with the cookie you received when you logged in.
5. Save the flow and test it. If everything is set up correctly, you should receive a "200 OK" status with the list of all answers from the API.

## Testing for Skill Collector

Link to the testing repository: https://github.com/ughhuh/skill-collector-1.0-test-automation

## WIMMA Lab

More information about WIMMA Lab: https://www.wimmalab.org

[**Back to Table of Contents**](#table-of-contents)
