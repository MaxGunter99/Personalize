import React from 'react';
import './css/Nav.css';
import './css/Weather.css'
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



export default class App extends React.Component {

  constructor() {
    super();
    this.toggleWeather = this.toggleWeather.bind(this);
    this.state = {
  
      // For weather Component
      location: '',
      temp: '',
      feelsLike: '',
      description: '',
      descriptionImg: '',
      sunrise: '',
      sunset: '',

      // For settings
      stats: true,
      weather: true

    }
  }

  componentDidMount() {

    Axios
      .get('http://api.openweathermap.org/data/2.5/weather?q=Austin&APPID=31d108f3bb32d9ddb53203d1fc57ca6b')
      .then(res => {

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

  toggleWeather = ( e ) => {
    e.preventDefault();

    if ( this.state.weather === true ) {
      this.setState({ weather: false })
    } else {
      this.setState({ weather: true })
    }
  }

  toggleStats = ( e ) => {
    e.preventDefault();

    if ( this.state.stats === true ) {
      this.setState({ stats: false })
    } else {
      this.setState({ stats: true })
    }
  }

  render() {
    return (

      <div className="App">

        <header className='HomePageHeader'>

          <h1 className='Title' >Personalize</h1>


          { this.state.weather === true ?

            <div className='Weather'>

              <div>
                <p><FeatherIcon icon="map-pin" size="24" /> {this.state.location}</p>
              </div>

              <div>
                {/* <img src={this.state.descriptionImg} /> */}
                <p>{this.state.description}</p>
              </div>

              <div>
                <p>{this.state.temp}℉</p>
              </div>

              <div>
                <FeatherIcon icon="sunrise" size="20" />
                <p>{this.state.sunrise}</p>
              </div>

              <div>
                <FeatherIcon icon="sunset" size="20" />
                <p>{this.state.sunset}</p>
              </div>

            </div>

          : null }

          <div className='Pages'>

            <NavLink exact to='/' ><FeatherIcon icon="home" size="30" /></NavLink>
            <NavLink exact to='/Jobs' ><FeatherIcon icon="briefcase" size="30" /></NavLink>
            <NavLink exact to='/Schedule' ><FeatherIcon icon="calendar" size="30" /></NavLink>
            <NavLink exact to='/Settings' ><FeatherIcon icon="settings" size="30"/></NavLink>

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
        <Route exact path='/Settings' component={() => (<Settings {...this.state} toggleWeather = { this.toggleWeather } toggleStats = { this.toggleStats } />) } />


      </div>

    );
  }
}

// export default withRouter( App );
