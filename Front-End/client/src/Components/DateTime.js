import React from 'react';
import '../css/Nav.css';

export default class Time extends React.Component {

    constructor() {

        super()
        this.state = {
            time: new Date(),
            reduxUpdate: 0
        };
    };

    // Update Current Time
    updateCurrentTime() {

        // Update redux state every minute
        if ( this.state.reduxUpdate === 59 ) {

            this.setState({

                time: new Date(),
                reduxUpdate: 0
    
            });

        } else {

            this.setState({

                time: new Date(),
                reduxUpdate: this.state.reduxUpdate + 1

            });

        }

    };

    // Update the time every second
    componentDidMount() {

        setInterval( () => this.updateCurrentTime() , 1000 );

    };

    // Render Time Component
    render() {
        return (

            <div className = 'TimeContainer'>
                <h3>{ this.state.time.toLocaleDateString() }</h3>
            </div>

        )
    };
};