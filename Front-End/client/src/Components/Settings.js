import React , { Component , Suspense } from 'react';
import FeatherIcon from 'feather-icons-react';
import '../css/Settings.css';

export default class Settings extends Component{

    constructor(props){
        super(props)
        this.state = {

            weather: props.weather,
            weatherSettings: {

                location: props.weatherSettings.location,
                description: props.weatherSettings.description,
                temp: props.weatherSettings.temp,
                sunrise: props.weatherSettings.sunrise,
                sunset: props.weatherSettings.sunset
            
            },

            stats: props.stats,
        }
    }

    render() {

        return (

            <Suspense fallback = { <h1>Loading</h1> }>

                <div className = 'SettingsContainer'>

                    <h1>Settings</h1>

                    <div className='Settings'>

                        <div>

                            <h2>Weather</h2>
                            { this.state.weather === true ? 

                                <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'weather' , false ) }/>
                            : 
                                <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'weather' , true ) }/> 
                            }

                            <div>

                                <h2>Location</h2>
                                { this.state.weatherSettings.location === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'location' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'location' , true ) }/> 
                                }

                            </div>


                        </div>
                        <div>
                            <h2>Stats</h2>
                            { this.state.stats === true ? 

                                <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e ,'stats' , false ) }/>
                            : 
                                <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'stats' , true ) }/> 

                            }
                        </div>
                    </div>

                </div>


            </Suspense>
    
        )
    }

}