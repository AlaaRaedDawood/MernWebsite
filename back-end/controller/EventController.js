
const Event = require('../Models/Event');
const User = require('../Models/User');

module.exports = {
   

    async createEvent (req,res){
        try{
            //console.log("alaa hiii " ) ;
            const {title , description , price , sport , date} = req.body;
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
                    thumbnail : filename ,
                    date : date
                } 
            )
            
            return res.json(new_event);
            
            
        }
        catch (err) {
			throw Error(`Error while Registering new user :  ${err}`)
		}
    },
    

     async deleteEvent(req,res){
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
    }, async getAllEvents(req,res){
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
      
    }, async deleteAllevents(req, res){
        await Event.deleteMany({}, function(err, result) {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          });
        
        // const result = async () => await Event.deleteMany()
        // .then(function(){ 
        //     console.log("Data deleted"); // Success 
        // }).catch(function(error){ 
        //     console.log(error); // Failure 
        // }); 
    }
}