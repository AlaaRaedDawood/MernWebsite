const express = require('express');
const multer = require('multer');

const routes = express.Router() ;

const uploadConfig = require('./config/upload');
const UserController = require('../controller/UserController');
const EventController = require('../controller/EventController');
const upload = multer(uploadConfig) ;

routes.get('/status' , (req , res) => {
    res.send({ "status" : 200});
  
})

//events
routes.get('/events' , EventController.getAllEvents);
routes.get('/events/:eventType' , EventController.getEventByType);
routes.post('/event/createEvent' ,upload.single("thumbnail") ,EventController.createEvent);
routes.get('/event/:eventID' , EventController.getEventById);
routes.delete('/events/:eventID' , EventController.deleteEvent);
//users
routes.get('/user/:userID' , UserController.getUserById);
routes.post('/user/register' , UserController.createUser);

module.exports = routes ;