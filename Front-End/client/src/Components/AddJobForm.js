
import React from 'react';
import '../css/Jobs.css';
import { connect } from 'react-redux';
import { AddJob } from '../Actions/index';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

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

    submitDataHandler = event => {

        event.preventDefault();
        axios
            .post( 'http://localhost:3000/jobs/' , this.state.job )
            .then( response => {
                console.log( 'Success' , response )
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
                                placeholder = "Reply Recieved"
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

                    </div>

                    <button type='submit' className='ActionButton'>Add</button>

                </form>
            </div>

        )

    }

}

export default connect(
    null,
    { AddJob }
)(JobForm)