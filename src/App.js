import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import { Weather } from './components.js/Weather';
function App() {
  return (
    <div className="App">
      <Router>
      
    <Switch>
        <Weather/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
