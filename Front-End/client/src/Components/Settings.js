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
                feelsLike: props.weatherSettings.feelsLike,
                sunrise: props.weatherSettings.sunrise,
                sunset: props.weatherSettings.sunset
            
            },

            statsDisplay: props.statsDisplay,
            jobBoardIcons: props.jobBoardIcons,
            editResumeButton: props.editResumeButton,
        }
    }

    render() {

        return (

            <Suspense fallback = { <h1>Loading</h1> }>

                <div className = 'SettingsContainer'>

                    <h1>Settings</h1>

                    <div className='Settings'>

                        <div className = 'Section'>

                            <h2>Weather</h2>

                            <div>

                                <h3>All Weather</h3>
                                { this.state.weather === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'weather' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'weather' , true ) }/> 
                                }

                            </div>

                            <div>

                                <h3>Location</h3>
                                { this.state.weatherSettings.location === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'location' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'location' , true ) }/> 
                                }

                            </div>

                            <div>

                                <h3>Description</h3>
                                { this.state.weatherSettings.description === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'description' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'description' , true ) }/> 
                                }

                            </div>

                            <div>

                                <h3>Temperature</h3>
                                { this.state.weatherSettings.temp === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'temp' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'temp' , true ) }/> 
                                }

                            </div>

                            <div>

                                <h3>Feels Like</h3>
                                { this.state.weatherSettings.feelsLike === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'feelsLike' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'feelsLike' , true ) }/> 
                                }

                            </div>

                            <div>

                                <h3>Sunrise</h3>
                                { this.state.weatherSettings.sunrise === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'sunrise' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'sunrise' , true ) }/> 
                                }

                            </div>

                            <div>

                                <h3>Sunset</h3>
                                { this.state.weatherSettings.sunset === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e , 'sunset' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'sunset' , true ) }/> 
                                }

                            </div>


                        </div>

                        <div className = 'Section'>

                            <h2>Job Board</h2>

                            <div>
                                <h3>All Job Stats</h3>
                                { this.state.statsDisplay === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e ,'statsDisplay' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'statsDisplay' , true ) }/> 

                                }
                            </div>

                            <div>
                                <h3>Job Board Icons</h3>
                                { this.state.jobBoardIcons === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e ,'jobBoardIcons' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'jobBoardIcons' , true ) }/> 

                                }
                            </div>
                            
                            <div>
                                <h3>Edit Resume</h3>
                                { this.state.editResumeButton === true ? 

                                    <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { (e) => this.props.toggle( e ,'editResumeButton' , false ) }/>
                                : 
                                    <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { (e) => this.props.toggle( e , 'editResumeButton' , true ) }/> 

                                }
                            </div>
                        </div>

                    </div>

                </div>

            </Suspense>
    
        )
    }

}