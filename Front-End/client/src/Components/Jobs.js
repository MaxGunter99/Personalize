
import React from 'react';
import '../css/Jobs.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines , HorizontalGridLines , YAxis, XAxis} from 'react-vis';
import Job from './Job';

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
        view: ''
    }

    componentDidMount() {
        axios
            .get( 'http://localhost:3000/jobs')
            .then(res => {
                console.log(res.data)
                this.setState({
                    jobs: res.data
                });
                this.loadStats()
            })
            .catch(error => console.error(error));
    }

    update = id => {
        console.log( id )
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

        // console.group( 'lwd' , lastWeekDates )

        for ( var i = 0; i < this.state.jobs.length; i ++ ) {

            const reply = this.state.jobs[i].ReplyRecieved
            const applied = this.state.jobs[i].DateApplied

            if ( reply.toLowerCase() === 'yes' ) {
                accepts.push( 1 )
            }

            // console.log( 'today?' , applied.split('/')[1] , String( today ) )

            const todayStr = String( today )

            if ( applied.split('/')[1] === todayStr ) {
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

        console.log( this.state.data )

        this.setState({ replies: accepts.length , appliedToday: jobsAppliedToday.length , appliedThisWeek: jobsAppliedThisWeek.length })
    }

    render() {

        return (

            <div className = 'Jobs'>

                <nav>

                    <NavLink exact to = '/AddJob' >Add Job</NavLink>
                    <h1>Jobs</h1>
                    <p onClick = { () => this.toggleUpdate() }>update Job</p>

                </nav>

                <h2 className = {`ToggleMessage${this.state.edit}`}>Select a Job to update!</h2>

                <div className = 'Stats'>

                    <div>
                        <p>Total: { this.state.jobs.length }</p>
                        {/* <p>{this.state.replies} Companys Replied.</p> */}
                        <p>{ Math.floor( this.state.replies / this.state.jobs.length * 100 ) }% replied to you.</p>
                    </div>

                    <div className = 'Graph'>
                        <XYPlot height={300} width={300} stroke = "red" >
                            {/* <a>This Week</a> */}
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

                {/* <div className = 'Statistics'>

                    <p># of jobs applied ( Today )</p>
                    <p># of jobs applied ( This week )</p>
                    <p># of jobs applied ( All time )</p>

                </div>

                <p>graph of job search activity?</p>
                <p>jobs that have reached out to me ( potential hires )</p>
                <p>% of jobs that have reached out for an interview</p>
                <p>% of jobs that have passed me up</p>
                <p>Text or email reminders about following up, or applying to jobs if under 5 per day!</p> */}

            </div>
        )
    };

};

export default Jobs;