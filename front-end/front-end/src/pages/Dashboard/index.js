import React , {useState , useEffect}from 'react' ;
import DashboardEvent from  './DashboardEvent'
import api from '../../Services/api';


 function Dashboard (){
    const [filter,setFilter] = useState('');
    const [events,setEvent] = useState([]);
    console.log("alaaaaaaaaaaaaaaaaa ");
    const user_id = localStorage.getItem('user');

    console.log("alaa " + user_id);
    const getEvents = async () => {
        const url = filter ? `/dashboard/${filter}` : '/dashboard' ;
        const response =  await api.get(url , { headers : {user_id}}) ;
        console.log(url) ;
        response.data && setEvent(response.data) ; 
        console.log(events) ;
    }
    

   
    useEffect( 
    getEvents
    ,[]);
    return (
        <div>
         {events.map((event) => ( <DashboardEvent event={event}> </DashboardEvent>))} 
         <h1>hello from dashboard</h1>
        </div>
       
       
    )

}

 export default Dashboard ;