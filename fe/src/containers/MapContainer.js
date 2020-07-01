import React, {Component} from 'react'
import {connect} from 'react-redux'
import Filter from '../components/map/Filter'
import Chloro from '../components/map/Chloro'
import Legend from '../components/map/Legend'

class MapContainer extends Component {

  render() {
    return (
      <>
        <Filter />
        {this.props.map_loaded ? <Chloro /> : <p>loading</p>}
        {this.props.obs_selected ? <Legend /> : ''}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    map_loaded: state.geo.type !== '',
    obs_selected: state.obs.selection !== ''
  }
}

export default connect(mapStateToProps)(MapContainer)
