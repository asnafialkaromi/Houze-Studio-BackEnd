# Project Name

A BackEnd application built using **Express**, **MySQL**, and **Prisma**. This project provides API endpoints for managing data

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#Prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [API Documentation](#api-documentation)

## Getting Started

Follow these instructions to get a copy of the project running on your local machine for development and testing purposes.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 20.15.0 or later)
- [MySQL](https://www.mysql.com/)

## All Environment variables

Create a .env file at the root of the project to store your environment-specific variables. An example .env file might look like this:

```
DATABASE_URL="mysql://username@localhost:3306/database_name"
PORT=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
EMAIL=""
PASSWORD=""
JWT_SECRET=""
```

| variables               | Description                       |
| :---------------------- | :-------------------------------- |
| `DATABASE_URL`          | MySQL connection string           |
| `PORT`                  | Port number the app will run on   |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary API Name          |
| `CLOUDINARY_API_KEY`    | Your Cloudinary API KEY           |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API SECRET        |
| `EMAIL`                 | Username email for nodemailer     |
| `PASSWORD`              | Password activation for nodmailer |
| `JWT_SECRET`            | Secret code for JWT               |

## Installation

1. **Clone the Repository**

   Clone this repository to your local machine using:

   ```bash
   git clone https://github.com/asnafialkaromi/Houze-Studio-BackEnd.git
   ```

2. **Navigate to the Project Directory**

   Move into the project folder:

   ```bash
   cd houze-studio-backend
   ```

3. **Install Dependencies**

   Install the necessary Node.js packages:

   ```bash
   npm Install
   ```

4. **Set Up the Database**

   Ensure you have MySQL installed and running. Create a new database for your project.

5. **Configure Environment Variables**

   Create a .env file at the root of your project and add your database connection string The DATABASE_URL should be in the format:

   ```bash
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

6. **Run Database Migration**

   Install the necessary Node.js packages:

   ```bash
   npx prisma migrate dev
   ```

7. **Generate Prisma Client**

   Generate the Prisma Client to interact with your database

   ```bash
   npx prisma generate
   ```

8. **Start the Server**

   Finally, start your Express server.

   ```bash
   npm run dev
   ```

## API Documentation

Documentation about API in
[Postman](https://www.postman.com/technical-architect-11262708/workspace/public/collection/31539387-4b3068f5-52d7-4222-a939-f1b6cc6f3651?action=share&creator=31539387)
