# Disc Inventory API

This is the backend API for the disc inventory management system. It is built with Express, MongoDB, and AWS S3. This projects serves as an Admin portal for an inventory of a Disc Golf Store, where the admin can create manufacturers, disc types, discs, and instances of a disc. The Admin view allows the admin to populate the mongoDB database with this information. It also serves as API for the frontend display of an E-Commerce page for the disc golf store, where the discs stored in the database are displayed forsale with all of their characteristics. 
The admin view can be found here: [Link](https://debonair-rounded-opinion.glitch.me/catalog)
The frontend for the E-Commerce store can be found here: [Link](https://barrysdiscs.netlify.app/)

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

The application will be running at `http://localhost:3000`.

## API Endpoints

- `GET /catalog/discinstances`: List all disc instances
- `GET /catalog/discinstances/:id`: Get a specific disc instance
- `POST /catalog/discinstances`: Create a new disc instance
- `PUT /catalog/discinstances/:id`: Update a disc instance
- `DELETE /catalog/discinstances/:id`: Delete a disc instance


