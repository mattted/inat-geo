// create svg ref 
// render svg with ref and empty paths within (only keys)
// use a draw function with standard d3 syntax to make transitions happen
// move init map to draw map and run with componentDidUpdate and componentDidMount
// d3 select ref select all path ---> use transition pattern .data(data).transition().duration(1000).attr(d, ...).style(fill....)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import * as d3 from 'd3'

import {zoomGeo} from '../../actions/geoActions'

class Chloro extends Component {
  constructor(props) {
    super(props)
    this.width = props.width || window.innerWidth * 0.9
    this.margin = props.margin || {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };
    console.log(props)
    this.initMap()
  }

  initMap = () => {
    this.boundedWidth = this.width - this.margin.left - this.margin.right
    this.genProj = d3.geoAlbersUsa()
    this.projection = this.genProj.fitWidth(this.boundedWidth, this.props.shp)
    this.pathGenerator = d3.geoPath(this.projection)
    this.boundedHeight = this.pathGenerator.bounds(this.props.shp)[1][1]
    this.height = this.boundedHeight + this.margin.top + this.margin.bottom
  }

  componentDidUpdate() {
    this.initMap()
  }

  assignFill = (d) => {
    return this.props.data[d.id] 
      ? this.props.colorscale(this.props.data[d.id])
      : "#ECEFF4"
  }

  handleGeoClick = (e) => {
    e.persist()
    this.props.zoomGeo(e.target.attributes.gid.value, this.props.shp)
  }

  render() {
    const boundaries = this.props.shp.features.map((d, i) => <path
        key={d.id}
        gid={d.id}
        d={this.pathGenerator(d)}
        style={{
          fill: this.assignFill(d)
        }}
        className='boundaries' 
        onClick={this.handleGeoClick}
      />)
    return (
      <Container fluid>
        <Row className='justify-content-center'>
          <svg width={this.width} height={this.height}>
            {boundaries}
          </svg>
        </Row>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    zoomGeo: (gid) => dispatch(zoomGeo(gid)),
    // changeGeo: (selected) => dispatch(changeGeo(selected)),
    // changeObs: (selected, orgFilter, geoType) => dispatch(changeObs(selected, orgFilter, geoType)),
  }
}

function mapStateToProps(state) {
  return {
    shp: state.geo.shp,
    ...state.obs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chloro)
