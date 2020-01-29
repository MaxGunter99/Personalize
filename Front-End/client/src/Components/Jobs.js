
import React from 'react';
import '../css/Jobs.css';
import { NavLink } from 'react-router-dom';
import Stats from './Stats';
import { GetAllJobs } from '../Actions/index';
import { connect } from 'react-redux';
import WOW from "wow.js";

class Jobs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            jobs: props.jobs,
            edit: 'Inactive',
            view: '',
            filterJobs: false,
            filter: [],
            search: '',
            filteredJobResults: []

        }
    }

    componentDidMount = () => {

        this.props.GetAllJobs()
        new WOW().init()

    }

    componentDidUpdate = () => event => {

        event.preventDefault();

    }

    // Update State When Entering Info
    changeHandler = event => {

        event.preventDefault();
        this.setState({
            ...this.state.job,
            search: event.target.value
        });

    };

    // Toggles state of how many filters the user wants to be displayed
    toggleUpdate = () => {

        if (this.state.edit === 'Active') {

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
                edit: 'Inactive',
                view: '',
                filterJobs: false,
                filter: [],
                search: '',
                filteredJobResults: []
            })

            this.toggleUpdate()

        } else if (this.state.filterJobs === true) {

            if ( this.state.filter !== content ) {
    
                this.state.filter.pop()
                this.state.filter.push( content )
                this.filterResults()

            }

        } else if (this.state.filterJobs === false) {

            this.setState({ filterJobs: true })
            this.state.filter.push(content)
            this.filterResults()

        }

    }

    filterResults() {

        if ( this.state.filter[0] === 'On Sites' ) {

            for (var w = 0; w < this.props.jobs.length; w++) {

                if (this.props.jobs[w].OnSite === 'Yes') {
                    this.state.filteredJobResults.push(this.props.jobs[w])
                }

            }

        } else if (this.state.filter[0] === 'Rejections') {
            for (var x = 0; x < this.props.jobs.length; x++) {

                if (this.props.jobs[x].FollowUpReply === 'Rejected') {
                    this.state.filteredJobResults.push(this.props.jobs[x])
                }

            }

        } else if (this.state.filter[0] === 'Phone Screens') {
            for (var y = 0; y < this.props.jobs.length; y++) {

                if (this.props.jobs[y].PhoneScreen === 'Yes') {
                    this.state.filteredJobResults.push(this.props.jobs[y])
                }

            }


        } else if (this.state.filter[0] === 'Search') {

            for (var z = 0; z < this.props.jobs.length; z++) {

                const temp = this.props.jobs[z].CompanyName.slice( 0 , this.state.search.length )
                if ( temp === this.state.search ) {
                    console.log( 'MATCH' )
                    this.state.filteredJobResults.push( this.props.jobs[z] )
                }

            }

            if ( this.state.filteredJobResults.length === 0 ) {

                console.log( 'no results' )
                
            }

        }

    }

    render() {

        return (

            <div className='Jobs'>

                <nav>
                    <h1>Jobs</h1>
                </nav>

                {this.state.filteredJobResults.length == 0 ?

                    <div className='Filters wow fadeIn'>

                        <div className = 'FiltersContainer'>

                            <div>
                                <NavLink exact to='/AddJob' >Add Job</NavLink>
                            </div>

                            <form className = 'SearchInput'>
                                <div>

                                    <input
                                        id='Search'
                                        type='text'
                                        className='CompanySearch'
                                        placeholder='Search'
                                        onChange={this.changeHandler}
                                        value={this.state.search}>
                                    </input>

                                    <button type = 'submit' onClick={() => this.filter('Search')}>Search</button>

                                </div>
                            </form>

                            <div>

                                {this.state.edit === 'Inactive' ?
                                    <button style = {{minWidth: '50px'}} onClick={() => this.toggleUpdate()}>More</button>
                                :
                                    <button style = {{minWidth: '50px'}} onClick={() => this.toggleUpdate()}>Less</button>
                                }

                            </div>
                            
                        </div>

                        {this.state.edit === 'Active' ?
                            <div className='More'>
                                <button onClick={() => this.filter('On Sites')}>On Sites</button>
                                <button onClick={() => this.filter('Phone Screens')} >Phone Screens</button>
                                <button onClick={() => this.filter('Rejections')}>Rejections</button>
                            </div>
                        :
                            <div className='More'></div>
                        }

                    </div>

                :
                    null
                }

                {this.state.filteredJobResults.length >= 1 ?

                    <div className = 'FilterNav wow fadeIn'>
                        <h2 style = {{ fontFamily: 'Lobster', height: '30px'}}>Filtered</h2>
                        <button onClick={() => this.filter('Clear')}>Clear Filter</button>
                    </div>

                :
                    <Stats/>
                }

                {this.props.loading === true ?

                    // If there are no results, render ⬇︎
                    <div className='JobContainer'>
                        <h1 style={{ color: 'white' }}>Loading</h1>
                    </div>

                :

                    // Map all the jobs out
                    <div>

                        {this.state.filteredJobResults.length >= 1 ?

                            <div className='JobContainer Search wow fadeIn' style ={{ border: '3px solid white' , width: '90%' }}>

                                <h2 className = 'SearchTitle'>{this.state.filter[0]}</h2>

                                {this.state.filteredJobResults.map((x) =>

                                    <div className='Job ' key={x.id} onClick={() => window.location = `/Job/${x.id}`}>

                                        <div className='Header'>

                                            <div>

                                                <h2 className='CompanyName'>{x.CompanyName}</h2>
                                                <h4 className='Role'>{x.Role}</h4>

                                            </div>

                                        </div>

                                        <div className='Applied'>

                                            <p>{x.AppliedThrough}</p>
                                            <p className="Date">{x.DateApplied}</p>

                                        </div>

                                    </div>
                                )}

                            </div>
                        :

                            <div className='JobContainer'>

                                {this.props.jobs.map((x) =>

                                    <div className='Job section--yellow wow fadeIn' key={x.id} onClick={() => window.location = `/Job/${x.id}`}>

                                        <div className='Header'>

                                            <div>

                                                <h2 className='CompanyName'>{x.CompanyName}</h2>
                                                <h4 className='Role'>{x.Role}</h4>

                                            </div>

                                        </div>

                                        <div className='Applied'>

                                            <p>{x.AppliedThrough}</p>
                                            <p className="Date">{x.DateApplied}</p>

                                        </div>

                                    </div>

                                )}

                            </div>

                        }

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