### Description

 * Route: /todos
 * Method: GET
 * Decsription:  Get all the list of todos in the system
 * Access: Public
 * Paramters: None


 * Route: /todos
 * Method: POST
 * Decsription:  Create/Register a new todo
 * Access: Public
 * Paramters: None


 * Route: /todos/:id
 * Method: PUT
 * Decsription:  Updating a todo by their ID
 * Access: Public
 * Paramters: ID


 * Route: /todos/:id
 * Method: Delete
 * Decsription:  Deleting a todo by their ID
 * Access: Public
 * Paramters: ID


## Commands
npm init
npm i express
npm i nodemon --save-dev

npm run dev


To restore nodemodules and package-lock.json  --> npm i/ npm install

npm i mongoose
npm install mongodb

mongodb+srv://activegamer789_db_user:<db_password>@cluster0.aqciid5.mongodb.net/assignment8?retryWrites=true&w=majority
mongodb+srv://activegamer789_db_user:QOK75InduI6WjMGQ@cluster0.aqciid5.mongodb.net/assignment8?retryWrites=true&w=majority


npm i dotenv

 ### Model

    In model we have a todo model which has the following field:

    description: String

 ### Controller

    In controller we have the following functions:

    1. getAllTodos: This function is used to get all the list of todos in the system
    2. createTodo: This function is used to create/register a new todo
    3. updateTodo: This function is used to update a todo by their ID
    4. deleteTodo: This function is used to delete a todo by their ID

### Challenges  faced:

      1. I faced problems in creating the databaseConnection.js file and connecting it to the server.js.
      2. The Biggest problem I faced was in the updateTodo function, I was not able to update the todo by their ID, but after some research from Youtube I was able to solve the problem.
      3. I also faced some problems with api so i have to use REST api rather then POSTMAN

### Frontend :-

# 📝 React Todo App

A simple and clean Todo application built using React and Context API.

## Features
- Add todos
- Edit todos
- Mark as completed
- Delete todos
- Data saved in localStorage

## Tech Stack
- React
- Context API
- Tailwind CSS
- Vite

### Netlify link
https://assignment-no-08-rahul.netlify.app/

### Render link 
https://assignment-no-8.onrender.com

## How to run
```bash
npm install
npm run dev
