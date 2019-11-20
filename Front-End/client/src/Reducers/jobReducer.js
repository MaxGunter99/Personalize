
import { 

    ADD_JOB,
    ADD_JOB_SUCCESS,
    ADD_JOB_FAIL

} from '../Actions/index';

const initialState = {
    addingJob: false,
    addJobFail: false,
    addJobSuccess: false,
    error: null
}

function reducer( state = initialState , action ) {

    switch( action.type ) {

        case ADD_JOB:
            return {
                ...state,
                addingJob: true,
                addJobFail: false,
                addJobSuccess: false
            }

        case ADD_JOB_FAIL:
            return {
                ...state,
                addingJob: false,
                addJobFail: true,
                addJobSuccess: false,
                error: action.payload
            }

        case ADD_JOB_SUCCESS:
            return {
                ...state,
                addingJob: false,
                addJobFail: false,
                addJobSuccess: true
            }

            // ! Return inital state as a default or the client recieves undefined !
            default:

                return state;

    };

};

export default reducer;