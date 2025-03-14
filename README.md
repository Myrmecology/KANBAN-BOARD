

# Kanban Board with JWT Authentication

A secure Kanban board application built with React, Node.js, Express, and PostgreSQL. This full-stack application features JWT authentication to secure user access and provides a visually appealing interface for task management.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setting Up the Database](#setting-up-the-database)
  - [Environment Configuration](#environment-configuration)
  - [Installing Dependencies](#installing-dependencies)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [Authentication](#authentication)
  - [Managing Tickets](#managing-tickets)
- [Project Structure](#project-structure)
- [Authentication Flow](#authentication-flow)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview

This Kanban board application allows team members to organize and track their work in a visual, intuitive interface. The application implements secure user authentication using JSON Web Tokens (JWTs) to ensure that only authorized users can access and manage tasks.

The Kanban methodology, originating from Toyota's manufacturing process, helps visualize work, limit work-in-progress, and manage flow. This application implements a classic three-column Kanban board with "Todo," "In Progress," and "Done" stages.

## Features

- **Secure Authentication**: JWT-based login system with secure password handling
- **Protected Routes**: Client and server-side protection of authenticated resources
- **Visual Task Management**: Intuitive Kanban board interface with drag-and-drop functionality
- **Task Operations**: Create, read, update, and delete tasks
- **User Management**: Assign tasks to specific users
- **Session Handling**: Automatic logout on token expiration
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

### Frontend
- React (with TypeScript)
- React Router for navigation
- JWT for authentication
- CSS for styling

### Backend
- Node.js
- Express.js
- PostgreSQL database
- Sequelize ORM
- JSON Web Tokens (JWT)
- bcrypt for password hashing

## Installation

### Prerequisites

Before installing this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL (v12 or higher)

### Setting Up the Database

1. Create a PostgreSQL database for the application:

CREATE DATABASE kanban_board;

2. Note your PostgreSQL username and password for the next step.

### Environment Configuration

1. In the server directory, create a `.env` file with the following variables: Very important, make sure it looks like this

DB_NAME=kanban_board
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_jwt_secret_key

*Note: Replace placeholder values with your actual PostgreSQL credentials. Generate a random string for JWT_SECRET to secure your tokens.*

### Installing Dependencies

1. Clone the repository:

git clone https://github.com/Myrmecology/KANBAN-BOARD.git
cd kanban-board

2. Install server dependencies:

cd server
npm install

3. Install client dependencies:

cd ../client
npm install

## Usage

### Running the Application

1. Start the server:

cd server
npm run build
npm run dev

2. In a separate terminal, start the client:

cd client
npm run dev

3. Access the application in your browser at `http://localhost:3000`

### Authentication

1. Register a new account or use the default credentials:
   - Username: **** (updated, you will need to create a new account)
   - Password: **** (updated, you will need to create a new account)

2. After successful login, you'll be redirected to the Kanban board
   
3. Your session will remain active until you log out or your token expires!!

### Managing Tickets

1. **Create a new ticket**:
   - Click the "+ New Ticket" button
   - Fill out the title, description, and assign to a user
   - Select the initial status (default is "Todo")
   - Click "Submit" to create the ticket

2. **Edit a ticket**:
   - Click the "Edit" button on any ticket
   - Modify the details as needed
   - Click "Submit" to save changes

3. **Delete a ticket**:
   - Click the "Delete" button on any ticket
   - Confirm the deletion when prompted

4. **View ticket details**:
   - Click on any ticket to view its full details

## Project Structure

kanban-board/
├── client/                # Frontend React application
│   ├── public/           
│   ├── src/              
│   │   ├── api/          # API communication functions
│   │   ├── components/   # React components
│   │   ├── interfaces/   # TypeScript interfaces
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Utility functions 
│   │   └── App.tsx       # Main application component
│   └── package.json      # Client dependencies
│
├── server/                # Backend Node.js/Express application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Sequelize models
│   │   ├── routes/       # API routes
│   │   ├── seeds/        # Database seed files
│   │   ├── types/        # TypeScript type definitions
│   │   └── server.ts     # Server entry point
│   └── package.json      # Server dependencies
│
└── README.md             # This file

## Authentication Flow

The authentication system uses JWT (JSON Web Tokens) to secure the application:

1. **Login Process**:
   - User submits credentials (username/password)
   - Server validates credentials against the database
   - If valid, server generates a JWT signed with a secret key
   - Token is returned to the client and stored in localStorage

2. **Authenticated Requests**:
   - Client includes the JWT in the Authorization header
   - Server verifies the token signature and expiration
   - If valid, server processes the request
   - If invalid, server returns 401/403 error

3. **Token Expiration**:
   - JWTs are configured to expire after 1 hour
   - Client checks token expiration before making requests
   - When token expires, user is redirected to login

4. **Logout Process**:
   - Token is removed from localStorage
   - User is redirected to login page

## API Endpoints

### Authentication
- `POST /auth/login` - Authenticate user and return JWT

### Tickets
- `GET /api/tickets` - Get all tickets (protected)
- `GET /api/tickets/:id` - Get ticket by ID (protected)
- `POST /api/tickets` - Create a new ticket (protected)
- `PUT /api/tickets/:id` - Update a ticket (protected)
- `DELETE /api/tickets/:id` - Delete a ticket (protected)

### Users
- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)

## Future Enhancements

Potential improvements for future versions:

- Drag-and-drop interface for moving tickets between columns
- User registration and account management
- Advanced filtering and search capabilities
- Activity log and audit trail
- Email notifications for ticket updates
- Custom labels and categories for tickets
- Dark mode theme option

## Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   - Verify PostgreSQL is running
   - Check database credentials in .env file
   - Ensure the database exists

2. **Authentication Issues**:
   - Clear browser localStorage and try logging in again
   - Check JWT_SECRET in .env file
   - Verify user credentials in the database

3. **CORS Errors**:
   - Ensure the server is configured to allow requests from the client domain
   - Check for any proxy configuration issues in vite.config.ts

### Development Mode Issues

When running in development mode, you might occasionally see 500 errors or connection issues. These are typically harmless and related to:
- Hot-reloading conflicts
- Connection pool exhaustion
- Environmental inconsistencies

Simply refreshing the page or restarting the development servers usually resolves these issues.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Render Link 
Happy coding everyone 
LINK TO LIVE EXAMPLE: https://drive.google.com/file/d/1y1qaJ5-knamD6mQ-nJ7WMO-jDVVzTTuY/view