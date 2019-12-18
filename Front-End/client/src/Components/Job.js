import React from 'react';
import { NavLink } from 'react-router-dom';

import { DeleteJob , GetOneJob } from '../Actions/index';
import { connect } from 'react-redux';

import '../css/Job.css';

class Job extends React.Component {

    state = {
        id: window.location.href.split('/')[4],
        // job: {}
    }

    componentDidMount() {

        this.props.GetOneJob( this.state.id )

    }

    deleteJob = ( id ) => {

        this.props.DeleteJob( id )

        if ( this.props.error !== null ) {
            console.log( 'Error!' )            
        }

    }

    back = () => {
        this.props.history.push( '/Jobs' )
    }

    render() {

        return(

            <div>

                { this.props.loading === true ?
                    <h1>Loading</h1>

                :
                    <div className = 'Container'>

                        <header>
                            <h1>{this.props.job.CompanyName}</h1>
                            <h4>{ this.props.job.Role }</h4>
                        </header>

                        <div className = 'part'>

                            <h2>-= Outreach =-</h2>
                            <p><strong>Applied Through:</strong> {this.props.job.AppliedThrough}</p>
                            { this.props.job.ReplyRecieved === 'Yes' ? <p><strong>Reply Recieved:</strong> {this.props.job.ReplyRecieved}</p> : <p><strong>. . . No Reply yet . . .</strong></p> }
                            { this.props.job.Details !== '' ? <p><strong>Details:</strong> { this.props.job.Details }</p> : null }
                            <button onClick = { () => window.open(`${this.props.job.URL}`)}>Job Description</button>

                        </div>

                        { this.props.job.PhoneScreen === 'Yes' ? 

                            <div className = 'part'>

                                <h2>-= Phone Screen =-</h2>
                                <p><strong>Scheduled or Completed:</strong> { this.props.job.ScheduledOrCompleted }</p>
                                <p><strong>Phone Screen Date:</strong> { this.props.job.PhoneScreenDate }</p>
                                { this.props.job.FollowUp !== '' ? <p><strong>Follow Up:</strong> { this.props.job.FollowUp }</p> : null }
                                { this.props.job.FollowUpDate !== '' ? <p><strong>Follow Up Date:</strong> { this.props.job.FollowUpDate }</p> : null }
                                { this.props.job.FollowUpReply !== '' ? <p><strong>Follow Up Reply:</strong> { this.props.job.FollowUpReply }</p> : null }

                            </div> 

                        : null }

                        { this.props.job.OnSite === 'Yes' ? 

                            <div className = 'part'>

                                <h2>-= On Site =-</h2>
                                <p><strong>Opportunity Type:</strong> { this.props.job.OpportunityType }</p>
                                <p><strong>Initial Compensation $:</strong> { this.props.job.InitialCompensation }</p>
                                <p><strong>Negotiated:</strong> { this.props.job.Negotiated }</p>
                                <p><strong>Salary:</strong> { this.props.job.Salary }</p>
                                <p><strong>Accepted Or Rejected:</strong> { this.props.job.AcceptedOrRejected }</p>

                            </div> 

                        : null }

                        <div calssName = 'buttons'>
                            <button onClick ={ () => this.back() }>Back</button>
                            <NavLink className = 'Edit' exact to = {`/Job/Edit/${this.state.id}`}>Edit</NavLink>
                            <button onClick ={ () => this.deleteJob( this.state.id ) }>Delete Job</button>
                        </div>
                    </div>
                }

            </div>

        )

    }

}

const mapStateToProps = state => {

    return {
        job: state.jobReducer.job,
        loading: state.jobReducer.loading,
        error: state.jobReducer.error
    }

}

export default connect(mapStateToProps, { DeleteJob , GetOneJob })(Job);