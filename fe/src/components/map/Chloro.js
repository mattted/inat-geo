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
    this.pathGenerator = d3.geoPath(this.projection)


    this.drawMap()
  }

  componentDidUpdate() {
    this.drawMap()
  }

  componentDidMount() {
    this.drawMap()
  }

  drawMap = () => {
    this.projection = this.projection.fitWidth(this.boundedWidth, this.props.shp)
    this.pathGenerator = d3.geoPath(this.projection)
    this.boundedHeight = this.pathGenerator.bounds(this.props.shp)[1][1]
    this.height = this.boundedHeight + this.margin.top + this.margin.bottom
    this.zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', this.zoomed)

    d3.select(this.mapRef)
      .on('click', () => this.reset(this.zoom, this.height, this.width))
    
    d3.select(this.gRef)
      .selectAll('path')
      .data(this.props.shp.features)
      .attr('class', 'boundaries')
      .on('mouseover', d => this.highlight(d, this.tipRef))
      .on('mouseout', this.unhighlight)
      .on('click', (d) => this.clicked(d, this.pathGenerator, this.zoom, this.width, this.height))
      .transition()
      .duration(1000)
      .attr('d', d => this.pathGenerator(d))
      .attr('fill', d => this.assignFill(d))

    d3.select(this.mapRef).call(this.zoom)
  }

  highlight(d, tipRef) {
    // highlight boundary geometry
    d3.select(d3.event.target)
      .style('stroke', '#4c566a')
      .style('stroke-width', '1px')

    debugger

    // add tooltip
    d3.select(tipRef)
      .transition().duration(200)
      .style('opacity', 1)
      .style('left', `${d3.event.pageX + 30}px`)
      .style('top', `${d3.event.pageY - 30}px`)
      .text(`${d.properties.name} County`)
  }

  unhighlight(d) {
    d3.select(this)
      .style('stroke-width', '0.1px')
      .style('stroke', '#3b4252')
  }

  assignFill = (d) => {
    return this.props.data[d.id] 
      ? this.props.colorscale(this.props.data[d.id])
      : "#ECEFF4"
  }

  zoomed = () => {
    const {transform} = d3.event
    d3.select(this.gRef).attr('transform', transform)
    d3.select(this.gRef).attr('stroke-width', 1 / transform.k)
  }


  clicked = (d, path, zoom, w, h) => {
    const svg = d3.select(this.mapRef)
    const [[x0, y0], [x1, y1]] = path.bounds(d)
    d3.event.stopPropagation()

    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(w / 2, h / 2)
        .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / w, (y1 - y0) / h)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
      d3.mouse(svg.node())
    )
  }

  reset = (zoom, h, w) => {
    const svg = d3.select(this.mapRef)

    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity,
      d3.zoomTransform(svg.node()).invert([w / 2, h / 2])
    )
  }

  render() {
    const boundaries = this.props.shp.features.map((d, i) => <path key={d.id}/>)
    return (
      <Container fluid>
        <Row className='justify-content-center'>
          <svg width={this.width} height={this.height} ref={el => (this.mapRef = el)}>
            <g ref={el => (this.gRef = el)}>
              {boundaries}
            </g>
          </svg>
          <div className='tooltip' style={{position: 'absolute', opacity: 0}} ref={el => (this.tipRef = el)} />
        </Row>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // zoomGeo: (gid, focus) => dispatch(zoomGeo(gid, focus)),
    // changeGeo: (selected) => dispatch(changeGeo(selected)),
    // changeObs: (selected, orgFilter, geoType) => dispatch(changeObs(selected, orgFilter, geoType)),
  }
}

function mapStateToProps(state) {
  return {
    ...state.geo,
    ...state.obs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chloro)
