import React, { Suspense, lazy } from 'react';
import './css/Nav.css';
import { Route, NavLink, withRouter } from 'react-router-dom';
import { Loading } from './Loading.gif'

//Imported Components
import Time from './Components/DateTime';

import EditJob from './Components/EditJob';
import Jobs from './Components/Jobs';
import Job from './Components/Job';
import Calendar from './Components/Calendar';
import AddJobForm from './Components/AddJobForm';
import Home from './Components/Home';
import CalendarEvent from './Components/CalendarEvent';
import Axios from 'axios';
import FeatherIcon from 'feather-icons-react';

export default class App extends React.Component {

  state = {

    location: '',
    temp: '',
    feelsLike: '',
    description: '',
    descriptionImg: '',
    sunrise: '',
    sunset: '',
    dropdown: false,
    shift: -50

  }

  componentDidMount() {

    Axios
      .get('http://api.openweathermap.org/data/2.5/weather?q=Austin&APPID=31d108f3bb32d9ddb53203d1fc57ca6b')
      .then(res => {
        console.log(res.data)

        // Kelvin to Fahrenheit
        let currentWeatherInF = (res.data.main.temp - 273.15) * 9 / 5 + 32
        let feelsLikeWeatherInF = (res.data.main.feels_like - 273.15) * 9 / 5 + 32

        // Unix to regular time

        // Sunrise
        let sunriseUnix = res.data.sys.sunrise
        let SRTime = new Date(sunriseUnix * 1000);
        let newSunriseTime = SRTime.toUTCString();
        let sunrise = new Date(newSunriseTime).toLocaleTimeString();

        // Sunset
        let sunsetUnix = res.data.sys.sunset
        let SSTime = new Date(sunsetUnix * 1000);
        let newSunsetTime = SSTime.toUTCString();
        let sunset = new Date(newSunsetTime).toLocaleTimeString();

        this.setState(
          {
            location: res.data.name,
            temp: Math.floor(currentWeatherInF),
            feelsLike: Math.floor(feelsLikeWeatherInF),
            description: res.data.weather[0].description,
            sunrise,
            sunset,
            descriptionImg: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
          }
        );

      })
      .catch(err => {
        console.log('ERROR', err)
      })
  }

  toggleDropdown = (e) => {
    e.preventDefault();
    if (this.state.dropdown === true) {
      this.setState({ dropdown: false, shift: -50 })
    } else {
      this.setState({ dropdown: true, shift: 9 })
    }
  }

  render() {
    return (

      <div className="App">

        <header className='HomePageHeader'>

          <h1 className='Title' >Personalize</h1>

          <div className='Pages'>

            <NavLink exact to='/' ><FeatherIcon icon="home" size="30" /></NavLink>
            <NavLink exact to='/Jobs' ><FeatherIcon icon="briefcase" size="30" /></NavLink>
            <NavLink exact to='/Schedule' ><FeatherIcon icon="calendar" size="30" /></NavLink>
            {this.state.dropdown === true ?
              <a style={{ backgroundColor: 'white', color: 'black', transition: '.5s' }}><FeatherIcon icon="menu" size="30" onClick={(event) => this.toggleDropdown(event)} /></a>
              :
              <a style={{ transition: '.5s' }}><FeatherIcon icon="menu" size="30" onClick={(event) => this.toggleDropdown(event)} /></a>
            }

          </div>

        </header>

        {/* <Suspense fallback={ <img src = { Loading }/> }> */}

        <Route exact path='/' component={Home} />
        <Route exact path='/Jobs' component={Jobs} />
        <Route exact path='/Schedule' component={Calendar} />
        <Route exact path='/AddJob' component={AddJobForm} />
        <Route exact path='/Job/:id' component={Job} />
        <Route exact path='/Job/Edit/:id' component={EditJob} />
        <Route exact path='/Schedule/:id/:id/:id' component={CalendarEvent} />

        {/* </Suspense> */}

        <div className='Weather' style = {{ top: `${this.state.shift}%` }}>

          <header>
            <p><FeatherIcon icon="map-pin" size="24" /> {this.state.location}</p>
          </header>

          {/* <p>{this.state.feelsLike}℉</p> */}
          <div className='Description'>
            <img src={this.state.descriptionImg} />
            <p>{this.state.description}</p>
            <p>{this.state.temp}℉</p>
          </div>


          <footer>
            <div>
              <FeatherIcon icon="sunrise" size="24" />
              <p>{this.state.sunrise}</p>
            </div>
            <div>
              <FeatherIcon icon="sunset" size="24" />
              <p>{this.state.sunset}</p>
            </div>
          </footer>

        </div>


      </div>

    );
  }
}

// export default withRouter( App );
