
import React, { Suspense } from 'react';
import '../css/Jobs.css';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import Confetti from 'react-confetti';
// import useWindowSize from 'react-use/lib/useWindowSize'
const Stats = React.lazy(() => import('./Stats'));

export default class Jobs extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
    
            Jobs: [],
            search: '',
            zoom: 20,
            statsDisplay: props.statsDisplay,
            editResumeButton: props.editResumeButton,

            jobBoardIcons: {
                LinkedIn: props.jobBoardIcons.LinkedIn,
                Indeed: props.jobBoardIcons.Indeed,
                GlassDoor: props.jobBoardIcons.GlassDoor,
                AngelList: props.jobBoardIcons.AngelList,
                email: props.jobBoardIcons.email
            },

            todaysJobsActive: props.todaysJobsActive,
            jobsAppliedToday: [],

            thisWeeksJobsActive: props.thisWeeksJobsActive,
            jobsAppliedThisWeek: [],

            onSchedule: true,
            catchUpNumber: 0,
    
        }
    }

    componentDidMount = () => {

        Axios
            .get('http://localhost:3000/jobs')
            .then( res => {
                let sorted = res.data.sort( (a, b) => (a.CompanyName > b.CompanyName) ? 1 : -1)
                this.setState({ Jobs: sorted })
            });

    }

    handleSearch = ( e ) => {

        e.preventDefault()

        this.setState({
            search: e.target.value
        });

    };

    toIndeed = e => {

        e.preventDefault();
        window.open('https://www.indeed.com/?from=gnav-jobsearch--jasx');

    }

    toLinkedIn = e => {

        e.preventDefault();
        window.open('https://www.linkedin.com/jobs/');

    }

    toGlassDoor = e => {

        e.preventDefault();
        window.open('https://www.glassdoor.com/Job/Home/recentActivity.htm');

    }

    toAngelList = e => {

        e.preventDefault();
        window.open('https://angel.co/jobs');

    }

    toCreddle = e => {

        e.preventDefault();
        window.open( 'https://content.creddle.io/persons/sign_in' );

    }

    toEmail = e => {

        e.preventDefault();
        window.open( 'https://mail.google.com/mail/u/1/#inbox`' );

    }

    zoom = ( e , size ) => {

        e.preventDefault();
        if ( size === 'in' & this.state.zoom <= 40 ) {

            let currentSize = this.state.zoom
            this.setState({ zoom: currentSize + 10 })

        } else if ( size === 'out' & this.state.zoom >= 30 ) {

            let currentSize = this.state.zoom
            this.setState({ zoom: currentSize - 10 })

        }

    }

    handleJobs = ( jobs, time ) => {

        if ( time === 'Week' ) {

            this.setState({ ...this.state, jobsAppliedThisWeek: jobs })
            this.statusCheck()

        } else {

            this.setState({ ...this.state, jobsAppliedToday: jobs })

        }

    }

    renderConfetti = () => {
        return (
            <Confetti
                width={ window.width }
                height={ window.height }
            />
        )
    }

    statusCheck = () => {

        var d = new Date();
        var n = d.getDay();
        const dailyGoal = n * 2
        const onSchedule = dailyGoal - this.state.jobsAppliedThisWeek.length

        if ( 0 < n < 6 ) {
            if ( this.state.jobsAppliedThisWeek.length < dailyGoal ) {
                this.setState({ onSchedule: false , catchUpNumber: onSchedule })
            } else {
                this.setState({ onSchedule: true })
            }
        }

    }

    render() {

        // STYLED COMPONENTS

        const IndividualJob = styled.div`

            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            margin: 10px;
            padding: 5px;
            width: ${this.state.zoom}%;
            border: 3px solid black;
            background-color: rgba(255, 255, 255, 0.411);
            transition: .2s;

            &:hover {

                border: 3px solid rgb(185, 50, 50);
                transition: .2s;
                cursor: pointer;

            };

        `;

        return (

            <div className = 'Jobs'>

                <nav>

                    <div className = 'Actions'>

                        <div className = 'JobBoards'>
                            { this.state.jobBoardIcons.email === true ?
                                <img src = { 'https://icons-for-free.com/iconfiles/png/512/email+gmail+mail+service+mailing+online+service+icon-1320194987766966945.png'} onClick = { this.toEmail } />
                            : null }
                            { this.state.jobBoardIcons.LinkedIn === true ?
                                <img src = { 'https://techcrunch.com/wp-content/uploads/2014/02/linkedin_logo.png?w=730&crop=1' } onClick = { this.toLinkedIn } />
                            : null }
                            { this.state.jobBoardIcons.Indeed === true ?
                                <img src = { 'https://apprecs.org/ios/images/app-icons/256/f6/309735670.jpg'} onClick = { this.toIndeed } />
                            : null }
                            { this.state.jobBoardIcons.GlassDoor === true ?
                                <img src = { 'https://mma.prnewswire.com/media/449764/Glassdoor_Logo.jpg?p=twitter'} onClick = { this.toGlassDoor } />
                            : null }
                            { this.state.jobBoardIcons.AngelList === true ?
                                <img src = { 'https://techcrunch.com/wp-content/uploads/2014/03/peace_large.jpg?w=730&crop=1'} onClick = { this.toAngelList } />
                            : null }
                        </div>


                        <div className = 'Search'>

                            <input

                                value = { this.state.search }
                                placeholder = 'Search'
                                name = 'search'
                                onChange = { this.handleSearch }

                            />

                        </div>



                        <NavLink className = 'ActionButton' exact to='/AddJob' >Add Job</NavLink>
                        { this.state.editResumeButton === true ?
                            <a onClick = { this.toCreddle }>Edit Resume</a>
                        : null }


                    </div>

                </nav>

                { this.state.onSchedule === false ? (
                    <>
                        { this.state.catchUpNumber >= 2 ? (
                            <p style = {{ color: 'rgb(185, 50, 50)' }}>You are { this.state.catchUpNumber } jobs away from your weekly goal!</p>
                        ) : (
                            <p style = {{ color: 'rgb(185, 50, 50)' }}>You are { this.state.catchUpNumber } job away from your weekly goal!</p>
                        ) }
                    </>
                ) : ( 
                    <p>{ this.renderConfetti() }</p> 
                )}

                { this.state.search === '' ?

                    <Suspense fallback = { <div> Loading... </div> }>

                        { this.state.statsDisplay === true ? (
                            <Stats { ...this.state } handleJobs = { this.handleJobs } />
                        ) : null }

                    </Suspense>

                : null }

                <div>

                    <Suspense fallback = { <div> Loading... </div>}>

                        { this.state.search === '' ? (

                            <div className = 'indView'>

                                { this.state.todaysJobsActive === true && this.state.jobsAppliedToday.length > 0 ? (
                                    
                                    <div className = 'individual'>

                                        <h2>Applied Today</h2>

                                        <div className = 'JobContainer' style = {{ backgroundColor: 'white' }}>

                                            {this.state.jobsAppliedToday.map((x) =>

                                                <IndividualJob key={x.id} onClick={() => window.location = `/Job/${x.id}`}>

                                                    <div className='Header'>

                                                        <div>

                                                            <h2 className='CompanyName'>{x.CompanyName}</h2>
                                                            <h4 className='Role'>{x.Role}</h4>

                                                        </div>

                                                    </div>

                                                    <div className='Applied'>

                                                        {/* <p>{x.AppliedThrough}</p> */}
                                                        <p className="Date">{x.DateApplied}</p>

                                                    </div>

                                                </IndividualJob>

                                            )}

                                        </div>
                                    </div>

                                ) : null }

                                { this.state.thisWeeksJobsActive === true && this.state.jobsAppliedThisWeek.length > 0 ? (

                                    <div className = 'individual'>

                                        <h2>Applied This Week</h2>

                                        <div className = 'JobContainer' style = {{ backgroundColor: 'white' }}>

                                            {this.state.jobsAppliedThisWeek.map((x) =>

                                                <IndividualJob key={x.id} onClick={() => window.location = `/Job/${x.id}`}>

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

                                                </IndividualJob>

                                            )}

                                        </div>
                                    </div>

                                ) : null }
                            </div>
                        ) : null }

                        { this.state.search !== '' ?

                            <div className = 'JobContainer'>

                                <div className = 'ZoomControls'>
                                    <FeatherIcon icon="zoom-in" size="35" className = 'Zoom' onClick = { (e) => this.zoom( e ,'in' ) }/>
                                    <FeatherIcon icon="zoom-out" size="35" className = 'Zoom' onClick = { (e) => this.zoom( e , 'out' ) }/>
                                </div>

                                { this.state.Jobs.map( ( x ) =>

                                    <>

                                        { x.CompanyName.slice( 0, this.state.search.length ) === this.state.search ?

                                            <IndividualJob key = { x.id } onClick={ () => window.location = `/Job/${ x.id }` }>

                                                <div className = 'Header' >

                                                    <div>

                                                        <h2 className = 'CompanyName'>{ x.CompanyName }</h2>
                                                        <h4 className = 'Role'>{ x.Role }</h4>

                                                    </div>

                                                </div>

                                                <div className = 'Applied'>

                                                    <p>{ x.AppliedThrough }</p>
                                                    <p className="Date">{x.DateApplied}</p>

                                                </div>

                                            </IndividualJob>

                                        : null }

                                    </>

                                )}

                            </div>

                        :

                            <div className='JobContainer'>

                                <div className = 'ZoomControls'>
                                    <FeatherIcon icon="zoom-in" size="35" className = 'Zoom' onClick = { (e) => this.zoom( e ,'in' ) }/>
                                    <FeatherIcon icon="zoom-out" size="35" className = 'Zoom' onClick = { (e) => this.zoom( e , 'out' ) }/>
                                </div>

                                {this.state.Jobs.map((x) =>

                                    <IndividualJob key={x.id} onClick={() => window.location = `/Job/${x.id}`}>

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

                                    </IndividualJob>

                                )}

                            </div>
                        }

                    </Suspense>

                </div>

            </div>

        )

    }

};