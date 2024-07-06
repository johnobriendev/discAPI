# Disc Inventory API

This is the backend API for the disc inventory management system.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB
- AWS S3 account and credentials

### Installation

1. Clone the repository:

    ```sh
    git clone 
    cd 
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

- `GET /api/discinstances`: List all disc instances
- `GET /api/discinstances/:id`: Get a specific disc instance
- `POST /api/discinstances`: Create a new disc instance
- `PUT /api/discinstances/:id`: Update a disc instance
- `DELETE /api/discinstances/:id`: Delete a disc instance


