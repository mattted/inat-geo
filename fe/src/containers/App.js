import React, {Component} from 'react'
import {connect} from 'react-redux'
import {initGeo} from '../actions/geoActions'
import {initDatalist} from '../action/filterActions'

import Header from '../components/layout/Header'
import MapContainer from './MapContainer'

class App extends Component {
  componentDidMount() {
    console.log("Calling initGeo()")
    this.props.initGeo()
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
    initGeo: () => dispatch(initGeo())
  }
}

export default connect(null, mapDispatchToProps)(App)
