import React , { Suspense , lazy } from 'react';
import './css/Nav.css';
import { Route , NavLink , withRouter } from 'react-router-dom';
import { Loading } from './Loading.gif'

//Imported Components
import Time from './Components/DateTime';

import EditJob from  './Components/EditJob';
import Jobs from './Components/Jobs';
import Job from './Components/Job';
import Calendar from './Components/Calendar';
import AddJobForm from './Components/AddJobForm';
import Home from './Components/Home';
import CalendarEvent from './Components/CalendarEvent';


export default class App extends React.Component {

  render() {
    return (

      <div className="App">

        <header className = 'HomePageHeader'>

          <h1 className = 'Title' >Personalize</h1>
          <div className = 'Pages'>
            <NavLink exact to = '/' >Home</NavLink>
            <NavLink exact to = '/Jobs' >Jobs</NavLink>
            {/* <NavLink exact to = '/ToDos' >To-Do's</NavLink> */}
            <NavLink exact to = '/Schedule' >Schedule</NavLink>
          </div>

          {/* <Time/> */}

        </header>

        {/* <Suspense fallback={ <img src = { Loading }/> }> */}

          <Route exact path = '/' component = { Home } />
          <Route exact path = '/Jobs' component = { Jobs } />
          <Route exact path = '/Schedule' component = { Calendar } />
          <Route exact path = '/AddJob' component = { AddJobForm } />
          <Route exact path = '/Job/:id' component = { Job } />
          <Route exact path = '/Job/Edit/:id' component = { EditJob } />
          <Route exact path = '/Schedule/:id/:id/:id' component = { CalendarEvent} />

        {/* </Suspense> */}


      </div>

    );
  }
}

// export default withRouter( App );
