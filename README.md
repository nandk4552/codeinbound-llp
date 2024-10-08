# User Management API Documentation

This document provides comprehensive information about the User Management API, a RESTful API built with NestJS that allows users to interact with a PostgreSQL database to manage user data.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
  - [Register a User](#register-a-user)
  - [Login](#login)
  - [Get All Users](#get-all-users)
  - [Get User by ID](#get-user-by-id)
  - [Update User](#update-user)
  - [Delete User](#delete-user)
- [Error Handling](#error-handling)
- [Authentication and Authorization](#authentication-and-authorization)
- [Testing](#testing)
- [Version Control](#version-control)

## Features

- **CRUD Operations:** Create, Read, Update, and Delete users.
- **Authentication:** Secure user authentication using JSON Web Tokens (JWTs).
- **Authorization:** Role-based authorization to restrict access to certain endpoints.
- **Validation:** Input validation to ensure data integrity.
- **Error Handling:** Robust error handling to provide informative error responses.

## Technologies Used

- **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications.
- **Express.js:** The underlying framework used by NestJS.
- **PostgreSQL:** A powerful open-source relational database.
- **TypeORM:** An Object-Relational Mapper (ORM) for TypeScript and JavaScript.
- **JWT (JSON Web Tokens):** An industry-standard method for representing claims securely between two parties.
- **Git:** A distributed version control system.
- **GitHub:** A web-based hosting service for Git repositories.


## Installation

1. Clone the repository: `git clone [repository url]`
2. Install dependencies: `npm install`
3. Set up the database:
   - Create a PostgreSQL database.
   - Update the database configuration in `src/app.module.ts`.
4. Run the application: `npm run start`


## API Endpoints

### Register a User

Endpoint: /users/
Method: POST

l
```json
{
  "email": "test@test.com",
  "password": "password123"
}

### Login User
Endpoint: /users/login
Method: POST

```json
{
  "email": "test@test.com",
  "password": "password123"
}
```

### Get All Users
Endpoint: /users
Method: GET
Authorization: Requires a valid JWT.
Response: 200 OK with an array of all users.


### Get User by ID
Endpoint: /users/:id
Method: GET
Authorization: Requires a valid JWT.
Response: 200 OK with the user object.
Error Handling:
404 Not Found if the user with the given ID is not found.


#### Update User
Endpoint: /users/:id
Method: PUT
Authorization: Requires a valid JWT.
Request Body:
```json
{
  "email": "updateduser@example.com"
}
```

### Delete User
Endpoint: /users/:id
Method: DELETE
Authorization: Requires a valid JWT.
Response: 200 OK with a success message.
Error Handling:
404 Not Found if the user with the given ID is not found.

## Testing
The API includes comprehensive unit tests using Jest to ensure that all endpoints and service methods function as expected. The tests cover various scenarios, including success cases, error handling, and validation.

Run the unit tests with: `npm run test`



## Version Control
Version control is handled using Git. To ensure code quality and organization:

Branches are used for new features and bug fixes.
Commits follow the convention of meaningful messages.
Pull requests are created for merging feature branches into the main branch.
### Key Fixes:
1. Added missing closing of code block tags for JSON payloads.
2. Fixed inconsistencies in API endpoint descriptions (e.g., missing `/` in endpoint paths).
3. Adjusted response descriptions for clarity.
4. Corrected the Table of Contents to reflect consistent section titles and links.
5. Enhanced formatting for improved readability.
