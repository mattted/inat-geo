import React, {Component} from 'react'
import Filter from '../components/map/Filter'
import Chloro from '../components/map/Chloro'

class MapContainer extends Component {

  render() {
    return (
      <>
        <Filter />
        <Chloro />
      </>
    )
  }
}

export default MapContainer
