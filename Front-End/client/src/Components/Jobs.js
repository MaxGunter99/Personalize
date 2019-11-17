
import React from 'react';
import '../css/Jobs.css';

class Jobs extends React.Component {

    render() {
        return (

            <div className = 'Jobs'>

                <nav>

                    <p>Add Job</p>
                    <h1>Jobs</h1>
                    <p>update Job Status</p>

                </nav>

                <div className = 'Statistics'>

                    <p># of jobs applied ( Today )</p>
                    <p># of jobs applied ( This week )</p>
                    <p># of jobs applied ( All time )</p>

                </div>

                <p>graph of job search activity?</p>
                <p>jobs that have reached out to me ( potential hires )</p>
                <p>% of jobs that have reached out for an interview</p>
                <p>% of jobs that have passed me up</p>
                <p>Text or email remonders about following up, or applying to jobs if under 5 per day!</p>

            </div>
        )
    };

};

export default Jobs;