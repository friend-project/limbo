import {
    ASYNC_REQUEST,
    ASYNC_RECEIVE,
    ASYNC_FAILURE,
} from './constant';

export default (state = {
    isFetching: false,
    response: {},
    error: null,
}, action) => {
    switch (action.type) {
        case ASYNC_REQUEST:
            return {
                ...state,
                error: null,
                isFetching: true,
            };
        case ASYNC_RECEIVE:
            return {
                ...state,
                isFetching: false,
                response: action.response,
            };
        case ASYNC_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        default:
            return state;
    }
};
