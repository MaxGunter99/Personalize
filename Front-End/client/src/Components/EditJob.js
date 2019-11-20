import React from 'react';
import axios from 'axios';
import '../css/Job.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditJob extends React.Component {

    state = {
        job: {

            CompanyName: "",
            AppliedThrough: "",
            Role: "",
            URL: "",
            DateApplied: '',
            ReplyRecieved: "",
            Details: ""
        },

        startDate: new Date(),
        PhoneScreenDate: new Date(),
        id: window.location.href.split('/')[5],
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

    // Update State When Entering Info
    changeHandler = event => {
        event.preventDefault();
        this.setState({
            job: {
                ...this.state.job,
                [ event.target.name ]: event.target.value
            }
        });
        console.log( this.state.startDate )
    };

    handleChange = date => {

        this.setState({
            job: {
                startDate: date.toLocaleDateString()
            }
        });

    };

    handleChangePhoneScreen = date => {

        this.setState({
            job: {
                PhoneScreenDate: date.toLocaleDateString()
            }
        });

    };

    handleChangeFollowUpDate = date => {

        this.setState({
          FollowUpDate: date
        });

    };

    submitDataHandler = event => {
        
        event.preventDefault();
        axios
            .put( `http://localhost:3000/jobs/${this.state.id}` , this.state.job )
            .then( response => {
                console.log( 'Success' , response , this.state.job )
                window.location.href = 'http://localhost:3001/Jobs';
            })
            .catch( error => {
                console.log( error.message )
            })
        
    };

    render() {

        return(

            <div className = 'AddJobForm'>

                <form onSubmit = { this.submitDataHandler }>

                    <div className = 'section'>

                        <div className = 'pair'>
                            <label>Company Name:</label>
                            <input
                                id = "CompanyName"
                                type = "text"
                                name = "CompanyName"
                                value = { this.state.job.CompanyName }
                                className = 'input'
                                placeholder = "Company Name"
                                onChange = { this.changeHandler }
                            />
                        </div>

                        <div className = 'pair'>
                            <label>Applied Through:</label>
                            <input
                                id = "AppliedThrough"
                                type = "text"
                                name = "AppliedThrough"
                                value = { this.state.job.AppliedThrough }
                                className = 'input'
                                placeholder = "Applied Through"
                                onChange = { this.changeHandler }
                            />
                        </div>

                    </div>

                    <div className = 'section'>

                        <div className = 'pair'>
                            <label>Role:</label>
                            <input
                                id = "Role"
                                type = "text"
                                name = "Role"
                                value = { this.state.job.Role }
                                className = 'input'
                                placeholder = "Role"
                                onChange = { this.changeHandler }
                            />
                        </div>

                        <div className = 'pair'>
                            <label>URL:</label>
                            <input
                                id = "URL"
                                type = "text"
                                name = "URL"
                                value = { this.state.job.URL }
                                className = 'input'
                                placeholder = "URL"
                                onChange = { this.changeHandler }
                            />
                        </div>

                    </div>

                    <div className = 'section'>

                        <div className = 'pair'>
                            <label>Date Applied:</label>
                            <DatePicker
                                className = 'Date'
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className = 'pair'>
                            <label>Reply Recieved:</label>
                            <input
                                id = "ReplyRecieved"
                                type = "text"
                                name = "ReplyRecieved"
                                value = { this.state.job.ReplyRecieved }
                                className = 'input'
                                placeholder = "Yes or No"
                                onChange = { this.changeHandler }
                            />
                        </div>

                    </div>

                    <div className = 'section'>

                        <div className = 'pair'>
                            <label>Details:</label>
                            <input
                                id = "Details"
                                type = "text"
                                name = "Details"
                                value = { this.state.job.Details }
                                className = 'input'
                                placeholder = "Details"
                                onChange = { this.changeHandler }
                            />
                        </div>

                        <div className = 'pair'>
                            <label>Phone Screen:</label>
                            <input
                                id = "PhoneScreen"
                                type = "text"
                                name = "PhoneScreen"
                                value = { this.state.job.PhoneScreen }
                                className = 'input'
                                placeholder = "Yes or No"
                                onChange = { this.changeHandler }
                            />
                        </div>

                    </div>

                    <div className = 'section'>

                        <div className = 'pair'>
                            <label>Scheduled Or Completed:</label>
                            <input
                                id = "ScheduledOrCompleted"
                                type = "text"
                                name = "ScheduledOrCompleted"
                                value = { this.state.job.ScheduledOrCompleted }
                                className = 'input'
                                placeholder = "Scheduled Or Completed"
                                onChange = { this.changeHandler }
                            />
                        </div>

                        <div className = 'pair'>
                            <label>Phone Screen Date:</label>
                            <input
                                id = 'PhoneScreenDate'
                                type = "text"
                                name = "PhoneScreenDate"
                                value = { this.state.job.PhoneScreenDate }
                                className = 'input'
                                placeholder = "ex. 11/18/2019"
                                onChange = { this.changeHandler }
                            />
                        </div>

                    </div>

                    <div className = 'section'>

                        <div className = 'pair'>
                            <label>Follow Up:</label>
                            <input
                                id = "FollowUp"
                                type = "text"
                                name = "FollowUp"
                                value = { this.state.job.FollowUp }
                                className = 'input'
                                placeholder = "Yes or No"
                                onChange = { this.changeHandler }
                            />
                        </div>

                        <div className = 'pair'>
                            <label>Follow Up Date:</label>
                            <input
                                id = 'FollowUpDate'
                                type = "text"
                                name = "FollowUpDate"
                                value = { this.state.job.FollowUpDate }
                                className = 'input'
                                placeholder = "ex. 11/18/2019"
                                onChange = { this.changeHandler }
                            />
                        </div>

                    </div>

                    <div className = 'section'>

                        <div className = 'pair'>
                            <label>Follow Up Reply:</label>
                            <input
                                id = 'FollowUpReply'
                                type = "text"
                                name = "FollowUpReply"
                                value = { this.state.job.FollowUpReply }
                                className = 'input'
                                placeholder = "Yes or No"
                                onChange = { this.changeHandler }
                            />
                        </div>

                        <div className = 'pair'>
                            <label>On Site:</label>
                            <input
                                id = "OnSite"
                                type = "text"
                                name = "OnSite"
                                value = { this.state.job.OnSite }
                                className = 'input'
                                placeholder = "Yes or No"
                                onChange = { this.changeHandler }
                            />
                        </div>

                    </div>

                    <div className = 'section'>

                        <div className = 'pair'>
                            <label>Opportunity Type:</label>
                            <input
                                id = 'OpportunityType'
                                type = "text"
                                name = "OpportunityType"
                                value = { this.state.job.OpportunityType }
                                className = 'input'
                                placeholder = "Salary , Contract , etc."
                                onChange = { this.changeHandler }
                            />
                        </div>

                        <div className = 'pair'>
                            <label>Initial Compensation:</label>
                            <input
                                id = "InitialCompensation"
                                type = "text"
                                name = "InitialCompensation"
                                value = { this.state.job.InitialCompensation }
                                className = 'input'
                                placeholder = "$$$$"
                                onChange = { this.changeHandler }
                            />
                        </div>

                    </div>

                    <div className = 'section'>

                        <div className = 'pair'>
                            <label>Negotiated:</label>
                            <input
                                id = 'Negotiated'
                                type = "text"
                                name = "Negotiated"
                                value = { this.state.job.Negotiated }
                                className = 'input'
                                placeholder = "Yes or No"
                                onChange = { this.changeHandler }
                            />
                        </div>

                        <div className = 'pair'>
                            <label>Salary:</label>
                            <input
                                id = "Salary"
                                type = "text"
                                name = "Salary"
                                value = { this.state.job.Salary }
                                className = 'input'
                                placeholder = "$$$$"
                                onChange = { this.changeHandler }
                            />
                        </div>

                    </div>

                    <div className = 'section'>

                        <div className = 'pair'>
                            <label>Accepted Or Rejected:</label>
                            <input
                                id = 'AcceptedOrRejected'
                                type = "text"
                                name = "AcceptedOrRejected"
                                value = { this.state.job.AcceptedOrRejected }
                                className = 'input'
                                placeholder = "Accepted Or Rejected"
                                onChange = { this.changeHandler }
                            />
                        </div>

                    </div>

                    <button type='submit' className='ActionButton'>Update</button>

                </form>
            </div>

        )

    }

}
