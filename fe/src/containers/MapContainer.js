import React, {Component} from 'react'
import {connect} from 'react-redux'
import MapFilter from '../components/map/MapFilter'
import Chloro from '../components/map/Chloro'
import Legend from '../components/map/Legend'
import Obs from '../components/obs/Obs'

import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

class MapContainer extends Component {

  render() {
    return (
      <>
        <MapFilter />
        {this.props.map_loaded ? <Chloro /> : <Row className='justify-content-center m-4'><Spinner animation='border' variant='danger' /></Row>}
        {this.props.obs_selected ? <Legend /> : ''}
        <Obs />
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    map_loaded: state.geo.type !== '',
    obs_selected: state.obs.selection !== '',
  }
}

export default connect(mapStateToProps)(MapContainer)
