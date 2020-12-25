import React, { useState , useMemo} from 'react';
import api from '../../Services/api'
import { Container, Button, Form, FormGroup, Input, Label ,Alert } from 'reactstrap';
import CameraIcon from '../../assets/cameraIcon.png'
import "./event.css";
export default function Event (){
    const user_id = localStorage.getItem('user');
    console.log(user_id);
    const [sport,setSport] = useState('');
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [thumbnail,setThumbnail] = useState(null);
    const [date,setDate] = useState('');
   const [errorMessage, setErrorMessage] = useState(false);
   const [success , setSuccessValue] = useState(false);

    console.log(title + " " + description + " " + price);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    const submitHandler = async (evt) => { 
        evt.preventDefault();
        const user_id = localStorage.getItem('user');

        const eventData = new FormData();
       
        eventData.append("thumbnail", thumbnail)
        eventData.append("title", title)
        eventData.append("description", description)
        eventData.append("price", price)
        eventData.append("sport", sport)
        eventData.append("date", new Date(date))


        try {
            if (title !== "" &&
                description !== "" &&
                price !== "" &&
                sport !== "" &&
                date !== "" &&
                thumbnail !== null
            ) {
                console.log("Event has been sent")
                await api.post("/event/createEvent", eventData, { headers: { user_id } })
                console.log(eventData)
                console.log("Event has been saved")
                setSuccessValue(true);
            } else {
                setErrorMessage(true)
                setTimeout(() => {
                    setErrorMessage(false)
                }, 5000)
                //setSuccessValue("missing");
                console.log("Missing required data")
            }
        } catch (error) {
            Promise.reject(error);
            console.log(error);
            setSuccessValue(false);
        }
    }
    
return (
    <Container>
           <form onSubmit={submitHandler}>
        <FormGroup>
          <Label>Upload image </Label> <br/>
          <Label id='thumbnail' style={{ backgroundImage: `url(${preview})` }} className={thumbnail ? 'has-thumbnail' : ''}>
                        <Input type="file" onChange={evt => setThumbnail(evt.target.files[0])} />
                        <img src={CameraIcon} style={{maxwidth :  "50px" , height: "50px"  } } alt="upload icon image" />
          </Label>
          
         </FormGroup>
         
         <FormGroup>
          <Label>Title </Label> <br/>
          <input id='sport' value={title} type="text" placeholder="Sport Title" onChange={(event) => setTitle(event.target.value)}></input>
         </FormGroup>

         <FormGroup>
          <Label>Sport </Label> <br/>
          <input id='sport' value={sport} type="text" placeholder="Sport Title" onChange={(event) => setSport(event.target.value)}></input>
         </FormGroup>

         <FormGroup>
          <Label>Description </Label> <br/>
          <input id='description' value={description} type="text" placeholder="Description" onChange={(event) => setDescription(event.target.value)}></input>
         </FormGroup>

         <FormGroup>
          <Label>Price </Label> <br/>
          <input id='price' value={price} type="text" placeholder="Price" onChange={(event) => setPrice(event.target.value)}></input>
         </FormGroup>

         <FormGroup>
          <Label>Date </Label> <br/>
          <input id='date' value={date} type="date" placeholder="Date" onChange={(event) => setDate(event.target.value)}></input>
         </FormGroup>

         <Button type='submit'>Create Event</Button>
    </form>
    { (errorMessage) ? <Alert className="event-validation" color="danger"> Missing required information</Alert> : "" }
    { (success) ? <Alert color="success" className="event-validation"> The event is saved successfully </Alert> : "" }
    </Container>
    

        
    

)
   
   

}

