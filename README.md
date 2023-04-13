# Todo Web App

The todo app allows users to perform CRUD operations on tasks, and is built using Node.js, Express, PostgreSQL, and TypeScript for both frontend and backend. The backend and database are deployed on Render.

_Note: Marking a task as done is not fully supported yet. Aditionally, please be aware that both the API endpoints (server) and the database are hosted on Render, which may cause some delay in the app's performance._

## Development Setup

### Prerequisites
- Node.js

### Local setup (Linux & Windows)

1. First, clone the repo and cd into the project:
   ```sh
   git clone https://github.com/t2haev00/project-groupd.git
   ```
   
2. Move to the server directory:
   ```sh
   cd server/
   ```
   
3. Install node dependencies:
   ```sh
   npm i
   ```
   
4. In the server directory, open **sample.env** and copy its content into a new file named **.env**, then replace variable placeholders with the correct values for your database.

### Compile TypeScript code:
Run the following comand in the server directory:
   ```sh
   npx tcs
   ```
  
### Run the server locally
In the server directory, start the development server by running:
   ```sh
   npm run devStart
   ```
Backend will be running on **http://localhost:3001**.
