  
import React, { useState } from 'react';
import api from '../../Services/api'
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';

export default function Login({ history }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName ,setFirstName] = useState("");
    const [lastName ,setlastName] = useState("");
 

    const handleSubmit = async evt => {
        evt.preventDefault();
        
        if(firstName && lastName && email && password){
            console.log('result of the Registeration',firstName , lastName,  email, password)
            const response = await api.post('/user/register', {firstName , lastName , email , password})
            const userId = response.data._id || false;
    
            if (userId) {
                localStorage.setItem('user', userId)
                console.log('done')
                history.push('/dashboard')
            } else {
                const { message } = response.data
                console.log(message)
            }
        }
        
    }

    return (
        <Container>
            <h2>Registeration:</h2>
            <p>Please <strong>register</strong> into your account</p>
            <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" name="firstName" id="firstName" placeholder="Your First Name" onChange={evt => setFirstName(evt.target.value)} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" name="lastName" id="lastName" placeholder="Your Last Name" onChange={evt => setlastName(evt.target.value)} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="email" name="email" id="email" placeholder="Your email" onChange={evt => setEmail(evt.target.value)} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="password" name="password" id="password" placeholder="Your password" onChange={evt => setPassword(evt.target.value)} />
                </FormGroup>
                
                <Button>Register</Button>
            </Form>
        </Container>
    );
}