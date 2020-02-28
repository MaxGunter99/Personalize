import React , { Component , Suspense } from 'react';
import FeatherIcon from 'feather-icons-react';
import '../css/Settings.css';

export default class Settings extends Component{

    constructor(props){
        super(props)
        this.state = {
            settings: {

                weather: props.weather,
                stats: props.stats

            }
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
                            { this.state.settings.weather === true ? 

                                <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { this.props.toggleWeather }/>
                            : 
                                <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { this.props.toggleWeather }/> 
                            }

                        </div>
                        <div>
                            <h2>Stats</h2>
                            { this.state.settings.stats === true ? 
                                <FeatherIcon icon="toggle-left" size="30" color='green' onClick = { this.props.toggleStats }/>
                            : 
                                <FeatherIcon icon="toggle-right" size="30" color='red' onClick = { this.props.toggleStats }/> 
                            }
                        </div>
                    </div>

                </div>


            </Suspense>
    
        )
    }

}