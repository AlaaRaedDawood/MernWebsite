import logo from './logo.svg';
import './App.css';
import {Container} from'reactstrap'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="App">
         <Container>
         <Login></Login>
         <Dashboard/>
         </Container>
        
      
    </div>
  );
}

export default App;
