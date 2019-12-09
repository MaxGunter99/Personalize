import React from 'react';
import axios from 'axios';
import '../css/Job.css';
import { NavLink } from 'react-router-dom';

export default class Job extends React.Component {

    state = {
        id: window.location.href.split('/')[4],
        job: {}
    }

    componentDidMount() {
        axios
            .get( `http://localhost:3000/jobs/${this.state.id}` )
            .then( res => {
                console.log( res.data )
                this.setState({
                    job: res.data
                })
            })
            .catch( error => {
                console.log( error )
            })

    }

    render() {

        return(

            <div className = 'Container'>

                <header>
                    <h1>{this.state.job.CompanyName}</h1>
                    <h4>{ this.state.job.Role }</h4>
                </header>

                <div className = 'part'>

                    <h2>-= Outreach =-</h2>
                    <p><strong>Applied Through:</strong> {this.state.job.AppliedThrough}</p>
                    <button onClick = { () => window.location = `${this.state.job.URL}`}>Job Description</button>
                    { this.state.job.ReplyRecieved === 'Yes' ? <p><strong>Reply Recieved:</strong> {this.state.job.ReplyRecieved}</p> : <p><strong>. . . No Reply yet . . .</strong></p> }
                    { this.state.job.Details !== '' ? <p><strong>Details:</strong> { this.state.job.Details }</p> : null }

                </div>

                { this.state.job.PhoneScreen === 'Yes' ? 

                    <div className = 'part'>

                        <h2>-= Phone Screen =-</h2>
                        <p><strong>Scheduled or Completed:</strong> { this.state.job.ScheduledOrCompleted }</p>
                        <p><strong>Phone Screen Date:</strong> { this.state.job.PhoneScreenDate }</p>
                        <p><strong>Follow Up:</strong> { this.state.job.FollowUp }</p>
                        <p><strong>Follow Up Date:</strong> { this.state.job.FollowUpDate }</p>
                        <p><strong>Follow Up Reply:</strong> { this.state.job.FollowUpReply }</p>

                    </div> 

                : <h2 className = 'incomplete'>No Phone Screen Yet</h2> }

                { this.state.job.OnSite === 'Yes' ? 

                    <div className = 'part'>

                        <h2>-= On Site =-</h2>
                        <p><strong>Opportunity Type:</strong> { this.state.job.OpportunityType }</p>
                        <p><strong>Initial Compensation $:</strong> { this.state.job.InitialCompensation }</p>
                        <p><strong>Negotiated:</strong> { this.state.job.Negotiated }</p>
                        <p><strong>Salary:</strong> { this.state.job.Salary }</p>
                        <p><strong>Accepted Or Rejected:</strong> { this.state.job.AcceptedOrRejected }</p>

                    </div> 

                : <h2 className = 'incomplete'>No On Site Yet</h2> }

                <NavLink exact to = {`/Job/Edit/${this.state.id}`}>Edit</NavLink>

            </div>

        )

    }

}