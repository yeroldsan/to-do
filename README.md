# Todo Web App

This is a simple Todo web app built using Node.js, Express, PostgreSQL and TypeScript for both frontend and backend. You can perform CRUD operations on tasks.

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Local setup
1. Clone the repository
   ```sh
   git clone https://github.com/doteins/todo.git
   ```
2. Install NPM packages
   ```sh
   cd project_folder/server
   npm install
   ```
3. Copy SQL queries from server/db.sql to create the database

4. Update the database connection details in the `Todo.ts` file to match the connection details for your PostgreSQL database. Update the backend url variable as well.

6. Start the server
   ```sh
   cd project-folder/server/
   npm run devStart
   ```