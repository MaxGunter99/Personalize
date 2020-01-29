
import React from 'react';
import '../css/Home.css';
import axios from 'axios';

class Home extends React.Component {

    constructor() {

        super();
        this.state = {
    
            nasa: []
    
        }

    }

    componentDidMount = () => {

        axios.get( 'https://api.nasa.gov/planetary/apod?api_key=Md4N6JumVhhSG9qJdeQEG550QIyCUDDy0kgjWiaj' )
        .then( res => {
            this.setState({ nasa: res.data })
            console.log( res.data )
        })
        .catch( err => 
            console.log( 'ERROR:' , err )    
        )

    }

    render() {
        return (

            <div className = 'Home' style = {{ 'backgroundImage': `url(${this.state.nasa.hdurl})` }}>
                <div className = 'Info'>
                    <h1>{this.state.nasa.title}</h1>
                    <p>{this.state.nasa.explanation}</p>
                </div>
            </div>

        )
    };

};

export default Home;