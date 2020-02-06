
import React, { Suspense , lazy , useState } from 'react';
import '../css/Jobs.css';
import { NavLink } from 'react-router-dom';
// import Stats from './Stats';
import WOW from "wow.js";
import { Loader } from '../Loading.gif'
import Axios from 'axios';
const Stats = React.lazy(() => import('./Stats'));

export default class Jobs extends React.Component {

    state = {
        Jobs: [],
        search: ''
    }

    componentDidMount = () => {

        Axios
            .get(  'http://localhost:3000/jobs' )
            .then( res => {
                this.setState({ Jobs: res.data })
            });
    }

    handleSearch = e => {

        e.preventDefault()

        this.setState({
            search: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
        });

    };

    render() {

        return (

            <div className='Jobs'>

                <nav>
                    <h1>Jobs</h1>
                </nav>

                <div className='Filters wow fadeIn'>

                    <div className='FiltersContainer'>

                        <div className = 'Actions'>

                            <NavLink exact to='/AddJob' >Add Job</NavLink>

                            <input
                                value = { this.state.search }
                                placeholder = "Search"
                                name = 'search'
                                onChange = { this.handleSearch }
                            />
                            
                        </div>

                    </div>

                </div>

                <Suspense 
                    fallback={ <div>
                        <img src = { Loader }/>
                    </div>
                }>

                    <Stats />

                </Suspense>

                <div>

                    <Suspense fallback={ <div>Loading...</div>}>

                        { this.state.search !== '' ?

                            <div className='JobContainer'>

                                { this.state.Jobs.map( (x) =>

                                    <>

                                        { x.CompanyName.slice( 0 , this.state.search.length ) === this.state.search ?

                                            <div className='Job' key={ x.id } onClick={() => window.location = `/Job/${x.id}`}>

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

                                            </div>

                                        :
                                            null
                                        }

                                    </>

                                )}

                            </div>
                        :
                            <div className='JobContainer'>

                                { this.state.Jobs.map( (x) =>

                                    <div className='Job' key={x.id} onClick={() => window.location = `/Job/${x.id}`}>

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

                                    </div>

                                )}

                            </div>
                        }

                    </Suspense>

                </div>

            </div>

        )

    }

};