import React , {useState , useEffect , useMemo }from 'react' ;
import api from '../../Services/api';


 function RegisterationsView ({ history }){ 
     const user = localStorage.getItem('userToken');
     const userID = localStorage.getItem('userID');
     const [regEvents , setRegEvents] = useState([]);

     const getMyRegisteration = async () => {
        const url = `/myregisteration/${userID}`
        const registerations_events = await api.get(url,{headers : {user}});
        console.log(registerations_events);
        if(registerations_events ){
            setRegEvents(registerations_events.data);
            console.log(registerations_events.data);
        }
       

     }
     const renderRegisteration = () => {
        return regEvents.length > 0 ? "alaa" : " " ;
    } 
     useEffect( getMyRegisteration, []);
     return (
        <div>
        
         { regEvents.map((registeration) => 
         <div>
            <p>{registeration.eventTitle}</p>
            <p>{registeration.owner}</p>
         </div>
         ) } 
         {console.log("hello " + regEvents.length)}
         <p>HElloooo {renderRegisteration}</p>

        </div>
     )
    

 }

 export default RegisterationsView ; 