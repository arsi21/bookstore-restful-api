# Bookstore RESTful API

The Bookstore RESTful API is a web service designed to manage the inventory of a bookstore. It provides endpoints to perform CRUD (Create, Read, Update, Delete) operations on books and retrieve information about the bookstore's inventory.

## Features

- Create a new book with details such as title, author, ISBN, price, and quantity.
- Retrieve a list of all books in the bookstore's inventory.
- Retrieve information about a specific book by its ID.
- Update the information of an existing book.
- Delete a book from the inventory.
- User authentication and authorization for protected endpoints.
- User registration and profile management.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication
- Bcrypt.js for password hashing
- Mongoose ORM for MongoDB integration

## Installation

1. Clone the repository:

```
git clone https://github.com/arsi21/bookstore-restful-api.git
```

2. Navigate to the project directory:

```
cd bookstore-restful-api
```

3. Install the dependencies:

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

6. The API server will start running at `http://localhost:5000` or any value you provide in `PORT`.

## Usage

You can interact with the Bookstore RESTful API using an HTTP client such as cURL or Postman. Please refer to the [API documentation](./API_DOCUMENTATION.md) for detailed information about the available endpoints and their functionalities.

## Error Handling

In case of an error, the API will respond with the appropriate HTTP status code and an error message in the response body. Refer to the [API documentation](./API_DOCUMENTATION.md) for more details about error handling.