import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import * as d3 from 'd3'
import * as d3legend from 'd3-svg-legend'

class Legend extends Component {
  constructor(props){
    super(props)
    this.width = window.innerWidth * 0.9
    this.height = '60px'
    this.translate = `translate(${this.width / 2}, 30)`
    this.drawScale()
  }

  componentDidMount() {
    this.drawScale()
  }

  componentDidUpdate() {
    this.drawScale()
  }

  drawScale = () => {
    this.legendScale = d3.scaleLog()
      .domain([1, d3.extent(Object.values(this.props.data))[1]])
    this.cellBins = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] 
    this.scaledCells = this.cellBins.map(cell => Math.round(this.legendScale.invert(cell)))

    d3.select(".legendSvg").remove()
    this.legendSvg = d3.select(this.legendRef).append("svg")
      .attr("class", "legendSvg level")
      .attr('width', this.width)
      .attr('height', this.height)

    this.legendGroup = this.legendSvg.append('g')
      .attr("class", "legendGroup")
      .attr("transform", `translate(${this.width/2.4}, 30)`)

    this.legendGroupCells = this.legendGroup.append('g')
      .attr('class', 'legendCells')
      .attr('transform', 'translate(-205, 0)') 

    this.logLegend = d3legend.legendColor()
      .orient('horizontal')
      .shapeWidth(40)
      .shapeHeight(7)
      .labelOffset(2)
      .labelAlign('center')
      .labelFormat(d3.format(","))
      .cells(this.scaledCells)
      .scale(this.props.colorscale)

    this.legendGroupCells.call(this.logLegend)

    this.legendTitle = this.legendGroup.append('text')
      .attr('y', -20)
      .attr('class', 'legend-title')
      .attr('text-anchor', 'middle')
      .text('Total Observations')

    this.legendByline = this.legendGroup.append('text')
      .attr('y', -6)
      .attr('class', 'legend-byline')
      .attr('text-anchor', 'middle')
      .text(`${this.formattedName(this.props.subcat)} ${this.props.selection}`)
  }

  formattedName = (name) => {
    let subcatNames = {
      phylum: 'Phylum',
      klass: 'Class',
      order: 'Order',
      family: 'Family',
      genus: 'Genus',
      species: 'Species',
      common: 'Common Name'
    }
    return subcatNames[name]
  }

  render(){
    return (
      <Container>
        <Row className='justify-content-center'>
          <svg width={window.innerWidth * 0.9} height='60px' ref={el => (this.legendRef = el)} />
        </Row>
      </Container> 
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selection: state.obs.selection,
    subcat: state.filter.subcat,
    data: state.obs.data,
    colorscale: state.obs.colorscale,
  }
}

export default connect(mapStateToProps)(Legend)
