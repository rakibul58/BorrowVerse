# BorrowVerse

## Library Management System

[Live URL](https://library-management-system-six-sage.vercel.app/)

### Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage Guide](#usage-guide)
- [Usage](#usage)
- [Credentials](#Credentials)
- [Contact](#contact)

## Project Overview

BorrowVerse is a comprehensive library management system backend with features for borrowing and managing members and books. Users borrow books, return books and check overdue books.

## Features

- **Member Management:** Create, update and delete members.
- **Book Management:** Create, update and delete books.
- **Booking Management:** Users can view the cars, book it if available.
- **Borrow and Return:** Borrow books, return books and check overdue books.

## Technologies Used

- **Backend:** Typescript, Node.js, Express
- **ORM:** Prisma
- **Database:** Postgresql
- **Deployment:** Vercel
- **Database Deployment:** Superbase

## Usage Guide

Follow the following instructions to run the application locally.

### Step 1

Open command prompt(`cmd`) in folder where you want to add the project.

### Step 2

Run the following command to clone the repository:

```bash
git clone https://github.com/rakibul58/BorrowVerse.git
```

### Step 3

Open the cloned folder or run the following in cmd:

```bash
cd BorrowVerse
```

### Step 4

In the cloned folder run the following command on cmd:

```bash
npm install
```

or

```bash
yarn install
```

### Step 5

On the root directory add a `.env` file and add your database url and other environment variables bellow:

```bash
DATABASE_URL=
# If your are using local database then DIRECT_URL is not needed
DIRECT_URL=
ENABLE_PRISMA_CACHING=false
```

### Step 6

Run the following code to start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

### Step 7

Remove directUrl = env("DIRECT_URL") from prisma/schema.prisma


## Usage
Other commands can be found in package.json scripts. Once the application is set up and running, you can access it at http://localhost:5000 (or the appropriate port if specified differently).

## Contact

For any questions or feedback, please contact:

- **Name:** Muhammed Rakibul Hasan
- **Email:** rhrahi14@gmail.com
