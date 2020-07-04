import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CardColumns from 'react-bootstrap/CardColumns'
import Pagination from 'react-bootstrap/Pagination'
import InfoCard from '../../components/layout/InfoCard'
import {changeTable} from '../../actions/obsActions'

class Obs extends Component {
  constructor(props) {
    super(props)
    this.perPage = 20
  }

  totalPages = () => {
    if (this.props.aggData.length === 0 || this.props.aggData.length <= 20) {
      return 1
    } else {
      return this.props.geoid === '' 
        ? Math.floor(Object.values(this.props.aggData).reduce((t,x) => t+x) / this.perPage)
        : Math.floor(this.props.aggData[this.props.geoid] / this.perPage)
    }
  }

  renderPagination = (totalPages) => {
    if (totalPages <= 10) {
      return [...Array(totalPages + 1).keys()].slice(1).map(num => <Pagination.Item key={num} active={num === this.props.page}>{num}</Pagination.Item>)
    } else {
      return [...Array(11).keys()].slice(1).map(num => (
        <Pagination.Item
          key={num}
          active={num === this.props.page}
          onClick={() => this.props.changeTable(this.props.selection, this.props.subcat, this.props.geoType, this.props.geoid, num)}
        >
          {num}
        </Pagination.Item>)
      )
    }
  }

  render() {
    return (
      <Container>
        <Row className='justify-content-center mt-3'>
          <Pagination size='sm'>
            {this.renderPagination(this.totalPages())}
          </Pagination>
        </Row>
        <Row className='justify-content-center mx-2'>
          <CardColumns className='mt-1'>
            {/* {this.props.table[0] ? this.props.table.slice(0, 6).map(obs => <InfoCard county={obs.county} state={obs.state} data={obs.date} img={obs.img} /> ) : ''} */}
            {this.props.table[0] ? this.props.table.map(obs =>
              <InfoCard
                key={obs.gid}
                county={obs.name}
                state={obs.state}
                date={obs.date}
                img={obs.img}
                kingdom={obs.kingdom}
                phylum={obs.phylum}
                klass={obs.klass}
                order={obs.order}
                family={obs.family}
                genus={obs.genus}
                species={obs.species}
                common={obs.common}
              /> ) : ''}
          </CardColumns>
        </Row>
        <Row className='justify-content-center'>
          <Pagination size='sm'>
            {this.renderPagination(this.totalPages())}
          </Pagination>
        </Row>
      </Container>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Obs)
