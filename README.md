# Klėtis Forum

## Overview

**Klėtis** is a RESTful API built with **Node.js** and **Express** that enables users to manage tractors, categories, posts, and comments. This API supports user roles (admin, moderator, and guest) for managing forum content while ensuring proper data relationships and integrity.

## Features

- **User Management**:
  - Create, read, update, and delete users.
  - User roles: `admin`, `mod`, `guest`.
- **Tractor Management**:
  - Manage tractor categories.
  - Link posts to specific tractor categories.
- **Post Management**:
  - Create posts with titles, content, and vote counts (upvotes and downvotes).
  - Pre-save hooks for timestamps and cascading deletion of comments when a post is deleted.
- **Comment Management**:
  - Add, update, and delete comments linked to posts.
- **Voting System**:
  - Upvote and downvote functionality for posts.
- **Query Expansion**:
  - Include related fields (e.g., posts under a specific tractor category).

## Prerequisites

- **Node.js**: v14 or above
- **MongoDB**: A MongoDB database (local or cloud, e.g., MongoDB Atlas)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/MartynasKul/Kletis-Forum.git
cd Kletis-Forum
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file and add the following variables:

```
MONGODB_URI=<your-mongodb-connection-string>
PORT=3000
```

### 4. Run the Program

```bash
npm run dev
```

## API Endpoints

### User Routes

| **Method** | **Route**        | **Description**              | **Request Body**                                         | **Response**                        |
|------------|------------------|------------------------------|----------------------------------------------------------|-------------------------------------|
| `GET`      | `/users`         | Get all users                | No body required                                         | `200 OK`: List of users <br> `500 Internal Server Error`: Error fetching users |
| `POST`     | `/users`         | Create a new user            | `{ "username": "username", "password": "password", "role": "guest" }` | `201 Created`: User created successfully |
| `PUT`      | `/users/:id`     | Update a user's information  | `{ "username": "new_username", "role": "moderator" }`    | `200 OK`: User updated successfully |
| `DELETE`   | `/users/:id`     | Delete a user                | No body required                                         | `200 OK`: User deleted successfully |

---

### Tractor Routes

| **Method** | **Route**           | **Description**            | **Request Body**                     | **Response**                       |
|------------|---------------------|----------------------------|--------------------------------------|------------------------------------|
| `GET`      | `/tractors`         | Get all tractor categories | No body required                     | `200 OK`: List of tractors |
| `POST`     | `/tractors`         | Create a new tractor        | `{ "name": "Tractor Name" }`         | `201 Created`: Tractor created successfully |
| `DELETE`   | `/tractors/:id`     | Delete a tractor category  | No body required                     | `200 OK`: Tractor deleted successfully |

---

### Post Routes

| **Method** | **Route**        | **Description**             | **Request Body**                                     | **Response**                       |
|------------|------------------|-----------------------------|------------------------------------------------------|------------------------------------|
| `GET`      | `/posts`         | Get all posts               | No body required                                     | `200 OK`: List of posts |
| `POST`     | `/posts`         | Create a new post           | `{ "title": "Post Title", "content": "Content", "tractorId": "tractorId" }` | `201 Created`: Post created successfully |
| `PUT`      | `/posts/:id`     | Update a post               | `{ "title": "Updated Title", "content": "Updated Content" }` | `200 OK`: Post updated successfully |
| `DELETE`   | `/posts/:id`     | Delete a post               | No body required                                     | `200 OK`: Post deleted successfully |

---

### Comment Routes

| **Method** | **Route**          | **Description**            | **Request Body**                         | **Response**                       |
|------------|--------------------|----------------------------|------------------------------------------|------------------------------------|
| `GET`      | `/comments`        | Get all comments           | No body required                         | `200 OK`: List of comments |
| `POST`     | `/comments`        | Create a comment           | `{ "postId": "postId", "content": "Comment Content" }` | `201 Created`: Comment created successfully |
| `DELETE`   | `/comments/:id`    | Delete a comment           | No body required                         | `200 OK`: Comment deleted successfully |

---

## Notes


