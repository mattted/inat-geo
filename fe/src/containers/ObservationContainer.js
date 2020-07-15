import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getObs} from '../actions/obsActions'
import Sobs from '../components/obs/Sobs'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

class ObservationContainer extends Component {
  componentDidMount() {
    this.props.getObs(this.props.match.params.id)
  }

  render() {
    return (
      <>
        {this.props.loading 
          ? <Row className='justify-content-center m-4'>
              <Col className='text-center mx-auto' >
                <Spinner animation='border' variant='danger' />
              </Col>
            </Row> 
          // : <Sobs sobs={this.props.sobs} />}
          : <Sobs sobs={this.props.sobs} />}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.obs.loading,
    sobs: state.obs.sobs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getObs: id => dispatch(getObs(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObservationContainer)
