import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { post } from './action';

class Async extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(post('2'));
    }
    shouldComponentUpdate(nextProps) {
        // return this.props.isFetching !== nextProps.isFetching;
        return this.props.response.id !== nextProps.response.id;
    }
    _testA() {
        const { dispatch } = this.props;
        dispatch(post('1'));
    }
    _testB() {
        const { dispatch } = this.props;
        dispatch(post('2'));
    }
    _testC() {
        const { dispatch } = this.props;
        dispatch(post('3'));
    }
    render() {
        const { isFetching, response, error } = this.props;
        return (
            <div>
                <div>status: {error ? '404' : '200'}</div>
                <div>isFetching: {isFetching ? 'ture' : 'false'}</div>
                <div>id: {response.id}</div>
                <div>title: {response.title}</div>
                <div>
                    {
                        response.list != null ?
                            <ul>
                                {
                                    response.list.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))
                                }
                            </ul> : 'loading'
                    }
                </div>
                <button onClick={() => this._testA(this)}>test 1</button>
                <button onClick={() => this._testB(this)}>test 2</button>
                <button onClick={() => this._testC(this)}>test 3</button>
            </div>
        );
    }
}
Async.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    const { isFetching, response, error } = state.async;

    return { isFetching, response, error };
};

export default connect(mapStateToProps)(Async);

