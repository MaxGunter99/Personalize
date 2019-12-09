
import React from 'react';
import '../css/Jobs.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines , HorizontalGridLines , YAxis, XAxis} from 'react-vis';
// import Job from './Job';

class Jobs extends React.Component {

    state = {
        jobs: [],
        edit: 'Inactive',
        replies: 0,
        appliedThisWeek: 0,
        appliedToday: 0,
        data:[
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
        ],
        view: '',
        filterJobs: false,
        filter: [],
        search: ''
    }

    componentDidMount() {

        axios
            .get( 'http://localhost:3000/jobs')
            .then(res => {

                const data = []

                if ( this.state.filterJobs === true ) {

                    for ( var i = 0; i < res.data.length; i++ ) {

                        if ( this.state.filter[0] === 'Rejects' ){

                            if ( res.data[i].FollowUpReply === 'Rejected' ) {
                                data.push( res.data[i] )
                            }

                        } else if ( this.state.filter[0] === 'PhoneScreen' ) {

                            if ( res.data[i].PhoneScreen === 'Yes' ) {
                                data.push( res.data[i] )
                            }

                        } else if ( this.state.filter[0] === 'Pending' ) {

                            if ( res.data[i].ReplyRecieved === 'No' ) {
                                data.push( res.data[i] )
                            }

                        } else if ( this.state.filter[0] === 'Search' ) {

                            const Filtered = res.data[i].CompanyName.slice( 0 , this.state.search.length )

                            if ( this.state.search === Filtered ) {

                                data.push( res.data[i] )

                            }

                        }

                    }

                    this.setState({ jobs: data });

                } else {

                    this.setState({ jobs: res.data });

                }

                this.loadStats()
        
            })

            .catch(error => console.error(error));
    }

    // Update State When Entering Info
    changeHandler = event => {

        event.preventDefault();
        this.setState({
            ...this.state.job,
            search: event.target.value
        });

        console.log( this.state.startDate )

    };

    update = id => {

        this.setState({ edit: 'Inactive' })

    }

    toggleUpdate = () => {

        if ( this.state.edit === 'Active' ) {

            return this.setState({ edit: 'Inactive' })

        } else {

            return this.setState({ edit: 'Active' })

        }

    }

    loadStats = () => {

        const accepts = []
        const jobsAppliedToday = []
        const jobsAppliedThisWeek = []
        const lastWeekDates = []
        const today = new Date().getDate()

        for ( var i = 0; i < 8; i ++ ) {

            const prev = new Date( today ) - i
            const prevDay = new Date().setDate( prev )
            const thatDay = new Date( prevDay ).toLocaleDateString()
            this.state.data[i].x = thatDay.split('/')[1]
            lastWeekDates.push( thatDay )

        }

        for ( var i = 0; i < this.state.jobs.length; i ++ ) {

            const reply = this.state.jobs[i].ReplyRecieved
            const applied = this.state.jobs[i].DateApplied

            if ( reply.toLowerCase() === 'yes' ) {

                accepts.push( 1 )

            }

            const todayStr = new Date()

            if ( applied.split('/')[0] === todayStr.toLocaleDateString().split('/')[0] && applied.split('/')[1] === todayStr.toLocaleDateString().split('/')[1] && applied.split('/')[2] === todayStr.toLocaleDateString().split('/')[2] ) {

                jobsAppliedToday.push(1)

            }

            for ( var x = 0; x < lastWeekDates.length; x++ ) {

                if ( lastWeekDates[x] === applied ) {

                    jobsAppliedThisWeek.push( applied )

                }

            }

        }

        for ( var z = 0; z < jobsAppliedThisWeek.length; z++ ) {

            for ( var q = 0; q < this.state.data.length; q++ ) {

                const day = jobsAppliedThisWeek[z].split( '/' )

                if ( day[1] === this.state.data[q].x ) {

                    this.state.data[q].y = this.state.data[q].y + 1

                }
    
            }

        }

        this.setState({ replies: accepts.length , appliedToday: jobsAppliedToday.length , appliedThisWeek: jobsAppliedThisWeek.length })
    }

    filter = ( content ) => {

        if ( content === 'Clear' ) {

            this.setState({ filter: [] })
            this.setState({ filterJobs: false })
            this.setState({ search: '' })
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

                    <NavLink exact to = '/AddJob' >Add Job</NavLink>
                    <h1>Jobs</h1>
                    <p onClick = { () => this.toggleUpdate() }>update Job</p>

                </nav>

                <div className = 'Filters'>

                    <button onClick = { () => this.filter( 'Pending' ) }>Pending</button>
                    <button onClick = { () => this.filter( 'PhoneScreen' ) } >Phone Screens</button>
                    <input
                        id = 'Search'
                        type = 'text'
                        className = 'CompanySearch'
                        placeholder = 'Search'
                        onChange = { this.changeHandler }
                        value = {this.state.search}></input>
                    <button onClick = { () => this.filter( 'Search' ) }>Search</button>
                    <button onClick = { () => this.filter( 'Rejects' ) }>Rejects</button>
                    <button onClick = { () => this.filter( 'Clear' ) }>Clear Filter</button>

                </div>

                <h2 className = {`ToggleMessage${this.state.edit}`}>Select a Job to update!</h2>

                <div className = 'Stats'>

                    <div>

                        <p>Total: { this.state.jobs.length }</p>
                        <p>{ Math.floor( this.state.replies / this.state.jobs.length * 100 ) }% replied to you. ( {this.state.replies} )</p>

                    </div>

                    <div className = 'Graph'>

                        <XYPlot height={300} width={300} stroke = "red" >

                            <HorizontalGridLines />
                            <VerticalGridLines />
                            <XAxis color="red" />
                            <YAxis />
                            <LineSeries data={this.state.data} />

                        </XYPlot>

                    </div>

                    <div>

                        <p>Today: {this.state.appliedToday}</p> 
                        <p>This week: {this.state.appliedThisWeek}</p>

                    </div>

                </div>

                <div className = 'JobContainer'>

                    { this.state.jobs.map( ( x ) =>

                        <div className = 'Job' key = {x.id}>

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

                            <NavLink exact to = {`/Job/${x.id}`} className = {'a'} >View</NavLink>

                            {/* <button className = {`update${this.state.edit}`} onClick = { () => this.update( x.id ) }>Update</button> */}
                            <NavLink exact to = {`/Job/Edit/${x.id}`} className = {`update${this.state.edit}`} >Edit</NavLink>


                        </div>
                    )}
                </div>

            </div>
        )
    };

};

export default Jobs;