const router = require('express').Router();
const Events = require('./calendarModel');

// Get all events
router.get( '/', ( req , res ) => {

    Events.find()

        .then( events => {
            res.json( events );
        })

        .catch(error => {
            res.send({ message: 'Server Error getting events!', error })
        })

});

// Get todays events
router.get( '/today' , ( req , res ) =>{

    Events.findToday()

        .then( events => {
            res.status( 200 )
            res.json( events );
        })

        .catch( error => {

            res.status( 500 ).send({ message: 'Server error getting todays events!' , error })

        })

});

// Get this weeks events
router.get( '/week' , ( req , res ) =>{

    Events.findWeek()

        .then( events => {
            res.status( 200 )
            res.json( events );
        })

        .catch( error => {

            res.status( 500 ).send({ message: 'Server error getting this weeks events!' , error })

        })

});

// Get this months events
router.get( '/month' , ( req , res ) =>{

    Events.findMonth()

        .then( events => {
            res.status( 200 )
            res.json( events );
        })

        .catch( error => {

            res.status( 500 ).send({ message: 'Server error getting this months events!' , error })

        })

});

// Get individual Event
router.get( '/:id' , ( req , res ) => {

    Events.findById( req.params.id )

        .then( event => {
            res.status( 200 )
            res.json( event )
        })

        .catch( error => {
            res.status( 500 ).send({ message: 'Server error getting this event by ID' , error })
        })

})

// Add event

// Update event

// Delete event

module.exports = router;