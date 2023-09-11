# To-Do List Web App

## Description

This To-Do app allows users to perform CRUD (Create, Read, Update and Delete) operations on the tasks. The server was built using the Express framework and NodeJS as the runtime. As for the database, PostgreSQL was the choice. Both, back-end and front-end are written in TypeScript.

![Screenshot-To-Do-List.png](https://i.postimg.cc/j5YxHWZ0/Screenshot-To-Do-List.png?raw=true "To-Do Demo")

_Note: Please be aware that the server and database are hosted on Render, which may cause some delay in the app's performance._

## Development Setup

### Prerequisites

- Node.js
- PostgreSQL ^15 (if any other relational database is used, change the db.sql file accordingly)

### Local setup (Linux & Windows)
1. First, clone the repo and cd into the project:
   ```sh
   git clone https://github.com/yeroldsan/todo.git
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

### Compile TypeScript for the server and front-end
Run the following comand in the server:
   ```sh
   npm run build
   ```
And in the root directory:
   ```sh
   npx tsc
   ```
  
### Run the server locally
In the server directory, start the development server by running:
   ```sh
   npm run dev
   ```
Backend will be running on **http://localhost:3001** by default, if no value for PORT is passed beforehand.

### Run server to render Front-End
You can do this by running the Go Live extension on VSCode / VSCodium, or use your prefered local web server.
