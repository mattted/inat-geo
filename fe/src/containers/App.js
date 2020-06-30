import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changeGeo} from '../actions/geoActions'
import {populateDatalist} from '../actions/filterActions'

import Header from '../components/layout/Header'
import MapContainer from './MapContainer'

class App extends Component {
  componentDidMount() {
    this.props.changeGeo('counties')
    this.props.populateDatalist('kingdom', 'Kingdom')
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
    changeGeo: (geoType) => dispatch(changeGeo(geoType)),
    populateDatalist: (orgType, orgName) => dispatch(populateDatalist(orgType, orgName))
  }
}

export default connect(null, mapDispatchToProps)(App)
