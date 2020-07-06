import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import {changeTable} from '../../actions/obsActions'

class ObsCard extends Component {
  constructor(props) {
    super(props)
    this.tableEntry = this.props.table[this.props.match.params.id]
  }

  dateParse = (date) => {
    let newDate = new Date(date)
    return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`
  }

  tableLoaded = () => (
    <Container>
      <Row className='justify-content-center'>
        <Card className="text-center mb-3 w-100">
          <Card.Header>
            {`${this.tableEntry.common ? 'Common Name: ' + this.tableEntry.common + ' | ' : ''}Species: ${this.tableEntry.species}`}
          </Card.Header>
          <Carousel className='mt-3 carousel-locked'>
            {this.tableEntry ? this.tableEntry.img.map(image => (
              // TODO: wrong aspect ratios and image transitions
              <Carousel.Item>
                {/* <Image src={image} fluid/> */}
                <img src={image} className='d-block mx-auto'/>
              </Carousel.Item>
                )) : ''}
          </Carousel>
          <Card.Body>
            <Card.Text className='obs-card-text'>
              <p><strong>Location: </strong>{this.tableEntry.county} County, {this.tableEntry.state}</p>
              <p><strong>Observered: </strong>{this.dateParse(this.tableEntry.date)}</p>
              <p><strong>Kingdom: </strong>{this.tableEntry.kingdom}</p>
              <p><strong>Phylum: </strong>{this.tableEntry.phylum}</p>
              <p><strong>Class: </strong>{this.tableEntry.klass}</p>
              <p><strong>Order: </strong>{this.tableEntry.order}</p>
              <p><strong>Family: </strong>{this.tableEntry.family}</p>
              <p><strong>Genus: </strong>{this.tableEntry.genus}</p>
              <p><a href={this.tableEntry.url}><Badge variant='primary text-center'>View at iNaturalist</Badge></a></p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )

  notLoaded = () => ( 
    <Container>
      <Row className='justify-content-center mt-3'>
        <Card className="text-center mb-3">
          <Card.Body>
            <Card.Text>
              Nothing Loaded Yet. Make a selection <span><Link to='/'>here</Link></span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
        
  render() {
    return this.tableEntry ? this.tableLoaded() : this.notLoaded() 
  }
}

  // this.props.changeTable(this.props.selection, this.props.subcat, this.props.type, this.props.geoid)
function mapDispatchToProps(dispatch) {
  return {
    changeTable: (sel, sub, gtype, gid, pg) => dispatch(changeTable(sel, sub, gtype, gid, pg))
  }
}

function mapStateToProps(state) {
  return {
    table: state.obs.table,
    county: state.obs.county,
    state: state.obs.state,
    aggData: state.obs.data,
    geoid: state.geo.geoid,
    page: state.obs.page,
    geoType: state.geo.type,
    subcat: state.filter.subcat,
    selection: state.obs.selection,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ObsCard)

