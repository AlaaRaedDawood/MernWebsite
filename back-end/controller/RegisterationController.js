const User = require('../Models/User');
const Event = require('../Models/Event');
const Registration = require('../Models/Registration');
const jwt = require('jsonwebtoken');
module.exports = {
    async create(req, res) {
        console.log("welcome ");
         jwt.verify(req.token, 'secret', async (err, authData) => {
			if (err) {
				res.sendStatus(401).json({'mmmmmm' : 'kkkk'})
            } 
            else {
                
                const { eventId } = req.params;
                
                console.log( { eventId })
                    try{
        
                        const registration = await Registration.create({
                            user: authData.user._id,
                            event: eventId
                        })
                
                        await registration
                            .populate('event')
                            .populate('user','-password') // we add second argument so we remove the password
                            .execPopulate();
                        console.log("senttttt to "  );
                        const ownerSocket = req.connectUsers[registration.event.user]

                        if (ownerSocket) {
                            console.log("done senttttt to " + ownerSocket );
                             req.io.to(ownerSocket).emit('registration_request', registration)
                        }
                        
                        return res.status(200).json(registration)
                    }
                    catch(err){
                        throw Error(`Error while Registering new user :  ${err}`)
                    }
                          
                }});     
      
}
    , 
    async getRegisterationbyId(req , res){
        const { registeration_id } = req.params ;
        try{
            const registeration = await Registration.findById(registeration_id);
            if(!registeration){
                return res.status(404).json({"message" : "there is no registeration by this id"})
            }
           return res.status(200).json(registeration);
        }catch(err){
            throw Error(`Error while Registering new user :  ${err}`)
        }
    } , 
    async deleteAllRegisterations(req,res){
        try{
            const response = await Registration.deleteMany({});
            res.status(200).send(response);
        }catch(err){
            res.send(err);
        }
    }
};