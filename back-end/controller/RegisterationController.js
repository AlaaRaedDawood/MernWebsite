const User = require('../Models/User');
const Event = require('../Models/Event');
const Registration = require('../Models/Registration');
const jwt = require('jsonwebtoken');
module.exports = {
    async create(req, res) {
        const { user_id } = req.headers;
        const { eventId } = req.params;
        const { date } = req.body;
        console.log(user_id);
        try{
            const registration = await Registration.create({
                user: user_id,
                event: eventId,
                date
            })
    
            await registration
                .populate('event')
                .populate('user','-password') // we add second argument so we remove the password
                .execPopulate();
            return jwt.sign({ user: registration }, 'secret', (err, token) => {
				return res.json({
					user: token,
					user_id: registration._id
				})
			})
            //return res.json(registration)
        }
        catch(err){
            throw Error(`Error while Registering new user :  ${err}`)
        }
    }, 
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