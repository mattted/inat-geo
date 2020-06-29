import React, {Component} from 'react'
import {connect} from 'react-redux'
import Filter from '../components/map/Filter'
import Chloro from '../components/map/Chloro'

class MapContainer extends Component {

  render() {
    return (
      <>
        <Filter />
        {this.props.map_loaded ? <Chloro /> : <p>loading</p>}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {map_loaded: state.geo.type !== ''}
}

export default connect(mapStateToProps)(MapContainer)
