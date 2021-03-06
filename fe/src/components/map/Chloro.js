import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import * as d3 from 'd3'

import {selectGeo} from '../../actions/geoActions'
import {changeTable} from '../../actions/obsActions'

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
      .on('click', () => {
        this.reset(this.zoom, this.height, this.width)
        this.props.selectGeo('', '')
      })
    
    const path = d3.select(this.gRef).selectAll('path')

    path.data(this.props.shp.features)
      .attr('class', 'boundaries')
      .on('click', d => {
        if (this.props.geoid === d.id) {
          this.reset(this.zoom, this.height, this.width)
          this.props.selectGeo('', '')
        } else {
          this.clicked(d, this.pathGenerator, this.zoom, this.width, this.height)
          this.props.selectGeo(d.id, d.properties.name)
        }
      })
      .attr('d', d => this.pathGenerator(d))
      .transition()
      .duration(1000)
      .attr('fill', d => this.assignFill(d))

    path.select('title')
      .text(d => `${d.properties.name}\n${this.props.data[d.id] ? d3.format(',')(this.props.data[d.id]) : 'N/A'}`)

    d3.select(this.mapRef).call(this.zoom)
  }

  assignFill = (d) => {
    return this.props.data[d.id] 
      ? this.props.colorscale(this.props.data[d.id])
      : "#f7f8fa"
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

  reset = (zoom, h, w, selectGeo=this.props.selectGeo) => {
    const svg = d3.select(this.mapRef)

    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity,
      d3.zoomTransform(svg.node()).invert([w / 2, h / 2])
    )
    selectGeo('', '')
  }

  render() {
    const boundaries = this.props.shp.features.map((d, i) => <path key={d.id}><title></title></path>)
    return (
      <Container fluid>
        <Row className='justify-content-center my-3'>
          <svg className='chloro' width={this.width} height={this.height} ref={el => (this.mapRef = el)}>
            <g ref={el => (this.gRef = el)}>
              {boundaries}
            </g>
          </svg>
        </Row>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectGeo: (geoid, geoName) => dispatch(selectGeo(geoid, geoName)),
    changeTable: (selection, subcat, geo, geoid) => dispatch(changeTable(selection, subcat, geo, geoid)),
  }
}

function mapStateToProps(state) {
  return {
    ...state.geo,
    ...state.obs,
    subcat: state.filter.subcat,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chloro)
