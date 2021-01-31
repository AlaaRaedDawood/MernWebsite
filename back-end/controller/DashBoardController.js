const Events = require("../Models/Event");
const Users = require("../Models/User");
const jwt = require('jsonwebtoken');

module.exports = {
    async getEventById (req,res){
        jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.status(401).json({message : `error occured ${err}`})
			} else {
        const {eventID} = req.params;
        console.log(eventID);
        try{
            const events = await Events.findById(eventID);
            return res.status(200).json({authData , events})
            
        }
        catch (error) {
            return res.status(404).json(
                {
                    'message' : `event not fount ${error}` 
                }
            )
        } 
        }
    })
    
    },
    async getAllEvents(req,res){
        
        jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.sendStatus(401).json({'mmmmmm' : 'kkkk'})
            } 
            else {
                
        const { sport } = req.params;
        const query = sport ? { sport } : {}
       
        console.log( query );
        try{
        const events = await Events.find(query)
        if (events){
            return res.status(200).json({authData ,events})
        }
         

        }catch(error){
            return res.status(401).json({
                'message' : 'no event type not fount'
            })
        }
    }})
      
    }, async getEventByUserId(req,res){
        jwt.verify(req.token, 'secret', async (err, authData) => {
            // console.log("hh " + JSON.stringify(authData));
            // console.log("hh22 " + authData.user._id);
			if (err) {
				res.sendStatus(401)
			} else {
        const user_id = authData.user._id;
        console.log(user_id)
        try{
            const events = await Events.find({ user : user_id })
            if (events){
                return res.status(200).json({authData , events})
           }
           return res.status(404).json({
            "message" : "no events were found" 
        })
        }catch(error){
            console.log(error);
            res.status(404).json({
                'message' : `error occured ${error}`
            })
        }
    }})
        

    }
}
     

