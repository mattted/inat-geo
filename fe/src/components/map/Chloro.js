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
    this.boundedWidth = this.width - this.margin.left - this.margin.right
    this.projection = d3.geoAlbersUsa()
    this.drawMap()
  }

  drawMap = () => {
    this.projection = this.projection.fitWidth(this.boundedWidth, this.props.shp)
    this.pathGenerator = d3.geoPath(this.projection)
    this.boundedHeight = this.pathGenerator.bounds(this.props.shp)[1][1]
    this.height = this.boundedHeight + this.margin.top + this.margin.bottom
    
    console.log(this.props)

    d3.select(this.svgRef)
      .selectAll('path')
      .data(this.props.shp.features)
      .attr('class', 'boundaries')
      .transition()
      .duration(1000)
      .attr('d', d => this.pathGenerator(d))
      .attr('fill', d => this.assignFill(d))
  }

  componentDidUpdate() {
    this.drawMap()
  }

  componentDidMount() {
    this.drawMap()
  }

  assignFill = (d) => {
    return this.props.data[d.id] 
      ? this.props.colorscale(this.props.data[d.id])
      : "#ECEFF4"
  }

  handleGeoClick = (e, d) => {
    e.persist()
    console.log(e)
    console.log(d)
    // this.props.zoomGeo(e.target.attributes.gid.value, this.props.shp)
  }

  render() {
    const boundaries = this.props.shp.features.map((d, i) => 
      <path key={d.id} onClick={(e) => this.handleGeoClick(e, d)} />
    )
    return (
      <Container fluid>
        <Row className='justify-content-center'>
          <svg width={this.width} height={this.height} ref={el => (this.svgRef = el)}>
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
