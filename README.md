APDS7311 POE TASK 2 

A brief description of what your project does and its purpose.

Team Members: ST10072411, ST10136414, ST10058357, ST10169076, ST10065470

Getting Started
These instructions will help you set up the project on your local machine for development and testing purposes.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (vX.X.X or higher)
MongoDB (make sure MongoDB is running locally or use a cloud solution like MongoDB Atlas)
Git 
VS Code
REST Client Extension


Installation
Clone the repository:
https://github.com/ST10072411/APDS7311POE
Open Project in vs code. 

or unzip project file
APDS7311POE.zip
Open Project in vs code 

You may have to run the following commands (in order) in the cli to install various dependencies:

npm install

cd Frontend

npm install @vitejs/plugin-react-swc

npm install vite

npm i --save-dev @types/react

npm install @fortawesome/react-fontawesome

npm install @fortawesome/free-solid-svg-icons



Running the App
There are two options to run App: 
1: Using VS code press F5 to run frontend and backend together.
- Press ctrl + click https://localhost:5173 in terminal to view app in browser.

2: Using VS code run a new terminal.
- Run npm Start command in terminal.
- Press ctrl + click https://localhost:5173 in terminal to view app in browser.

Technologies Used
Frontend: React, JavaScript, HTML, CSS
Backend: Node.js, Express.js, MongoDB
Database: MongoDB (Local or MongoDB Atlas)
Tools: VS Code, Git, npm/yarn, github, morgan logs, artillery, Postman.

Project Structure
yourproject/
│
├── client/             # React frontend
│   ├── public/         # Static assets
│   └── src/            # React components, hooks, etc.
│
├── config/             # MongoDB config, environment variables
│
├── controllers/        # Backend business logic
│
├── models/             # MongoDB models (schemas)
│
├── routes/             # API routes
│
├── .env                # Environment variables
│
├── server.js           # Express server entry point
│
└── package.json        # Dependencies and scripts

Security Testing
Request limit and timeout testing
artilery: run quick --count 100 -n 1000 https://localhost:3000/api/users/login      
POSTMAN Application for automated testing of requests
Requests show in log.

Notes: 
Several Sections 

Contributing
If you want to contribute to this project, feel free to create a pull request or submit an issue.

License
This project is licensed under the MIT License - see the LICENSE file for details.

