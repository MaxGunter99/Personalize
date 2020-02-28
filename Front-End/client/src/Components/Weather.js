import React, { Component } from 'react';
import '../css/Weather.css';
import FeatherIcon from 'feather-icons-react';
import Axios from 'axios';

export default class Weather extends Component {

    constructor(props) {
        super(props);

        this.state = {

            weather: props.weather,

            weatherData: {
                location: '',
                description: '',
                temp: '',
                sunrise: '',
                sunset: ''
            },

            weatherSettings: {

                location: props.weatherSettings.location,
                description: props.weatherSettings.description,
                temp: props.weatherSettings.temp,
                sunrise: props.weatherSettings.sunrise,
                sunset: props.weatherSettings.sunset
        
            }

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

                this.setState({
                    location: res.data.name,
                    temp: Math.floor(currentWeatherInF),
                    feelsLike: Math.floor(feelsLikeWeatherInF),
                    description: res.data.weather[0].description,
                    sunrise,
                    sunset,
                    descriptionImg: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
                });

            })
            .catch(err => {
                console.log('ERROR', err)
            })
    }

    render() {
        return (

            <div className='Weather'>

                <div>
                    {this.state.weatherSettings.location === true ? 
                        <p><FeatherIcon icon="map-pin" size="24" /> {this.state.location}</p>
                    : null }
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

                <button onClick = { () => console.log( this.state ) }>Hi</button>

            </div>

        )
    }

}