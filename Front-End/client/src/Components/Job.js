import React from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import FeatherIcon from 'feather-icons-react';
import '../css/Job.css';

export default class Job extends React.Component {

    constructor() {

        super();
        this.state = {
            id: window.location.href.split('/')[4],
            job: {}
        }

    }

    componentDidMount() {

        Axios
            .get(`http://localhost:3000/jobs/${this.state.id}`)
            .then(res => {
                this.setState({ job: res.data })
            });

    }

    deleteJob = (id) => {

        this.props.DeleteJob(id)

        if (this.props.error !== null) {
            console.log('Error!')
        }

    }

    back = () => {
        this.props.history.push('/Jobs')
    }

    render() {

        return (

            <div>

                <div className='Container'>

                    <header>
                        <h1>{this.state.job.CompanyName}</h1>
                        <h4>{this.state.job.Role}</h4>
                    </header>

                    <div className='part'>

                        <h2>-= Outreach =-</h2>
                        <p><strong>Applied Through:</strong> {this.state.job.AppliedThrough}</p>
                        {this.state.job.ReplyRecieved === 'Yes' ? <p><strong>Reply Recieved:</strong> {this.state.job.ReplyRecieved}</p> : <p><strong>. . . No Reply yet . . .</strong></p>}
                        {this.state.job.Details !== '' ? <p><strong>Details:</strong> {this.state.job.Details}</p> : null}

                    </div>

                    {this.state.job.PhoneScreen === 'Yes' ?

                        <div className='part'>

                            <h2>-= Phone Screen =-</h2>
                            <p><strong>Scheduled or Completed:</strong> {this.state.job.ScheduledOrCompleted}</p>
                            <p><strong>Phone Screen Date:</strong> {this.state.job.PhoneScreenDate}</p>
                            {this.state.job.FollowUp !== '' ? <p><strong>Follow Up:</strong> {this.state.job.FollowUp}</p> : null}
                            {this.state.job.FollowUpDate !== '' ? <p><strong>Follow Up Date:</strong> {this.state.job.FollowUpDate}</p> : null}
                            {this.state.job.FollowUpReply !== '' ? <p><strong>Follow Up Reply:</strong> {this.state.job.FollowUpReply}</p> : null}

                        </div>

                        : null}

                    {this.state.job.OnSite === 'Yes' ?

                        <div className='part'>

                            <h2>-= On Site =-</h2>
                            <p><strong>Opportunity Type:</strong> {this.state.job.OpportunityType}</p>
                            <p><strong>Initial Compensation $:</strong> {this.state.job.InitialCompensation}</p>
                            <p><strong>Negotiated:</strong> {this.state.job.Negotiated}</p>
                            <p><strong>Salary:</strong> {this.state.job.Salary}</p>
                            <p><strong>Accepted Or Rejected:</strong> {this.state.job.AcceptedOrRejected}</p>

                        </div>

                    : null}

                    <div className='BottomButtons'>
                        <button className = 'ActButton' onClick={() => this.back()}><FeatherIcon icon="arrow-left" size="30" /></button>
                        <NavLink className = 'ActButton' exact to={`/Job/Edit/${this.state.id}`}><FeatherIcon icon="edit" size="30" /></NavLink>
                        <button className = 'ActButton' onClick={() => window.open(`${this.state.job.URL}`)}><FeatherIcon icon="link" size="30" /></button>
                        <button className = 'ActButton' onClick={() => this.deleteJob(this.state.id)}><FeatherIcon icon="trash" size="30" /></button>
                    </div>

                </div>

            </div>

        )

    }

}