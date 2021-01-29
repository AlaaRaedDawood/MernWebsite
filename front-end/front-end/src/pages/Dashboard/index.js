import React , {useState , useEffect}from 'react' ;
import DashboardEvent from  './DashboardEvent'
import api from '../../Services/api';
import { Button, ButtonGroup , Alert} from 'reactstrap';
import './dashboardgrid.css' ;
import socketio from 'socket.io-client';


 function Dashboard ({ history }){
    
    const [events,setEvent] = useState([]);
    const user = localStorage.getItem('userToken');
    const user_id = localStorage.getItem('userID');
    const [rSelected,setRSelected] = useState(null);
    const [f ,setF] = useState(null);
    const [messageHandler , setMessageHandler] = useState('');
    const [success , setSuccess] = useState(false);
    const [error , setError] = useState(false);
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

    const registerationEventHandler = async (event) => {
        
        try{
           // console.log("subscribbeeeee " ,event);
            const url = `/regist/${event._id}`
            const response =  await api.post(url , {}, { headers: { user } })
            console.log(response.data);
            setMessageHandler(`Event ${event.title} was sent successfully`);
            setSuccess(true);
            setTimeout( () => {
                setSuccess(false);
                setMessageHandler(`Subscribed to ${event.title}`);
            } ,
                2000)
        }catch(error){
            console.log(`error occured is ${error}`)
            setMessageHandler('error occured during subscribtion');
            setError(true);
            setTimeout( () => {
                setError(false);
                setMessageHandler('');
            } ,
                2000)

        }
        
        
           
    }
   
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

    useEffect(() => {
         const socket = socketio('http://localhost:8000/' , { query : {user : user_id}});

         socket.on('registration_request' , data => console.log(data))
    },[])
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
                     <Button id="subButton" color="primary" onClick={() => registerationEventHandler(event)}>Subscribe</Button>
                   </li>
                 ))
                } 
            </ul>
            {
                error ? (
                    <Alert className="event-validation" color="danger"> {messageHandler} </Alert>
                ) : ""
            }
            {
                success ? (
                    <Alert className="event-validation" color="success"> {messageHandler}</Alert>
                ) : ""
            }
            
        </>
       
       
       
    )

}

 export default Dashboard ;