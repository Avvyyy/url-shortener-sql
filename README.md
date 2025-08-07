# SavvyX Url Shortener - SQL Edition

## After you clone the repository
- Run `npm install`

## Packages you will need for this project
- mysql2: For establishig SQL connections
- express: Because this is an expess project obviously
- joi: For input validation
- dotenv: For loading environment variables
- crypto: Generating random new url ids 

## Folder structure
/
├── server.js               # Root application entry point
│
├── src/                    # Source code directory
│   ├── config/             # Database configuration and environment setup
│   ├── controllers/        # Logic for handling requests and responses
│   ├── routes/             # API route definitions
│   ├── middleware/         # Custom Express middleware (e.g. validations)
│   ├── utils/              # Helper functions and utilities
│   └── validations/        # Request validation schemas and logic

     
