import React from 'react';
import './css/App.css';
import { Route , NavLink , withRouter } from 'react-router-dom';

//Imported Components
import Time from './Components/DateTime';
import Home from './Components/Home';
import Jobs from './Components/Jobs';
import ToDos from './Components/ToDos';
import Calendar from './Components/Calendar';

function App() {
  return (

    <div className="App">

      <header className = 'HomePageHeader'>

        <h1 className = 'Title' >Personalize</h1>

        <NavLink exact to = '/' >Home</NavLink>
        <NavLink exact to = '/Jobs' >Jobs</NavLink>
        <NavLink exact to = '/ToDos' >To-Do's</NavLink>
        <NavLink exact to = '/Schedule' >Schedule</NavLink>

        <Time/>

      </header>

      <Route exact path = '/' component = { Home } />
      <Route exact path = '/Jobs' component = { Jobs } />
      <Route exact path = '/Todos' component = { ToDos } />
      <Route exact path = '/Schedule' component = { Calendar } />

    </div>

  );
}

export default withRouter( App );
