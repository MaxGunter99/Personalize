import React from 'react';
import '../css/Jobs.css';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, YAxis, XAxis } from 'react-vis';
import { GetAllJobs } from '../Actions/index';
import { connect } from 'react-redux';

class Stats extends React.Component {

    constructor() {
        super();
        this.state = {
            jobs: [],
            appliedThisWeek: 0,
            appliedToday: 0,
            data: [
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
                { x: 0, y: 0 },
            ]
    
        }
    }

    componentDidMount(){

        this.props.GetAllJobs()

    }

    componentDidUpdate() {
        this.state.jobs = this.props.jobs
        this.loadStats()
    }

    // Loads data for activity graph
    loadStats = () => {

        console.log( this.props.jobs )

        const accepts = []
        const jobsAppliedToday = []
        const jobsAppliedThisWeek = []
        const lastWeekDates = []
        const today = new Date().getDate()

        // Gets calendar date for last 8 days
        for (var i = 0; i < 8; i++) {

            const prev = new Date(today) - i
            const prevDay = new Date().setDate(prev)
            const thatDay = new Date(prevDay).toLocaleDateString()
            this.state.data[i].x = thatDay.split('/')[1]
            lastWeekDates.push(thatDay)

        }

        for (var i = 0; i < this.state.jobs.length; i++) {

            const reply = this.state.jobs[i].ReplyRecieved
            const applied = this.state.jobs[i].DateApplied

            if (reply.toLowerCase() === 'yes') {
                accepts.push(1)

            }

            const todayStr = new Date()

            if (applied.split('/')[0] === todayStr.toLocaleDateString().split('/')[0] && applied.split('/')[1] === todayStr.toLocaleDateString().split('/')[1] && applied.split('/')[2] === todayStr.toLocaleDateString().split('/')[2]) {
                jobsAppliedToday.push(1)

            }

            for (var x = 0; x < lastWeekDates.length; x++) {

                if (lastWeekDates[x] === applied) {
                    jobsAppliedThisWeek.push(applied)

                }

            }

        }

        for (var z = 0; z < jobsAppliedThisWeek.length; z++) {

            for (var q = 0; q < this.state.data.length; q++) {

                const day = jobsAppliedThisWeek[z].split('/')

                if (day[1] === this.state.data[q].x) {
                    this.state.data[q].y = this.state.data[q].y + 1

                }

            }

        }

        this.state.replies = accepts.length
        this.state.appliedToday = jobsAppliedToday.length
        this.state.appliedThisWeek = jobsAppliedThisWeek.length

    }

    render() {

        return (

            <div>

                { this.props.loading === true ?
                    null
                :
                    <div className='Stats'>

                        <div>
                            <p>Total: {this.state.jobs.length}</p>
                            <p>{Math.floor( this.state.replies / this.state.jobs.length * 100)}% replied to you. ( {this.state.replies} )</p>
                        </div>


                        <div className='Graph'>
                            <XYPlot height={300} width={300} stroke="red" >

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
                }

            </div>
        )
    }

}

const mapStateToProps = state => {

    return {

        jobs: state.jobReducer.jobs,
        loading: state.jobReducer.loading

    }

}

export default connect(mapStateToProps, { GetAllJobs })(Stats);