
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
        slide: 0,
        eventSlide: -3000,
        selected: [],
        now: [ new Date().toLocaleTimeString().split(':')[0] , new Date().toLocaleTimeString().split(' ')[1] ].join().replace(',' , ' '),
        minute: new Date().toLocaleTimeString().split(':')[1]
    }

    componentDidMount() {

        axios.get('http://localhost:3000/events/Month')

            .then(res => {

                this.setState({ events: res.data })
                this.loadCalendar()
            })

            .catch(err => {
                console.log(err.message)
            })

    }

    componentDidUpdate = () => {

        new WOW().init();

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

        }

    }

    toggleModal = event => {

        if ( event.Event !== null ) {

            if ( this.state.select === 'Inactive' ) {

                this.setState({ select: 'Active' , selected: event, slide: 560 })

                setTimeout( () => {
                    this.setState({ eventSlide: -1000  })
                } , 250 )

            } else {

                this.setState({ eventSlide: -3000 })

                setTimeout( () => {
                    this.setState({ select: 'Inactive' , slide: 0 })
                } , 250 )

            }
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

                        <header className = 'CalendarHeader' style = {{ marginTop: `${this.state.slide}px` , transition: '1s' }}>

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

                                            <div key={ x } className = 'ind Today' onClick ={ () => this.toggleModal( x ) }>

                                                { x.Event !== null ?  
                                                    <p className = 'Event'>{ x.Day.split(' ')[2]}</p>
                                                :
                                                    <p className = 'NoEvent'>{ x.Day.split(' ')[2] }</p>
                                                }

                                            </div> 

                                        : 

                                            <div key={x} className = 'ind' onClick ={ () => this.toggleModal( x ) }>

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
                                <div className = 'EventModal' style = {{ marginTop: `${this.state.eventSlide}px` , transition: '1s' }}>
                                    <div className = 'EventHeader'>
                                        <h1>{this.state.selected.Event.title}</h1>
                                        {/* <h1>{this.state.selected.Event.month}/{this.state.selected.Event.day}/{this.state.selected.Event.day}</h1> */}
                                        <div>
                                            <h2>{this.state.selected.Event.time}</h2>
                                            <h2 className = 'x' onClick = { () => this.toggleModal( this.state.selected.Event ) }>X</h2>
                                        </div>
                                    </div>

                                    <div className = 'info'>
                                        <h2>{this.state.selected.Event.category}</h2>
                                        <p>{this.state.selected.Event.notes}</p>
                                        <h3>{this.state.selected.Event.URL}</h3>
                                    </div>

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