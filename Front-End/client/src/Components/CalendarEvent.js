import React from 'react';
import axios from 'axios'

export default class CalendarEvent extends React.Component {

    state = {
        event: `${window.location.href.split('/')[4]}/${window.location.href.split('/')[5]}/${window.location.href.split('/')[6]}`,
    }

    render() {

        console.log( this.state.event )
        console.log( 'hi' )

        return(

            <div>
                <header>
                <h1>{this.state.event}</h1>
                </header>
            </div>

        )
    }
}