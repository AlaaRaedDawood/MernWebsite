import React from 'react' ;
import { Container } from 'reactstrap';



 function DashboardEvent (props){

    return (
        <Container class="eventProp">
        <div style={{ backgroundImage: `url(${props.event.thumbnail})` }}> </div>
        <h1>{props.event.title}</h1>
        <p>{props.event.description} </p>
        <p>{props.event.price} </p>
        <p>{props.event.date} </p>
        <p>{props.event.sport} </p>
        <hr style={{border: "1px solid red"}}></hr>
        
        
    
   
   
        </Container>
        
       
       
    )

}

 export default DashboardEvent ;