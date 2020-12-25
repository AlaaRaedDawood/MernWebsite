
const Uuser = require('../Models/User');
const bcrypt = require('bcrypt');
const { deleteAllevents } = require('./EventController');
module.exports = {
    async createUser (req,res){
        try{
            //console.log("alaa hiii " ) ;
            const {firstName , lastName , email , password} = req.body;
            //bcrypt password 
            const hashpassword = await bcrypt.hash(password , 10);
            //check if user already exists 
            const existentUser = await Uuser.findOne({email});
            if(!existentUser){
                const uuser1 = await Uuser.create(
                    {
                    first_name : firstName ,
                    last_name : lastName ,
                    email : email ,
                    password : hashpassword
                    } 
                )
                
                return res.json(uuser1);
                
            }
            
            return res.status(200).json({
                message : 'the user already exist' 
            })
            
        }
        catch (err) {
			throw Error(`Error while Registering new user :  ${err}`)
		}
    },
    async getUserById (req,res){
        
        const {userID} = req.params;
        console.log(userID);
        try{
            const user = await Uuser.findById(userID);
            return res.json(user)
            
        }
        catch (error) {
            return res.status(404).json(
                {
                    'message' : 'you failed' 
                }
            )
		}
    }, async deleteAllUsers(req ,res){
        try{
            const response = await Uuser.deleteMany({});
            res.send(response)
        }catch(err){
            res.status(500).send(err);
        }
       
    }
}