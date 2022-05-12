# Todo App
This is a basic Todo App using React + Express + TypeScript + Postgres.

## Live Demo
You can try the app out on https://todo-app-challenge-code.netlify.app/

## File Structure
The project is composed of two folders: 
* Frontend contains a create-react-app project with the UI of the application. 
* Backend is a basic express project for building the API

Every folder has its respective `Dockerfile` to be used with Docker Compose command.

## How to test it locally
1.  Install Docker Compose if you do not have it yet
2. Clone this repository in your computer
3. Open a terminal in the directory and run `docker-compose up --build`
4. Wait a few seconds to have all containers up and ready to use
5. Go to http://localhost:8000 to access the app

NOTE 1: If you have `postgres` installed locally, you have to stop the service before testing the app because it uses an internal postgres image and exposes it on the standard 5432 port.

NOTE 2: If you are going to test the API without the frontend UI, you must have in mind that routes are protected with Basic Authentication, with the exceptions of POST `/users` (to create a new user) and `/users/login` (to access through the UI). Others routes need `Authorization` header.
