const express = require('express');
const multer = require('multer');

const routes = express.Router() ;

const uploadConfig = require('./config/upload');
const UserController = require('../controller/UserController');
const EventController = require('../controller/EventController');
const DashBoardController = require('../controller/DashBoardController');
const LogInController = require("../controller/LogInController");
const RegisterationController = require('../controller/RegisterationController');
const upload = multer(uploadConfig) ;

routes.get('/status' , (req , res) => {
    res.send({ "status" : 200});
  
})
//TODO Session controller

//TODO Subscribe to event controller
//TODO approval controller "accept request"
//TODO refuse controller "refuse request"

//registeration to an event
routes.post('/regist/:eventId' , RegisterationController.create);
routes.get('/registeration/:registeration_id' , RegisterationController.getRegisterationbyId);
//login
routes.post('/login' , LogInController.logIn);
//dashboard
routes.get('/dashboard' , DashBoardController.getAllEvents);
routes.get('/dashboard/:eventType' , DashBoardController.getAllEvents);
routes.get('/event/:eventID' , DashBoardController.getEventById);


//events
routes.post('/event/createEvent' ,upload.single("thumbnail") ,EventController.createEvent);
routes.delete('/events/:eventID' , EventController.deleteEvent);

//users
routes.get('/user/:userID' , UserController.getUserById);
routes.post('/user/register' , UserController.createUser);

module.exports = routes ;