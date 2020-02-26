
import React, { Suspense } from 'react';
import '../css/Jobs.css';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';
const Stats = React.lazy(() => import('./Stats'));

export default class Jobs extends React.Component {

    state = {

        Jobs: [],
        search: ''

    }

    componentDidMount = () => {

        Axios
            .get('http://localhost:3000/jobs')
            .then( res => {
                this.setState({ Jobs: res.data })
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

    render() {

        // STYLED COMPONENTS

        const IndividualJob = styled.div`

            display: flex;
            flex-direction: column;
            margin: 10px;
            padding: 10px;
            width: 21%;
            border: 3px solid black;
            background-color: rgba(255, 255, 255, 0.411);
            backdrop-filter: blur(4px);
            transition: .2s;

            &:hover {

                border: 3px solid white;
                transition: .2s;
                cursor: pointer;

            };

        `;

        return (

            <div className = 'Jobs'>

                <nav>

                    <div className = 'Actions'>

                        <div className = 'JobBoards'>

                            <img src = { 'https://techcrunch.com/wp-content/uploads/2014/02/linkedin_logo.png?w=730&crop=1' } onClick = { this.toLinkedIn } />
                            <img src = { 'https://apprecs.org/ios/images/app-icons/256/f6/309735670.jpg'} onClick = { this.toIndeed } />
                            <img src = { 'https://mma.prnewswire.com/media/449764/Glassdoor_Logo.jpg?p=twitter'} onClick = { this.toGlassDoor } />
                            <img src = { 'https://techcrunch.com/wp-content/uploads/2014/03/peace_large.jpg?w=730&crop=1'} onClick = { this.toAngelList } />

                        </div>

                        <div className = 'Search'>

                            <input

                                value = { this.state.search }
                                placeholder = 'Search'
                                name = 'search'
                                onChange = { this.handleSearch }

                            />

                        </div>


                        <div>

                            <NavLink exact to='/AddJob' >Add Job</NavLink>
                            <a onClick = { this.toCreddle }>Edit Resume</a>

                        </div>


                    </div>

                </nav>

                { this.state.search === '' ?

                    <Suspense fallback = { <div> Loading... </div> }>

                        <Stats />

                    </Suspense>

                : null }

                <div>

                    <Suspense fallback = { <div> Loading... </div>}>

                        { this.state.search !== '' ?

                            <div className = 'JobContainer'>

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

                                {this.state.Jobs.map((x) =>

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
                        }

                    </Suspense>

                </div>

            </div>

        )

    }

};