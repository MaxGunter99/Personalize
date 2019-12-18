
import React from 'react';
import '../css/Calendar.css';

import axios from 'axios'

class Home extends React.Component {

    state = {
        view: 'day',
        events: [],
        thisWeek: [],
        thisMonth: [],
        loading: true
    }

    componentDidMount() {

        axios.get('http://localhost:3000/events/today')
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

        if (event.target.value === 'day') {
            this.getTimespan('today')

        } else if (event.target.value === 'week') {
            this.getTimespan('week')

        } else if (event.target.value === 'month') {
            this.getTimespan('month')

        }
    };

    loadCalendar = () => {

        const lastWeekDates = []
        const thisMonthDates = []
        const today = new Date().getDate()

        for (var i = 0; i < 7; i++) {

            const prev = new Date(today) - i
            const prevDay = new Date().setDate(prev)
            const thatDay = new Date(prevDay).toLocaleDateString()
            lastWeekDates.push(thatDay)

        }

        this.setState({ thisWeek: lastWeekDates, loading: false })
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

                        <h1>calendar</h1>

                        <form>
                            <select value={this.state.view} onChange={this.changeHandler}>
                                <option value="day">Day</option>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                                {/* <option value = "year">Year</option> */}
                            </select>
                        </form>

                        {this.state.view === 'day' ?

                            <div>
                                <h3>Day View</h3>
                                <div className='day'>
                                    {this.state.events.map((x) =>
                                        <div key={x.id}>
                                            <p>{x.id}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        : this.state.view === 'week' ?

                            <div>
                                <h3>Week View</h3>
                                <div className='week'>
                                    {this.state.thisWeek.map((x) =>
                                        <div key={x}>
                                            <p>{x}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        : this.state.view === 'month' ?

                            <div>
                                <h3>Month View</h3>
                                <div className='week'>
                                    {this.state.thisWeek.map((x) =>
                                        <div key={x}>
                                            <p>{x}</p>
                                        </div>
                                    )}
                                </div>
                                <button onClick={() => this.asdf()}>State</button>
                            </div> 

                        : null }

                    </div>
                }

            </div>
        )
    };

};

export default Home;