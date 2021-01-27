import React , {useState , useEffect}from 'react' ;
import DashboardEvent from  './DashboardEvent'
import api from '../../Services/api';
import { Button, ButtonGroup } from 'reactstrap';
import './dashboardgrid.css' ;

 function Dashboard ({ history }){
    
    const [events,setEvent] = useState([]);
    const user = localStorage.getItem('userToken');
    const user_id = localStorage.getItem('userID');
    const [rSelected,setRSelected] = useState(null);
    const [f ,setF] = useState(null);
  
    const logOutHandler = ()=> {
        localStorage.removeItem('userID');
        localStorage.removeItem('userToken');
        history.push('/login');
    }
    const checkEvents = (query) => {
        setRSelected(query);
        setF(query);
        getEvents(query);
        
    }
    // const deleteEventHandler = async (event_id) => {
    //     const url = `/events/${event_id}`
    //     const response =  await api.delete(url) ;
    //     console.log(url) ;
           
    // }
    const getEvents = async (filter) => {
        if(filter == "myEvents"){
            console.log("allllllllaaaaaaaa " +filter);
            const url = '/dashboardUserId' ;
            const response =  await api.get(url , { headers : {user}}) ;
            // console.log(url + "alllllllllll " +response.data) ;
           // setEvent(response.data)
            response.data && setEvent(response.data.events) ;
        }else{
            
            const url = filter ? `/dashboard/${filter}` : '/dashboard' ;
            console.log("allllllllaaaaaaaa filter =" +filter + " url = " + user);
            const response =  await api.get(url , { headers : {user}}) ;
            //console.log(url + "alllllllllll " +response.data) ;
           // setEvent(response.data)
            response.data && setEvent(response.data.events) ;
        }
         
        
    }


    useEffect( 
    getEvents
    ,[]);
    return (
        <>
            <Button style={{backgroundColor:'#FF3D40' , margin:'10px'}} onClick={logOutHandler}>Log Out</Button>
            <Button style={{backgroundColor:'tomato' , margin:'10px'}} onClick={() => history.push("/event")}>Create Event</Button>
            <h1 className="eventgrid">Sport's Events</h1>
            <div className="fitbuttons">
                <ButtonGroup className="eventgrid_button">
                     <Button color="primary" onClick={() => checkEvents(null)} active={rSelected === null}>All Sport</Button>
                     <Button color="primary" onClick={() => checkEvents("myEvents")} active={rSelected === "myEvents"}>My Events</Button>
                     <Button color="primary" onClick={() => checkEvents("running")} active={rSelected === "running"}>Running</Button>
                     <Button color="primary" onClick={() => checkEvents("swimming")} active={rSelected === "swimming"}>Swimming</Button>
                     <Button color="primary" onClick={() => checkEvents("cycling")} active={rSelected === "cycling"}>Cycling</Button>
                </ButtonGroup>
                
            </div>
            
            <ul  className="eventgrid">
               {events.map((event) => ( 
                   <li key={event._id}>
                     <DashboardEvent event={event} filterHandler={checkEvents} filterd={rSelected} > </DashboardEvent>
                     <Button id="subButton" color="primary">Subscribe</Button>
                   </li>
                 ))
                } 
            </ul>
            
        </>
       
       
       
    )

}

 export default Dashboard ;