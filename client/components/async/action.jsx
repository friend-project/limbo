import 'isomorphic-fetch';
import {
    ASYNC_REQUEST,
    ASYNC_RECEIVE,
    ASYNC_FAILURE,
} from './constant';

export const request = n => ({
    type: ASYNC_REQUEST,
    amount: n
});

export const receive = (n, stories) => ({
    type: ASYNC_RECEIVE,
    amount: n,
    response: stories
});

export const failure = (n, error) => ({
    type: ASYNC_FAILURE,
    amount: n,
    error: error
});

export const post = n => (dispatch) => {
    dispatch(request(n));
    return fetch(`http://0.0.0.0:9527/api/weather/${n}`)
        .then(response => {
            if (response.status > 200) {
                dispatch(failure(n, response.status));
            }
            return response.json();
        })
        .then(stories => dispatch(receive(n, stories)));
};
