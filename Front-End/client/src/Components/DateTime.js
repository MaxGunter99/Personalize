import React from 'react';
import { connect } from 'react-redux';
import { TimeUpdated } from '../Actions/index';
import '../css/Time.css';

class Time extends React.Component {

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

            // Update Redux Time State
            const newTime = { time: this.state.time.toLocaleTimeString() }
            const newDate = { date: this.state.time.toLocaleDateString() }
            this.props.TimeUpdated( newTime , newDate )

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
                <h3>{ this.state.time.toLocaleTimeString() }</h3>
            </div>

        )
    };
};

const mapStateToProps = state => {

    return {
        time: state.timeReducer.time
    }

}

export default connect( mapStateToProps , { TimeUpdated } ) ( Time );