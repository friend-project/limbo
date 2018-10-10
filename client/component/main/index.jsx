import React, { Component } from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Count from '../count'
import Async from '../async'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
    }
  }
  render() {
    const { match } = this.props
    return (
      <div>
        <ul>
          <li><Link to="/main/count">Count</Link></li>
          <li><Link to="/main/async">Async</Link></li>
        </ul>
        <Route path={`${match.url}/count`} exact component={Count} />
        <Route path={`${match.url}/async`} exact component={Async} />
      </div>
    )
  }
}

Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return { }
}

export default connect(mapStateToProps)(Main)


