import React, { useState , useMemo} from 'react';
import api from '../../Services/api'
import { Container, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import CameraIcon from '../../assets/cameraIcon.png'
export default function Event (){
    const user_id = localStorage.getItem('user');
    console.log(user_id);
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [thumbnail,setThumbnail] = useState('');
    const [date,setDate] = useState('');
    
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    const submitHandler = () => { 
       return " " 
    }
    
return (
    <Container>
           <form onSubmit={submitHandler}>
        <FormGroup>
          <Label>Upload image </Label> <br/>
          <Label id='thumbnail' style={{ backgroundImage: `url(${preview})` }} ></Label>
          <input id='thumbnail' type="file" onChange={evt => setThumbnail(evt.target.files[0])}></input>
          <img src={CameraIcon} style={{maxwidth :  "50px" , height: "50px"  } } ></img>
         </FormGroup>
         
         <FormGroup>
          <Label>Sport </Label> <br/>
          <input id='sport' value="sport" type="text" placeholder="Sport Title" onChange={(event) => setTitle(event.target.value)}></input>
         </FormGroup>

         <FormGroup>
          <Label>Description </Label> <br/>
          <input id='description' value="description" type="text" placeholder="Description" onChange={(event) => setDescription(event.target.value)}></input>
         </FormGroup>

         <FormGroup>
          <Label>Price </Label> <br/>
          <input id='price' value="0" type="text" placeholder="Price" onChange={(event) => setPrice(event.target.value)}></input>
         </FormGroup>

         <FormGroup>
          <Label>Date </Label> <br/>
          <input id='date' value="date" type="text" placeholder="Date" onChange={(event) => setDate(event.target.value)}></input>
         </FormGroup>

         <Button type='submit'>Create Event</Button>
    </form>
    </Container>
    

        
    

)
   
   

}

