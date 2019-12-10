
//IMPORTS ⬇︎
const db = require( '../data/dbConfig' );

//EXPORTS ⬇︎
module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
};

//FUNCTIONS WORKED OUT ⬇︎
function find() {
    return db( 'jobs' );
};

function findBy( job ) {
    return db( 'jobs' ).where( job );
};

function add( job ) {
    console.log( 'JOBBBZZZ' , job )
    db( 'jobs' )
        .insert( job )
        .then(([ id ]) => {
            return findById( id );
        });
};

function findById( id ) {
    return db( 'jobs' )
        .select( 
            'id' , 
            'CompanyName' , 
            'AppliedThrough' , 
            'Role' , 
            'URL' , 
            'DateApplied' , 
            'ReplyRecieved' , 
            'Details' ,
            'PhoneScreen' ,
            'ScheduledOrCompleted' ,
            'PhoneScreenDate' ,
            'FollowUp' ,
            'FollowUpDate' ,
            'FollowUpReply' ,
            'OnSite' ,
            'OpportunityType' ,
            'InitialCompensation' ,
            'Negotiated' ,
            'Salary' ,
            'AcceptedOrRejected' 
        )
        .where({ id })
        .first();
};

// Update Job
function update( id , changes ) {
    return db( 'jobs' )
        .where({ id })
        .update( changes )
        // .then( count => ( count > 0 ? this.get( id ) : null ));
};

// Delete Job
function remove( id ) {
    return db( 'jobs' )
        .where( 'id' , id )
        .del();
};