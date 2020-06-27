import React, {Component} from 'react'
import MapFilter from '../components/map/MapFilter'

class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    console.log(this.props)  
    return (
      <MapFilter />
    )
  }
}

export default MapContainer
