# GEMINI.md

## Project Overview

This project, "LavaJá", is a full-stack web application designed for managing laundry facilities. It allows laundromat owners to manage their machines and provides a platform for customers to view machine availability, join virtual queues, and receive notifications.

The project is structured as a monorepo with two main components:

*   **`frontend`**: A React application built with Vite and styled with Tailwind CSS. It provides the user interface for both customers and laundromat owners.
*   **`backend`**: A Node.js and Express application written in TypeScript. It serves a RESTful API for the frontend and uses WebSockets for real-time communication. The database is SQLite.

## Building and Running

### Prerequisites

*   Node.js >= 18.0.0
*   yarn >= 1.22.0

### Installation

1.  Clone the repository.
2.  Install dependencies for the entire project from the root directory:

    ```bash
    yarn install
    ```

### Running the Application

To run both the frontend and backend servers in development mode, use the following command from the root directory:

```bash
yarn dev
```

This will start:

*   The backend server on `http://localhost:4000`
*   The frontend development server on `http://localhost:5173`

Alternatively, you can run the frontend and backend servers separately:

*   **Backend:**
    ```bash
    cd backend
    yarn dev
    ```
*   **Frontend:**
    ```bash
    cd frontend
    yarn dev
    ```

## Development Conventions

*   **Code Style**: The project uses TypeScript for both the frontend and backend. Code style is enforced by Prettier (inferred from the presence of `.prettierrc` if it exists) and ESLint.
*   **Commit Style**: The `README.md` suggests a conventional commit style (e.g., `feat:`, `fix:`, `docs:`).
*   **API**: The backend provides a RESTful API, with endpoints documented in the `README.md`.
*   **Real-time Updates**: WebSockets are used for real-time updates of machine status and queue positions. The implementation can be found in `backend/src/socket.ts`.
*   **Database**: The project uses SQLite for the database. The database file is located at `backend/data/dev.db`.
*   **Authentication**: Authentication is handled using JSON Web Tokens (JWT).
