
// Import Actions
import { 

    TIME_UPDATED

} from '../Actions/index';

const initState = new Date()

const initialState = {

    time: {
        time: initState.toLocaleTimeString(),
        date: initState.toLocaleDateString()
    }

};

function reducer( state = initialState , action ) {

    switch( action.type ) {

        case TIME_UPDATED:

            return{
                ...state,
                time: { 

                    time: action.payload.time ,
                    date: action.payload.date
                }
            }

            // ! Return inital state as a default or the client recieves undefined !
            default:

                return state;

    };

};

export default reducer;