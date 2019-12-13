
import React from 'react';
import DatePicker from "react-datepicker";

import { connect } from 'react-redux';
import { AddJob } from '../Actions/index';

import "react-datepicker/dist/react-datepicker.css";
import '../css/AddJobForm.css';

class JobForm extends React.Component {

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

        startDate: new Date()
    }

    // Update State When Entering Info
    changeHandler = event => {
        event.preventDefault();
        // console.log( this.state.job )
        this.setState({
            job: {
                ...this.state.job,
                [event.target.name]: event.target.value
            }
        });
        // console.log( this.state.startDate )
    };

    handleChange = date => {

        this.setState({
            startDate: date
        });

        this.setState({
            job: {
                DateApplied: date.toLocaleString().split(',')[0]
            }
        });

    };

    submitDataHandler = () => {

        this.props.AddJob( this.state.job )

        console.log( this.state.props.jobReducer.addJobSuccess )


    };

    render() {

        return (

            <div className='AddJobForm'>

                <form onSubmit={() => this.submitDataHandler }>

                    <div className='section'>

                        <div className='pair'>
                            <label>Company Name:</label>
                            <input
                                id="CompanyName"
                                type="text"
                                name="CompanyName"
                                value={this.state.job.CompanyName}
                                className='input'
                                placeholder="Company Name"
                                onChange={this.changeHandler}
                            />
                        </div>

                        <div className='pair'>
                            <label>Applied Through:</label>
                            <input
                                id="AppliedThrough"
                                type="text"
                                name="AppliedThrough"
                                value={this.state.job.AppliedThrough}
                                className='input'
                                placeholder="Applied Through"
                                onChange={this.changeHandler}
                            />
                        </div>

                    </div>

                    <div className='section'>

                        <div className='pair'>
                            <label>Role:</label>
                            <input
                                id="Role"
                                type="text"
                                name="Role"
                                value={this.state.job.Role}
                                className='input'
                                placeholder="Role"
                                onChange={this.changeHandler}
                            />
                        </div>

                        <div className='pair'>
                            <label>URL:</label>
                            <input
                                id="URL"
                                type="text"
                                name="URL"
                                value={this.state.job.URL}
                                className='input'
                                placeholder="URL"
                                onChange={this.changeHandler}
                            />
                        </div>

                    </div>

                    <div className='section'>

                        <div className='pair'>
                            <label>Date Applied:</label>
                            <DatePicker
                                className='Date'
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className='pair'>
                            <label>Reply Recieved:</label>
                            <input
                                id="ReplyRecieved"
                                type="text"
                                name="ReplyRecieved"
                                value={this.state.job.ReplyRecieved}
                                className='input'
                                placeholder="Reply Recieved"
                                onChange={this.changeHandler}
                            />
                        </div>

                    </div>

                    <div className='section'>

                        <div className='pair'>
                            <label>Details:</label>
                            <input
                                id="Details"
                                type="text"
                                name="Details"
                                value={this.state.job.Details}
                                className='input'
                                placeholder="Details"
                                onChange={this.changeHandler}
                            />
                        </div>

                    </div>

                    <button type='submit' className='ActionButton'>Add</button>

                </form>
            </div>


        )

    }

}

export default connect( null , { AddJob })(JobForm)