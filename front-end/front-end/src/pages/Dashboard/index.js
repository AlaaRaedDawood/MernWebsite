import React , {useState , useEffect}from 'react' ;
import api from '../../Services/api';

 function Dashboard (){
    const [filter,setFilter] = useState('');
    const [event,setEvent] = useState([]);
    const user_id = localStorage.getItem('user');
    console.log(user_id);
    const getEvents = async () => {
        const url = filter ? `/dashboard/${filter}` : '/dashboard' ;
        const response =  await api.get(url , { headers : {user_id}}) ;
        
        response.data && setEvent(response.data) ; 
        console.log(event) ;
    }
    

   
    useEffect( 
    getEvents
    ,[]);
    return (
        <div>
         hello from dashboard 
       </div>
    )

}

 export default Dashboard ;