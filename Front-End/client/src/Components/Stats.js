import React from 'react';
import '../css/Jobs.css';
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalGridLines, YAxis, XAxis } from 'react-vis';
import WOW from "wow.js";
import Axios from 'axios';

export default class Stats extends React.Component {

    state = {

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
            { x: 0, y: 0 }
        ]

    }

    componentDidMount() {

        Axios
            .get('http://localhost:3000/jobs')
            .then(res => {
                this.setState({ jobs: res.data })
                this.loadStats()
            })
            .catch(err => { console.log('Error in stats getting jobs:', err) })

        new WOW().init()

    }

    // componentDidUpdate = () => {

    //     this.loadStats()

    // }

    // Loads data for activity graph
    loadStats = () => {

        const accepts = []
        const jobsAppliedToday = []
        const jobsAppliedThisWeek = []
        const thisWeekDates = []

        const today = new Date()
        const Sunday = new Date( today.getTime() - today.getDay() * 24 * 3600 * 1000).toLocaleDateString();
        let curr = new Date( Sunday )

        // Sets the days of the week to the current starting from sunday
        for (let i = 0; i < 7; i++) {

            let first = curr.getDate() - curr.getDay() + i
            let day = new Date(curr.setDate(first)).toLocaleDateString()
            this.state.data[i].x = Number(day.split('/')[1])
            thisWeekDates.push( day )

        }

        for (var i = 0; i < this.state.jobs.length; i++) {

            const reply = this.state.jobs[i].ReplyRecieved
            const applied = this.state.jobs[i].DateApplied

            if (reply.toLowerCase() === 'yes') {

                accepts.push(1)

            }

            const todayStr = new Date()

            // Jobs applied to Today
            if ( Number(applied.split('/')[0]) === Number( todayStr.toLocaleDateString().split('/')[0] ) && Number(applied.split('/')[1]) === Number(todayStr.toLocaleDateString().split('/')[1]) && Number(applied.split('/')[2]) === Number(todayStr.toLocaleDateString().split('/')[2])) {

                jobsAppliedToday.push(1)

            }

            // Finds jobs applied to this past week
            for (var x = 0; x < thisWeekDates.length; x++) {

                if ( thisWeekDates[x] === applied ) {

                    console.log( 'MATCH' )

                    jobsAppliedThisWeek.push(applied)

                }

            }

        }

        // Populates graph data with jobs applied this week
        for (var z = 0; z < jobsAppliedThisWeek.length; z++) {

            for (var q = 0; q < this.state.data.length; q++) {

                const day = jobsAppliedThisWeek[z].split('/')

                if ( Number(day[1] ) === this.state.data[q].x ) {

                    this.state.data[q].y = this.state.data[q].y + 1

                }

            }

        }

        this.setState({
            replies: accepts.length,
            appliedToday: jobsAppliedToday.length,
            appliedThisWeek: jobsAppliedThisWeek.length
        });

    }

    render() {

        return (

            <div className='Stats'>

                <div>
                    <p>Total: {this.state.jobs.length}</p>
                    <p>{Math.floor(this.state.replies / this.state.jobs.length * 100)}% replied to you. ( {this.state.replies} )</p>
                </div>


                <div>
                    <XYPlot
                        height={300}
                        width={300}
                        stroke="red" >

                        {/* <HorizontalGridLines /> */}
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
        )
    }

}