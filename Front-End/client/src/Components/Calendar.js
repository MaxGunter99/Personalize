
import React from 'react';
import '../css/Calendar.css';

class Home extends React.Component {

    render() {
        return (

            <div className = 'Calendar'>
                <h1>Schedule / Calendar</h1>
                <p>visual calendar (Month)</p>
                <p>Text reminders about scheduled events</p>

                <h1>SCHEMA</h1>
                <p>Category</p>
                <p>Title</p>
                <p>Date</p>
                <p>Link</p>

            </div>
        )
    };

};

export default Home;