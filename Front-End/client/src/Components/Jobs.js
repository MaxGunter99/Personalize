
import React from 'react';
import '../css/Jobs.css';
import { NavLink } from 'react-router-dom';
import Stats from './Stats';
import { GetAllJobs } from '../Actions/index';
import { connect } from 'react-redux';

class Jobs extends React.Component {

    componentDidMount() {
        this.props.GetAllJobs()
    }

    constructor(props) {
        super(props);
        this.state = {
            jobs: props.jobs,
            edit: 'Inactive',
            view: '',
            filterJobs: false,
            filter: [],
            search: ''
        }
    }

    // Update State When Entering Info
    changeHandler = event => {

        event.preventDefault();
        this.setState({
            ...this.state.job,
            search: event.target.value
        });

        // console.log( this.state.startDate )

    };

    // Toggles state of how many filters the user wants to be displayed
    toggleUpdate = () => {

        if ( this.state.edit === 'Active' ) {
            return this.setState({ edit: 'Inactive' })

        } else {
            return this.setState({ edit: 'Active' })

        }

    }

    filter = ( content ) => {

        if ( content === 'Clear' ) {

            this.setState({
                jobs: [],
                replies: 0,
                view: '',
                filterJobs: false,
                filter: [],
                search: ''
            })

            this.componentDidMount()

        } else if ( this.state.filterJobs === true ) {

            if ( content !== this.state.filter[0] ) {

                this.setState({ filterJobs: true })
                this.state.filter.pop()
                this.state.filter.push( content )
                this.componentDidMount()

            }

        } else if ( this.state.filterJobs === false ) {

            this.setState({ filterJobs: true })
            this.state.filter.push( content )
            this.componentDidMount()

        }

    }

    render() {

        return (

            <div className = 'Jobs'>

                <nav>
                    <h1>Jobs</h1>
                </nav>

                <div className = 'Filters'>

                    <div>
                        <NavLink exact to = '/AddJob' >Add Job</NavLink>
                        <input
                            id = 'Search'
                            type = 'text'
                            className = 'CompanySearch'
                            placeholder = 'Search'
                            onChange = { this.changeHandler }
                            value = {this.state.search}></input>
                        <button onClick = { () => this.filter( 'Search' ) }>Search</button>
                    </div>

                    <div>

                        { this.state.filterJobs === true ? 
                            <button onClick = { () => this.filter( 'Clear' ) } style = {{ backgroundColor: 'red' , color: 'white' }}>Clear Filter</button> 
                        : 
                            <button onClick = { () => this.filter( 'Clear' ) }>Clear Filter</button>
                        }

                        { this.state.edit === 'Inactive' ? 
                            <button onClick = { () => this.toggleUpdate() }>More</button>
                        : 
                            <button onClick = { () => this.toggleUpdate() }>Less</button>
                        }

                    </div>

                    { this.state.edit === 'Active' ? 
                        <div className = 'More'>
                            <button onClick = { () => this.filter( 'Pending' ) }>Pending</button>
                            <button onClick = { () => this.filter( 'PhoneScreen' ) } >Phone Screens</button>
                            <button onClick = { () => this.filter( 'Rejects' ) }>Rejects</button> 
                        </div>
                    : 
                        <div className = 'More'></div>
                    }

                </div>

                <Stats/>

                { this.props.loading === true  ?

                    // If there are no results, render ⬇︎
                    <div className = 'JobContainer'>     
                        <h1 style = {{ color: 'white' }}>Loading</h1>
                    </div>

                :

                    // Map all the jobs out
                    <div className = 'JobContainer'>

                        { this.props.jobs.map( ( x ) =>

                            <div className = 'Job' key = {x.id} onClick = { ()  => window.location = `/Job/${x.id}`}>

                                <div className = 'Header'>

                                    <div>

                                        <h2 className = 'CompanyName'>{x.CompanyName}</h2>
                                        <h4 className = 'Role'>{x.Role}</h4>

                                    </div>

                                </div>

                                <div className = 'Applied'>

                                    <p>{x.AppliedThrough}</p>
                                    <p className = "Date">{x.DateApplied}</p>

                                </div>

                            </div>
                        )}
                    </div>
                }

            </div>
        )
    };

};

const mapStateToProps = state => {

    return {
        jobs: state.jobReducer.jobs,
        loading: state.jobReducer.loading
    }

}

export default connect(mapStateToProps, { GetAllJobs })(Jobs);