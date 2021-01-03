import React , {useState , useEffect}from 'react' ;
import DashboardEvent from  './DashboardEvent'
import api from '../../Services/api';
import { Button, ButtonGroup } from 'reactstrap';
import './dashboardgrid.css' ;

 function Dashboard (){
    
    const [events,setEvent] = useState([]);
    const user_id = localStorage.getItem('user');
    const [rSelected,setRSelected] = useState(null);
    const [f ,setF] = useState(null);
    
    const checkEvents = (query) => {
        setRSelected(query);
        setF(query);
        getEvents(query);
        
    }

    const getEvents = async (filter) => {
        console.log("allllllllaaaaaaaa " +filter);
        const url = filter ? `/dashboard/${filter}` : '/dashboard' ;
        const response =  await api.get(url , { headers : {user_id}}) ;
        console.log(url) ;
        response.data && setEvent(response.data) ; 
        
    }
    

   
    useEffect( 
    getEvents
    ,[]);
    return (
        <>
            <h1 class="eventgrid">Sport's Events</h1>
            <ButtonGroup class="eventgrid_button">
                 <Button color="primary" onClick={() => checkEvents(null)} active={rSelected === null}>All Sport</Button>
                 <Button color="primary" onClick={() => checkEvents("running")} active={rSelected === "running"}>Running</Button>
                 <Button color="primary" onClick={() => checkEvents("swimming")} active={rSelected === "swimming"}>Swimming</Button>
                 <Button color="primary" onClick={() => checkEvents("cycling")} active={rSelected === "cycling"}>Cycling</Button>
                 
            </ButtonGroup>
            <ul  class="eventgrid">
               {events.map((event) => ( 
                   <li key={event._id}>
                     <DashboardEvent event={event}> </DashboardEvent>

                     <Button color="primary">Subscribe</Button>
                   </li>
                 ))
                } 
            </ul>
        </>
       
       
       
    )

}

 export default Dashboard ;