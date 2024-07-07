# Disc Inventory Management System - Backend API

This project is the backend API for the Disc Inventory Management System, designed to support a Disc Golf Store's inventory management and e-commerce functionalities. It is built using Express, MongoDB, and AWS S3.


The admin view can be found here: [Link](https://debonair-rounded-opinion.glitch.me/catalog)

The frontend for the E-Commerce store can be found here: [Link](https://barrysdiscs.netlify.app/)

## Features

### Admin Portal
The Admin Portal serves as the administrative interface for managing the store's inventory. It allows administrators to:
- Create and manage manufacturers
- Define and manage disc types
- Add and manage individual disc models
- Create instances of each disc

Administrators can populate the MongoDB database with the relevant information after logging in with a username and password. All admin routes are protected with JWT authentication to ensure secure access.

### E-Commerce API
The backend API also supports the frontend display of the e-commerce page. It provides the necessary endpoints to:
- Display discs available for sale
- Retrieve detailed information about each disc, including all its specifications

## Technologies Used
- **Express**: Web framework for Node.js, used for building the API
- **MongoDB**: NoSQL database for storing inventory data
- **AWS S3**: Storage service for storing and retrieving disc images
- **JWT Authentication**: Ensures secure access to admin routes

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB
- AWS S3 account and credentials

### Installation

1. Clone the repository:

    ```sh
    git clone git@github.com:johnobriendev/discAPI.git
    cd discAPI
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following:

    ```sh
    MONGODB_URI=mongodb://localhost:27017/disc-inventory
    PORT=3000
    AWS_ACCESS_KEY_ID=your_access_key
    AWS_SECRET_ACCESS_KEY=your_secret_key
    S3_BUCKET_NAME=your_s3_bucket_name
    ```

### Running the Application

```sh
npm start
```
The application will be running at `http://localhost:3000`.


## Usage

### Admin Routes
- **GET /login**: Render the login form
- **POST /login**: Authenticate as an admin
- **POST /logout**: Logout an authenticated admin

### Disc Routes
- **GET /disc/create**: Retrieve the form to create a new disc
- **POST /disc/create**: Create a new disc (requires authentication)
- **GET /disc/:id/delete**: Retrieve the form to delete a specific disc
- **POST /disc/:id/delete**: Delete a specific disc (requires authentication)
- **GET /disc/:id/update**: Retrieve the form to update a specific disc
- **POST /disc/:id/update**: Update a specific disc (requires authentication)
- **GET /disc/:id**: Retrieve details of a specific disc
- **GET /discs/**: Retrieve a list of all discs available

### Manufacturer Routes
- **GET /manufacturer/create**: Retrieve the form to create a new manufacturer
- **POST /manufacturer/create**: Create a new manufacturer (requires authentication)
- **GET /manufacturer/:id/delete**: Retrieve the form to delete a specific manufacturer
- **POST /manufacturer/:id/delete**: Delete a specific manufacturer (requires authentication)
- **GET /manufacturer/:id/update**: Retrieve the form to update a specific manufacturer
- **POST /manufacturer/:id/update**: Update a specific manufacturer (requires authentication)
- **GET /manufacturer/:id**: Retrieve details of a specific manufacturer
- **GET /manufacturers/**: Retrieve a list of all manufacturers

### Disc Type Routes
- **GET /disctype/create**: Retrieve the form to create a new disc type
- **POST /disctype/create**: Create a new disc type (requires authentication)
- **GET /disctype/:id/delete**: Retrieve the form to delete a specific disc type
- **POST /disctype/:id/delete**: Delete a specific disc type (requires authentication)
- **GET /disctype/:id/update**: Retrieve the form to update a specific disc type
- **POST /disctype/:id/update**: Update a specific disc type (requires authentication)
- **GET /disctype/:id**: Retrieve details of a specific disc type
- **GET /disctypes/**: Retrieve a list of all disc types

### Disc Instance Routes
- **GET /discinstance/create**: Retrieve the form to create a new disc instance
- **POST /discinstance/create**: Create a new disc instance (requires authentication)
- **GET /discinstance/:id/delete**: Retrieve the form to delete a specific disc instance
- **POST /discinstance/:id/delete**: Delete a specific disc instance (requires authentication)
- **GET /discinstance/:id/update**: Retrieve the form to update a specific disc instance
- **POST /discinstance/:id/update**: Update a specific disc instance (requires authentication)
- **GET /discinstance/:id**: Retrieve details of a specific disc instance
- **GET /discinstances/**: Retrieve a list of all disc instances


### E-Commerce Routes
- **GET /discinstance/:id**: Retrieve details of a specific disc instance
- **GET /discinstances/**: Retrieve a list of all disc instances


## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.





