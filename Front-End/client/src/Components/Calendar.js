
import React from 'react';
import '../css/Calendar.css';

class Home extends React.Component {

    render() {
        return (

            <div className = 'Calendar'>
                <h1>Schedule / Calendar</h1>
                <p>Todays activities</p>
                <p>this weeks activities</p>
                <p>visual calendar (Month)</p>
                <p>Text reminders about scheduled events</p>
            </div>
        )
    };

};

export default Home;