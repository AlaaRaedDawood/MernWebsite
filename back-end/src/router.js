const express = require('express');
const multer = require('multer');

const routes = express.Router() ;

const uploadConfig = require('./config/upload');
const UserController = require('../controller/UserController');
const EventController = require('../controller/EventController');
const DashBoardController = require('../controller/DashBoardController');
const LogInController = require("../controller/LogInController");
const ApproveRegisterationController = require("../controller/ApprovalRegisterationController");
const RejectRegisterationController = require('../controller/RejectRegisterationController');
const RegisterationController = require('../controller/RegisterationController');
const upload = multer(uploadConfig) ;

routes.get('/status' , (req , res) => {
    res.send({ "status" : 200});
  
})


//registeration to an event
routes.post('/regist/:eventId' , RegisterationController.create);
routes.delete('/deleteAllregisterations' , RegisterationController.deleteAllRegisterations);
routes.get('/registeration/:registeration_id' , RegisterationController.getRegisterationbyId);
//approveRequest
routes.post('/registeration/:registerationId/approve' , ApproveRegisterationController.approveRequest);
//rejectRequest
routes.post('/registeration/:registerationId/reject' , RejectRegisterationController.rejectRequest);
//login
routes.post('/login' , LogInController.logIn);
//dashboard
routes.get('/dashboard' , DashBoardController.getAllEvents);
routes.get('/dashboard/:sport' , DashBoardController.getAllEvents);
routes.get('/event/:eventID' , DashBoardController.getEventById);
routes.get('/dashboardUserId' , DashBoardController.getEventByUserId);

//events
routes.post('/event/createEvent' ,upload.single("thumbnail") ,EventController.createEvent);
routes.delete('/events/:eventID' , EventController.deleteEvent);
routes.delete('/eventsdelete' , EventController.deleteAllevents);
//users
routes.get('/user/:userID' , UserController.getUserById);
routes.post('/user/register' , UserController.createUser);
routes.delete('/usersdeleteAll' , UserController.deleteAllUsers);
module.exports = routes ;