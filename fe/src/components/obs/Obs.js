import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import CardDeck from 'react-bootstrap/CardDeck'
import CardColumns from 'react-bootstrap/CardColumns'
import InfoCard from '../../components/layout/InfoCard'
import {changeTable} from '../../actions/obsActions'

class Obs extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Row className='justify-content-center mx-2'>
          <CardColumns className='mt-5'>
            {/* {this.props.table[0] ? this.props.table.slice(0, 6).map(obs => <InfoCard county={obs.county} state={obs.state} data={obs.date} img={obs.img} /> ) : ''} */}
            {this.props.table[0] ? this.props.table.map(obs =>
              <InfoCard
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
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeTable: dispatch(changeTable())
  }
}

function mapStateToProps(state) {
  return {
    table: state.obs.table,
    county: state.obs.county,
    state: state.obs.state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Obs)
