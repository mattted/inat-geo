import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changeGeo} from '../actions/geoActions'
import {populateDatalist} from '../actions/filterActions'
// import {partitionData} from '../actions/partitionActions'

import Header from '../components/layout/Header'
import MapContainer from './MapContainer'
import Obs from '../components/obs/Obs'

class App extends Component {
  componentDidMount() {
    this.props.changeGeo('counties')
    this.props.populateDatalist('Animalia', 'phylum')
    // this.props.partitionData()
  }
  
  render() {
    return (
      <>
        <Header />
        <MapContainer />
        <Obs />
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeGeo: (geoType) => dispatch(changeGeo(geoType)),
    populateDatalist: (kingdom, subcat) => dispatch(populateDatalist(kingdom, subcat)),
  }
}

export default connect(null, mapDispatchToProps)(App)
