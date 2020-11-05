const Events = require("../Models/Event");
const Users = require("../Models/User");

module.exports = {
    async getEventById (req,res){
        
        const {eventID} = req.params;
        console.log(eventID);
        try{
            const event = await Events.findById(eventID);
            return res.json(event)
            
        }
        catch (error) {
            return res.status(404).json(
                {
                    'message' : 'event not fount' 
                }
            )
		}
    },
    async getAllEvents(req,res){
        console.log(req.params);
        const { eventType } = req.params ;
        const query = {"sport" : eventType} || {} 
        
        try{
        const events = await Events.find(query)
        if (events){
            return res.json(events);
       }
          return res.status(404).json({
              "message" : "no events were found" 
          })

        }catch(error){
            res.status(404).json({
                'message' : 'no event type not fount'
            })
        }
      
    }
}
     

