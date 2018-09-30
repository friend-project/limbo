import {
    INCREASE,
    DECREASE
} from './constant';

export default function count(number = 0, action) {
    if (action.type === INCREASE) {
        return number + action.amount;
    } else if (action.type === DECREASE) {
        return number - action.amount;
    }
    return number;
}

