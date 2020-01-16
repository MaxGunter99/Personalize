
import React from 'react';
import '../css/Calendar.css';
import { NavLink } from 'react-router-dom';
import WOW from "wow.js";

import axios from 'axios'

class Home extends React.Component {

    state = {
        events: [],
        today: new Date().toDateString(),
        thisMonth: [],
        loading: true,
        select: 'Inactive',
        fade: 'wow fadeIn',
        selected: [],
        now: [ new Date().toLocaleTimeString().split(':')[0] , new Date().toLocaleTimeString().split(' ')[1] ].join().replace(',' , ' '),
        minute: new Date().toLocaleTimeString().split(':')[1]
    }

    componentDidMount() {

        new WOW().init()

        axios.get('http://localhost:3000/events/Month')

            .then(res => {

                this.setState({ events: res.data })
                this.loadCalendar()
            })

            .catch(err => {
                console.log(err.message)
            })

    }

    loadCalendar = () => {

        const thisMonthDates = [];
        const today = 1;

        for (var z = 0; z < 32; z++) {

            const prev = new Date(z)
            const prevDay = new Date().setDate(prev)
            const thatDay = new Date(prevDay).toLocaleDateString()
            let MatchingEvent = []

            if ( new Date().toLocaleDateString().split('/')[0] === thatDay.split('/')[0] ) {

                let day = new Date( thatDay ).toLocaleDateString().split('/')[1]
                let month = new Date( thatDay ).toLocaleDateString().split('/')[0] 
                let year = new Date( thatDay ).toLocaleDateString().split('/')[2]

                for ( var d = 0; d < this.state.events.length; d++ ) {

                    let thisEvent = this.state.events[d]

                    if ( Number( day ) === thisEvent.day && Number( month ) === thisEvent.month && Number( year ) === thisEvent.year ) {

                        MatchingEvent.push( thisEvent )

                    }
                    
                }

                if ( MatchingEvent.length !== 0 ) {

                    thisMonthDates.push( { Day: new Date( thatDay ).toDateString() , Event: MatchingEvent[0] } )
                    MatchingEvent.pop()

                } else {

                    thisMonthDates.push( { Day: new Date( thatDay ).toDateString() , Event: null } )

                }

            }

        }

        let week = [ 'Sun' , 'Mon' , 'Tue' , 'Wed' , 'Thu' , 'Fri' , 'Sat' ]

        // matching days to the map
        if ( thisMonthDates[0].Day.split(' ')[0] !== 'Sun' ) {

            let count = week.indexOf( thisMonthDates[0].Day.split(' ')[0] )
            for ( var x = 0; x < count; x++ ) {

                thisMonthDates.unshift({Day: '' , Event: null})

            }
        }

        if ( thisMonthDates[ thisMonthDates.length - 1 ].Day.split(' ')[0] !== 'Sat' ) {

            let EndCount = 6 - week.indexOf( thisMonthDates[ thisMonthDates.length - 1 ].Day.split(' ')[0] )

            for ( var x = 0; x < EndCount; x++ ) {

                thisMonthDates.push({Day: '' , Event: null})

            }

        }
        
        this.setState({  
            thisMonth: thisMonthDates , 
            loading: false 
        })

    }

    activehandler = x => {

        if ( x !== 'None' ) {

            let thatDaysEvents = []

            for ( var e = 0; e < this.state.events.length; e++ ) {

                let day = `${this.state.events[e].month}/${this.state.events[e].day}/${this.state.events[e].year}`

                if ( x === day ) {

                    thatDaysEvents.push( this.state.events[e] )

                }

            }

            this.setState({ selected: thatDaysEvents , select: 'Active' })

            // console.log( thatDaysEvents )

        }

    }

    render() {
        
        return (

            <div className='Calendar'>

                {this.state.loading === true ?

                    <div>

                        <h1>Loading</h1>

                    </div>

                :
                    <div>

                        <header className = 'CalendarHeader'>

                            <h1 className = 'HeaderMonth'>{ new Date().toDateString().split(' ')[1] }</h1>

                            <NavLink exact to='/AddEvent' >Going to an Event?</NavLink>

                        </header>

                        {/* // MONTH VIEW */}
                        <div className = 'CalendarContainer Month'>

                            <div className='month'>

                                <div className = 'WeekDays'>
                                    <h3>Sunday</h3>
                                    <h3>Monday</h3>
                                    <h3>Tuesday</h3>
                                    <h3>Wednsday</h3>
                                    <h3>Thursday</h3>
                                    <h3>Friday</h3>
                                    <h3>Saturday</h3>
                                </div>

                                {this.state.thisMonth.map( ( x )  =>

                                    <>
                                        { x.Day === this.state.today ? 

                                            <div key={ x } className = 'ind Today' onClick ={ () => this.setState({ select: 'Active' , selected: x, fade: 'wow zoomOut' }) }>

                                                { x.Event !== null ?  
                                                    <p className = 'Event'>{ x.Day.split(' ')[2]}</p>
                                                :
                                                    <p className = 'NoEvent'>{ x.Day.split(' ')[2] }</p>
                                                }

                                            </div> 

                                        : 

                                            <div key={x} className = 'ind' onClick ={ () => this.setState({ select: 'Active' , selected: x }) }>

                                                { x.Event !== null ?  
                                                    <p className = 'Event'>{ x.Day.split(' ')[2]}</p>
                                                :
                                                    <p className = 'NoEvent'>{ x.Day.split(' ')[2] }</p>
                                                }

                                            </div>

                                        }
                                    </>
                                )}

                            </div>

                        </div> 

                    {/* IF YOU SELECT AN EVENT */}
                    { this.state.select === 'Active' ?
                        
                        <>

                            { this.state.selected.Event === null ?
                            
                                null

                            :
                                <div className = {`EventModal ${this.state.select} ${this.state.fade}`}>
                                    <div className = 'EventHeader'>
                                        <h1>{this.state.selected.Event.title}</h1>
                                        {/* <h1>{this.state.selected.Event.month}/{this.state.selected.Event.day}/{this.state.selected.Event.day}</h1> */}
                                        <div>
                                            <h2>{this.state.selected.Event.time}</h2>
                                            <h2 onClick = { () => this.setState({ select: null }) }>X</h2>
                                        </div>
                                    </div>
                                    <h1>{this.state.selected.Event.category}</h1>
                                    <h1>{this.state.selected.Event.url}</h1>
                                    <h1>{this.state.selected.Event.notes}</h1>

                                </div>
                            }

                        </>

                    :
                        null
                    }

                </div>
                }

            </div>
        )
    };

};

export default Home;