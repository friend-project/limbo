import React from 'react';
import { connect } from 'react-redux';

import { increase, decrease } from './action';

function Count({ count, increase, decrease }) {
    return (
        <div>
            <h2>Some state changes 2:</h2>
            <div>{count}</div>
            <button onClick={() => increase(1)}>Increase</button>
            <button onClick={() => decrease(1)}>Decrease</button>
        </div>
    );
}

export default connect(
    state => ({
        count: state.count,
    }),
    { increase, decrease }
)(Count);

