
import React from 'react';
import '../css/Calendar.css';

import axios from 'axios'

class Home extends React.Component {

    state = {
        view: 'Month',
        events: [],
        thisWeek: [].sort(( a , b ) => a - b ),
        thisMonth: [],
        loading: true,
        select: 'Inactive',
        selected: [],
        now: [ new Date().toLocaleTimeString().split(':')[0] , new Date().toLocaleTimeString().split(' ')[1] ].join().replace(',' , ' '),
        minute: new Date().toLocaleTimeString().split(':')[1]
    }

    componentDidMount() {

        axios.get('http://localhost:3000/events/Month')
            .then(res => {
                this.setState({ events: res.data })
                console.log(res.data)
            })

            .catch(err => {
                console.log(err.message)
            })

        this.loadCalendar()
    }

    getTimespan = length => {

        axios.get(`http://localhost:3000/events/${length}`)

            .then(res => {
                this.setState({ events: res.data })
            })

            .catch(err => {
                console.log(err.message)
            })

    }

    changeHandler = event => {
        event.preventDefault();
        this.setState({
            view: event.target.value
        });

        if (event.target.value === 'Day') {
            this.getTimespan('Today')

        } else if (event.target.value === 'Week') {
            this.getTimespan('Week')

        } else if (event.target.value === 'Month') {
            this.getTimespan('Month')

        }
    };

    loadCalendar = () => {

        const lastWeekDates = []
        const thisMonthDates = []
        const today = 1
        console.log( 'TODAY' , today )

        for (var i = 0; i < 7; i++) {

            const prev = new Date(today) - i
            const prevDay = new Date().setDate(prev)
            const thatDay = new Date(prevDay).toLocaleDateString()
            lastWeekDates.push(thatDay)

        }

        for (var z = 0; z < 32; z++) {

            const prev = new Date(z)
            const prevDay = new Date().setDate(prev)
            const thatDay = new Date(prevDay).toLocaleDateString()
            if ( new Date().toLocaleDateString().split('/')[0] === thatDay.split('/')[0] ) {
                thisMonthDates.push( thatDay)
            }

        }
        
        this.setState({ thisWeek: lastWeekDates, thisMonth: thisMonthDates , loading: false })

        console.log( thisMonthDates )

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
            console.log( thatDaysEvents )

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

                        {/* <h1>calendar</h1> */}
                        <header className = 'CalendarHeader'>

                            <h3>{this.state.view} View</h3>
                            
                            {/* <form>
                                <select value={this.state.view} onChange={this.changeHandler}>
                                    <option value="Day">Day</option>
                                    <option value="Week">Week</option>
                                    <option value="Month">Month</option>
                                    <option value = "year">Year</option>
                                </select>
                            </form> */}

                            <div>

                                { this.state.view === 'Day' ? 
                                    <button onClick = { this.changeHandler } value = 'Day' style = {{ backgroundColor: 'white', color: 'black' }}>Day</button> 
                                :
                                    <button onClick = { this.changeHandler } value = 'Day'>Day</button>
                                }
                                
                                { this.state.view === 'Week' ? 
                                    <button onClick = { this.changeHandler } value = 'Week' style = {{ backgroundColor: 'white', color: 'black' }}>Week</button> 
                                :
                                    <button onClick = { this.changeHandler } value = 'Week'>Week</button>
                                }

                                { this.state.view === 'Month' ? 
                                    <button onClick = { this.changeHandler } value = 'Month' style = {{ backgroundColor: 'white', color: 'black' }}>Month</button> 
                                :
                                    <button onClick = { this.changeHandler } value = 'Month'>Month</button>
                                }
                            </div>

                        </header>

                        {/* DAY VIEW */}
                        {this.state.view === 'Day' ?

                            <div className = 'CalendarContainer Day'>

                                <div className='day'>

                                    {this.state.events.map((x) =>

                                        <div key={x.id} className = 'Section'>

                                            <header>

                                                <h3>{x.title}</h3>
                                                <p>{x.time}</p>

                                            </header>

                                            <p>{x.category}</p>

                                            { x.notes !== "" ?

                                                <p>{x.notes}</p>

                                            :
                                                null
                                            }

                                            <p>{x.month}/{x.day}/{x.year}</p>

                                            <div className = 'Status'>

                                                { x.time.split( ' ' )[1] === 'PM' && this.state.now.split( ' ' )[1] === 'PM' ?

                                                    <>

                                                        {  x.time.split(':')[0] >= this.state.now.split(':')[0] && x.time.split(':')[1].split(' ')[0] >= this.state.minute ?
                                                        
                                                            <p className= 'Completed' >Completed</p>

                                                        :

                                                            <p className= 'Incomplete' >Incomplete</p>
                                                        }
                                                    </>

                                                : x.time.split( ' ' )[1] === 'AM' && this.state.now.split( ' ' )[1] === 'AM' ?

                                                    <>

                                                        {  x.time.split(':')[0] >= this.state.minute ?
                                                        
                                                            <p className = 'Completed' >Completed</p>

                                                        :

                                                            <p className = 'Incomplete' >Incomplete</p>

                                                        }

                                                    </>
                                                :
                                                    null
                                                }

                                            </div>

                                        </div>

                                    )}

                                </div>

                            </div>

                        : this.state.view === 'Week' ?

                            // WEEK VIEW
                            <div className = 'CalendarContainer Week'>

                                <div className='week'>
                                    {this.state.thisWeek.map((x) =>
                                        <div key={x} onClick={() => console.log( x )}>
                                            <p>{x}</p>
                                        </div>
                                    )}
                                </div>

                            </div>

                        : this.state.view === 'Month' ?

                            // MONTH VIEW
                            <div className = 'CalendarContainer Month'>
                              

                                <div className='month'>

                                    {this.state.thisMonth.map((x) =>
                                        <div key={x} className = 'ind' onClick ={ () => window.location = `Schedule/${x}` }>
                                            <p>{x}</p>
                                        </div>
                                    )}

                                </div>

                            </div> 

                        : null }

                        { this.state.select === 'Active' ?
                        
                            <div>
                                { this.state.selected.map( (s ) =>

                                    <div key = {s.id}>
                                        <p>{s}</p>
                                    </div>

                                ) }
                            </div>

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