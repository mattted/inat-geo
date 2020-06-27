import React, {Component} from 'react'
import {connect} from 'react-redux'
import {initGeo} from '../actions/geoActions'
import {populateDatalist} from '../actions/filterActions'

import Header from '../components/layout/Header'
import MapContainer from './MapContainer'

class App extends Component {
  componentDidMount() {
    console.log("Calling initGeo()")
    this.props.initGeo()
    this.props.populateDatalist('kingdom')
  }
  
  render() {
    return (
      <>
        <Header />
        <MapContainer propTest="this is a prop test" />
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initGeo: () => dispatch(initGeo()),
    populateDatalist: (orgType) => dispatch(populateDatalist(orgType))
  }
}

export default connect(null, mapDispatchToProps)(App)
