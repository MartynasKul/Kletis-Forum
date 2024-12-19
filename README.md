# Klėtis Forum Frontend

This repository contains the frontend for the **Klėtis Forum** project, built using Vue.js. The application provides a platform to browse tractors, categories, posts, and comments, with separate functionalities for users, moderators, and admins.

## Features

- **Vue Router**: Navigation between pages.
- **Axios**: HTTP requests to the backend.
- **Pinia Store**: State management for global variables and notifications.
- **Vee-Validate**: Input validation for forms.
- **Responsive UI**: Designed with modular components to enhance user experience.
- **Role-Based Access**:
  - **Not logged in**: Can view most of the information.  
  - **Guest**: Can leave comments, edit their profile, and logout.
  - **Moderator**: Can manage categories and moderate comments.
  - **Admin**: Full control to manage users, tractors, posts, and comments.

---

## Project Structure

### Directories
- **`components/`**: Modular components used across the application (e.g., post cards, user profile, etc.).
- **`enums/`**: Contains an enum file for shared constants.
- **`services/`**: 
  - `AuthService`: Handles authentication logic.
  - `APIService`: Handles generic API requests.
  - `AxiosResponseHandlerService`: Processes and standardizes Axios responses.
- **`views/`**: Pages of the application, including:
  - `/` - Home page.
  - `/tractors` - Lists all tractor categories.
  - `/tractors/:id` - Displays category details and associated posts.
  - `/posts/:id` - Displays post details and comments.
  - `/users` - Admin page displaying a user table.
  - `/mod` - Moderator page for managing categories and comments.
- **`stores/`**: Pinia stores for global state management.
  - `AuthStore`: Manages authentication state.
  - `NotificationStore`: Handles notifications.
  - `ModalStore`: Manages modal state for edit/create modals.
- **`composables/`**: Utility functions for data fetching and posting.
- **`types/`**: Defines TypeScript types for variables to ensure type safety.
- **`router/`**: Defines the project's routes.

---

## Key Functionalities

### Navigation and Display
- **Home Page (`/`)**: Welcomes users to the forum.
- **Tractor Categories (`/tractors`)**: Displays all available categories.
- **Tractor Details (`/tractors/:id`)**: Shows category information and its posts. Users can create new posts.
- **Post Details (`/posts/:id`)**: Displays post information and its comments. Users can create new comments.
- **User Management (`/users`)**: Allows admin to edit and create new users.
- **Register Page (`/register`)**: Allows a new user to create an account.
- **Login Page (`/login`)**: Allows the user to log in.
- **Logout button (`/logout`)**: Allows the user to log out.

### User Roles and Capabilities
- **User that has not logged in**
   - Can view tractors, posts, and comments.
   - Can register and login to become a guest. 
- **Guest**:
- - can leave posts under tractor of their choosing.
  - Can leave comments on posts.
  - Can edit their own profile.
  - Can edit their own comments.
- **Moderator**:
  - Can manage categories.
  - Can moderate comments (edit or delete inappropriate ones).
- **Admin**:
  - Can manage all content (users, tractors, posts, and comments).

### Modals
- Modals are used for editing and creating fields, managed through `ModalStore`.
- Custom modal components ensure a consistent and responsive UI.

### Backend Communication
- Authentication and session management are handled via cookies.

---

## Deployment

The application is deployed on **Vercel** for seamless access.

---

## Getting Started

### Prerequisites
- Node.js
- Vue CLI

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/MartynasKul/Kletis-Forum.git
   cd kletis-forum-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Build
Create a production-ready build:
```bash
npm run build
```

### Deployment
Deploy the application to Vercel or any hosting service of your choice.

---

## Contributions

Contributions are welcome! Feel free to submit a pull request or report issues.

---


