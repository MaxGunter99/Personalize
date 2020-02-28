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

                        <div className = 'Section'>

                            <div>

                                <h2>All Weather</h2>
                                { this.state.weather === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'weather' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'weather' , true ) }/> 
                                }

                            </div>

                            <div>

                                <h2>Location</h2>
                                { this.state.weatherSettings.location === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'location' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'location' , true ) }/> 
                                }

                            </div>

                            <div>

                                <h2>Description</h2>
                                { this.state.weatherSettings.description === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'description' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'description' , true ) }/> 
                                }

                            </div>

                            <div>

                                <h2>Temperature</h2>
                                { this.state.weatherSettings.temp === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'temp' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'temp' , true ) }/> 
                                }

                            </div>

                            <div>

                                <h2>Sunrise</h2>
                                { this.state.weatherSettings.sunrise === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'sunrise' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'sunrise' , true ) }/> 
                                }

                            </div>

                            <div>

                                <h2>Sunset</h2>
                                { this.state.weatherSettings.sunset === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'sunset' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'sunset' , true ) }/> 
                                }

                            </div>


                        </div>

                        <div className = 'Section'>
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

                </div>

            </Suspense>
    
        )
    }

}