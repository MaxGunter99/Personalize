
// Imports
const express = require( 'express' );
const server = express();
const morgan = require( 'morgan' );
const helmet = require( 'helmet' );
const cors = require( 'cors' );

// Routers
const jobs = require( '../routes/jobsRouter' );

// Apply Middleware
server.use( express.json() );
server.use( morgan( 'short' ) );
server.use( helmet() );
server.use( cors() );

// Router extensions
server.use( '/jobs' , jobs );

// Sanity Check
server.use( '/' , ( req , res ) => {
    res.send( 'Your Good' );
});

// Exports
module.exports = server;