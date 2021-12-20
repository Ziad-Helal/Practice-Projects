// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Require Cors and Body-Parser
const cors = require('cors');
const bodyParser = require('body-parser');

// Setting the server Port
const port = 2000;

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Local server feedback
app.listen(port, ()=> {
    console.log(`The server is running on port: ${port}.`);
});

// GET rout
app.get('/getData', (request, response)=> {
    response.send(projectData);
});
// POST rout
app.post('/saveData', (request, response)=> {
    projectData = request.body;
    response.end();
});