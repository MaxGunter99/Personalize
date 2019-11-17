
export const TIME_UPDATED = 'TIME_UPDATED';

// Pass on the new time to the reducer
export function TimeUpdated( newTime , newDate ) {

    console.log( 'Time has been updated to:' , newTime , newDate )
    return {

        type: TIME_UPDATED,
        payload: { 

            time: newTime,
            date: newDate

        }
        
    };

};