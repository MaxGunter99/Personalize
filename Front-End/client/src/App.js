import React, { Suspense , lazy } from 'react';
import './css/Nav.css';
import { Route, NavLink } from 'react-router-dom';
import Axios from 'axios';
import FeatherIcon from 'feather-icons-react';

//Imported Components
import EditJob from './Components/EditJob';
import Jobs from './Components/Jobs';
import Job from './Components/Job';
import Calendar from './Components/Calendar';
import AddJobForm from './Components/AddJobForm';
import Home from './Components/Home';
import CalendarEvent from './Components/CalendarEvent';
import Settings from './Components/Settings';
// const Weather = React.lazy(() => import('./Components/Weather'));
import Weather from './Components/Weather';



export default class App extends React.Component {

  constructor() {
    super();
    this.state = {

      // For settings
      weather: true,

      weatherSettings: {
        location: true,
        description: true,
        temp: true,
        sunrise: true,
        sunset: true

      },

      stats: true,

    }
  }

  toggle = ( e, item , bool ) => {

    e.preventDefault();

    if ( item === 'weather' || item === 'stats' ) {

      if ( item === 'weather' ) {
        this.setState({ weather: bool })
      } else {
        this.setState({ stats: bool })
      }

    } else {

      this.setState({
        ...this.state,
        weatherSettings: {
          ...this.state.weatherSettings,
          [item]: bool
        }
      })
      console.log( this.state.weatherSettings )
    }

  }

  render() {
    return (

      <div className="App">

        <header className='HomePageHeader'>

          <h1 className='Title' >Personalize</h1>

            <Weather {...this.state}/>

          <div className='Pages'>

            <NavLink exact to='/' ><FeatherIcon icon="home" size="30" /></NavLink>
            <NavLink exact to='/Jobs' ><FeatherIcon icon="briefcase" size="30" /></NavLink>
            <NavLink exact to='/Schedule' ><FeatherIcon icon="calendar" size="30" /></NavLink>
            <NavLink exact to='/Settings' ><FeatherIcon icon="settings" size="30"/></NavLink>

          </div>

        </header>

        <Route exact path='/' component={Home} />
        <Route exact path='/Jobs' component={Jobs} />
        <Route exact path='/Schedule' component={Calendar} />
        <Route exact path='/AddJob' component={AddJobForm} />
        <Route exact path='/Job/:id' component={Job} />
        <Route exact path='/Job/Edit/:id' component={EditJob} />
        <Route exact path='/Schedule/:id/:id/:id' component={CalendarEvent} />
        <Route exact path='/Settings' component={() => ( <Settings {...this.state} toggle = { this.toggle }/> ) } />


      </div>

    );
  }
}

// export default withRouter( App );