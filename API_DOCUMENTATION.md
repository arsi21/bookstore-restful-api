# Bookstore RESTful API Documentation

## Introduction
The Bookstore RESTful API is a project aimed at providing a web service for managing a bookstore's inventory. It allows users to perform CRUD (Create, Read, Update, Delete) operations on books, as well as retrieve information about the bookstore's inventory.

This documentation will guide you through the installation, usage, and available endpoints of the Bookstore RESTful API.

## Installation
To install and run the Bookstore RESTful API, please follow the steps below:

1. Clone the repository from GitHub:

```
git clone https://github.com/arsi21/bookstore-restful-api.git
```


2. Navigate into the project directory:

```
cd bookstore-restful-api
```

3. Install the required dependencies using npm:

```
npm install
```

4. Create a configuration file:
- Copy the provided `.env.example` file and rename it to `.env`.
- Edit the `.env` file and set the desired values for the environment variables, such as the database connection details.

5. Start the application:

```
npm start
```


6. The API server will start running on `http://localhost:3000`.

## Usage
Once the Bookstore RESTful API is up and running, you can interact with it using an HTTP client like cURL or Postman. Below, you will find the available endpoints and their functionalities.

### Authentication
Some endpoints require authentication. To authenticate, send a POST request to the `/auth/login` endpoint with valid credentials. The response will contain a JSON Web Token (JWT) that you can use to authorize subsequent requests.

```
http
POST /auth/login
Content-Type: application/json

{
"username": "your-username",
"password": "your-password"
}
```

Include the JWT in the Authorization header of subsequent requests:

```
Authorization: Bearer your-jwt-token
```

## Endpoints
Book endpoints
- Create a book: Add a new book to the bookstore's inventory.

```
POST /books
Content-Type: application/json

{
  "title": "Book Title",
  "author": "Book Author",
  "isbn": "1234567890",
  "price": 19.99,
  "quantity": 10
}

```

- Get all books: Retrieve a list of all books in the bookstore's inventory.

```
GET /books
```

- Get a specific book: Retrieve information about a specific book by its ID.

```
GET /books/{id}
```

- Update a book: Update the information of a specific book.

```
PUT /books/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Updated Author",
  "isbn": "0987654321",
  "price": 24.99,
  "quantity": 5
}
```

- Delete a book: Remove a specific book from the bookstore's inventory.

```
DELETE /books/{id}
```

User endpoints
- Create a user: Register a new user account.

```
POST /users
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123"
}
```
- Get user profile: Retrieve information about the authenticated user.

```
GET /users/profile
```

## Error Handling
In case of an error, the API will respond with the appropriate HTTP status code and an error message in the response body.

- `400 Bad Request`: The request was invalid or malformed.
- `401 Unauthorized`: The request requires authentication or the provided credentials are invalid.
- `403 Forbidden`: The authenticated user does not have sufficient permissions to access the resource.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An unexpected error occurred on the server.

## Conclusion
This concludes the documentation for the Bookstore RESTful API. You can now start exploring the endpoints and integrating the API into your applications. For more details about the request and response formats, please refer to the API code and documentation in the GitHub repository. If you have any questions or issues, please don't hesitate to reach out to the project maintainer.