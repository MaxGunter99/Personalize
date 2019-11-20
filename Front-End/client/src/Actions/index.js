import axios from 'axios';
export const TIME_UPDATED = 'TIME_UPDATED';

// Pass on the new time to the reducer
export function TimeUpdated( newTime , newDate ) {

    console.log( 'Time has been updated to:' , newTime , newDate )
    return { type: TIME_UPDATED, payload: { time: newTime, date: newDate } };

};

export const ADD_JOB = 'ADD_JOB';
export const ADD_JOB_SUCCESS = 'ADD_JOB_SUCCESS';
export const ADD_JOB_FAIL = 'ADD_JOB_FAIL';

export const AddJob = job => dispatch => {

    dispatch({ type: ADD_JOB });
    axios
        .post( 'http://localhost:3000/jobs/' , job )
        .then( response => {
            dispatch({ type: ADD_JOB_SUCCESS, payload: response.data });
        })
        .catch( error => {
            dispatch({ type: ADD_JOB_FAIL, payload: error });
        })
  
}