const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
// const firebase = 
const app = express();
app.get('/login', (request, response) => {
    response.sendFile('/minisidebar/pages-login.html.htm')
})
app.get('/register', (request, response) => {
    response.sendFile('/minisidebar/pages-register.html.htm')
})
app.get('/', (request, response) => {
    response.sendFile('/minisidebar/index.html')
})
app.get('/dashboard', (request, response) => {
    response.sendFile('/minisidebar/index3.html')
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
