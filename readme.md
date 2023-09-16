# Introduction
The Asset Management System Backend is the server-side component of a web application that allows users to manage their assets. This backend is built using Node.js, Express, and MongoDB. It handles user registration, asset management, and asset purchases.

## Installation
1. Clone the repository:
git clone https://github.com/jeeva-sd/asset-management-API

2. Navigate to the project directory:
cd asset-management-API

3. Install the dependencies:
npm install

4. Create a `.env` file in the root directory and add your MongoDB connection URL, Port and JWT Secret Key
PORT=
DB_KEY=
SECRET_KEY=

5. Start the server:
npm start

The API will be running on `http://localhost:3001`.

## API Routes

### `/assets`
Get all assets and create new assets (accessible only with developer credentials).

### `/purchase`
Purchase an asset.

## Middleware
The following middleware functions are used to validate and process requests:
- `validateUserCredentials`: Validates the request body for creating a new user.