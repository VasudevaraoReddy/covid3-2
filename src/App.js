import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import StateItem from './components/StateItem'
import Vaccination from './components/Vaccination'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route path="/state/:id" component={StateItem} />
    <Route path="/vaccination" component={Vaccination} />
  </Switch>
)

export default App
