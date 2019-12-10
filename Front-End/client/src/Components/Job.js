import React from 'react';
import '../css/Job.css';
import { NavLink } from 'react-router-dom';
import { DeleteJob , GetOneJob } from '../Actions/index';
import { connect } from 'react-redux';

class Job extends React.Component {

    state = {
        id: window.location.href.split('/')[4],
        // job: {}
    }

    componentDidMount() {

        this.props.GetOneJob( this.state.id )
        console.log( this.props.error )

    }

    deleteJob = ( id ) => {

        this.props.DeleteJob( id )

        if ( this.props.error !== null ) {
            console.log( 'hi' , this.props.error )
        }
    }

    render() {

        return(

            <div className = 'Container'>

                { this.props.loading === true ?
                    <h1>Loading</h1>

                :
                    <div>

                        <header>
                            <h1>{this.props.job.CompanyName}</h1>
                            <h4>{ this.props.job.Role }</h4>
                        </header>

                        <div className = 'part'>

                            <h2>-= Outreach =-</h2>
                            <p><strong>Applied Through:</strong> {this.props.job.AppliedThrough}</p>
                            <button onClick = { () => window.location = `${this.props.job.URL}`}>Job Description</button>
                            { this.props.job.ReplyRecieved === 'Yes' ? <p><strong>Reply Recieved:</strong> {this.props.job.ReplyRecieved}</p> : <p><strong>. . . No Reply yet . . .</strong></p> }
                            { this.props.job.Details !== '' ? <p><strong>Details:</strong> { this.props.job.Details }</p> : null }

                        </div>

                        { this.props.job.PhoneScreen === 'Yes' ? 

                            <div className = 'part'>

                                <h2>-= Phone Screen =-</h2>
                                <p><strong>Scheduled or Completed:</strong> { this.props.job.ScheduledOrCompleted }</p>
                                <p><strong>Phone Screen Date:</strong> { this.props.job.PhoneScreenDate }</p>
                                <p><strong>Follow Up:</strong> { this.props.job.FollowUp }</p>
                                <p><strong>Follow Up Date:</strong> { this.props.job.FollowUpDate }</p>
                                <p><strong>Follow Up Reply:</strong> { this.props.job.FollowUpReply }</p>

                            </div> 

                        : <h2 className = 'incomplete'>No Phone Screen Yet</h2> }

                        { this.props.job.OnSite === 'Yes' ? 

                            <div className = 'part'>

                                <h2>-= On Site =-</h2>
                                <p><strong>Opportunity Type:</strong> { this.props.job.OpportunityType }</p>
                                <p><strong>Initial Compensation $:</strong> { this.props.job.InitialCompensation }</p>
                                <p><strong>Negotiated:</strong> { this.props.job.Negotiated }</p>
                                <p><strong>Salary:</strong> { this.props.job.Salary }</p>
                                <p><strong>Accepted Or Rejected:</strong> { this.props.job.AcceptedOrRejected }</p>

                            </div> 

                        : <h2 className = 'incomplete'>No On Site Yet</h2> }

                        <NavLink exact to = {`/Job/Edit/${this.state.id}`}>Edit</NavLink>
                        <button onClick ={ () => this.deleteJob( this.state.id ) }>Delete Job</button>
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