import React from 'react' ;
import { Container } from 'reactstrap';
import moment from 'moment';



 function DashboardEvent (props){
   
    return (
        <Container>
          
            <header style={{ backgroundImage: `url(${props.event.thumbnail_url})` }} />
            <strong>{props.event.title}</strong>
            <span>Event Date: {moment(props.event.date).format('l')}</span>
            <span>Event Price: {parseFloat(props.event.price).toFixed(2)}</span>
            <span>Event Description: {props.event.description} </span>
            
              
        </Container>
         

        
       
        
       
       
    )

}

 export default DashboardEvent ;