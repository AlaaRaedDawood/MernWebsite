
const Event = require('../Models/Event');
const User = require('../Models/User');

module.exports = {
   

    async createEvent (req,res){
        try{
            //console.log("alaa hiii " ) ;
            const {title , description , price , sport} = req.body;
            const { user_id } = req.headers; 
            const { filename } = req.file;
            
            //check if user already exists 
            const user = await User.findById(user_id) ; 
            
            if(!user){
                return res.status(404).json({
                    message : "the user doesn't exist " + user_id
                })
               
            }
            const new_event = await Event.create(
                {
                    title ,
                    description , 
                    price: parseFloat(price) ,
                    sport ,
                    user : user_id ,
                    thumbnail : filename
                } 
            )
            
            return res.json(new_event);
            
            
        }
        catch (err) {
			throw Error(`Error while Registering new user :  ${err}`)
		}
    },
    async getEventById (req,res){
        
        const {eventID} = req.params;
        console.log(eventID);
        try{
            const event = await Event.findById(eventID);
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
        try{
            const events = await Event.find({});
            if (events){
                  return res.json(events);
            }
                return res.status(404).json({
                    "message" : "something went wrong" 
                })
        }
        catch (error) {
            return res.status(404).json(
                {
                    'message' : 'event not fount' 
                }
            )
		}
      
    }, async getEventByType(req,res){
        console.log(req.params);
        const { eventType } = req.params ;
        const query = {"sport" : eventType} || {} 
        
        try{
        const events = await Event.find(query)
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


    }, async deleteEvent(req,res){
        const {eventID} =  req.params ;
        console.log(eventID) ;
        try{

            await Event.findByIdAndDelete(eventID)
            res.status(204).send("done");
        }catch(error){
            res.status(404).json({
                'message' : "this eventID doesn't exist"
            })
        }
    }
}