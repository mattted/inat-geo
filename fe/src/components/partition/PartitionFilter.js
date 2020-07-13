import React, {Component} from 'react'
import {connect} from 'react-redux'
import WindowedSelect, {createFilter} from 'react-windowed-select'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

import {populateDatalist} from '../../actions/filterActions'
import {changeGeo} from '../../actions/geoActions'
import {changeObs} from '../../actions/obsActions'
import {partitionData} from '../../actions/partitionActions'

class PartitionFilter extends Component {
  constructor(props) {
    super(props)
    this.subcatRadios =  [
      {name: 'Phylum', value: 'phylum'},
      {name: 'Class', value: 'klass'},
      {name: 'Order', value: 'order'},
      {name: 'Family', value: 'family'},
      {name: 'Genus', value: 'genus'},
      // {name: 'Species', value: 'species'},
      // {name: 'Common Name', value: 'common'},
    ]
    this.kingdomRadios =  [
      {name: 'Animals', value: 'Animalia'},
      {name: 'Plants', value: 'Plantae'},
      {name: 'Fungi', value: 'Fungi'},
    ]
  }

  render() {
    return (
      <Container>
        <Row className='justify-content-center mt-1'>
          <Col className='col-10 mx-auto text-center'>
            <ButtonGroup toggle>
              {this.kingdomRadios.map((radio, i) => (
                <ToggleButton
                  key={i}
                  size='sm'
                  type='radio'
                  variant='primary'
                  name={radio.name}
                  value={radio.value}
                  checked={radio.value === this.props.kingdom}
                  onChange={(e) => this.props.populateDatalist(radio.value, this.props.subcat)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
        <Row className='justify-content-center mt-1'>
          <Col className='col-10 mx-auto text-center'>
            <ButtonGroup toggle>
              {this.subcatRadios.map((radio, i) => (
                <ToggleButton
                  key={i}
                  size='sm'
                  type='radio'
                  variant='primary'
                  name={radio.name}
                  value={radio.value}
                  checked={radio.value === this.props.subcat}
                  onChange={(e) => this.props.populateDatalist(this.props.kingdom, radio.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
        <Row className='justify-content-center mt-1'>
          <Col />
          <Col>
            <WindowedSelect
              options={this.props.list}
              filterOption={createFilter({ignoreAccents: false})}
              // TODO: fix changeObs arguments
              onChange={
                sel => {
                  this.props.partitionData(sel.value, this.props.subcat, this.props.kingdom, this.props.subcat)
                  this.props.changeObs(sel.value, this.props.subcat, this.props.kingdom, this.props.geo, this.props.geoid)
                }
              }
            />
          </Col>
          <Col />
        </Row>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    populateDatalist: (kingdom, subcat) => dispatch(populateDatalist(kingdom, subcat)),
    changeGeo: (selected) => dispatch(changeGeo(selected)),
    changeObs: (selected, subcat, kingdom, geo, geoid) => dispatch(changeObs(selected, subcat, kingdom, geo, geoid)),
    partitionData: (sel, subcat, kingdom, treeCat) => dispatch(partitionData(sel, subcat, kingdom, treeCat)),
  } 
}

function mapStateToProps(state) {
  return {...state.filter, selection: state.obs.selection, geo: state.geo.type, geoid: state.geo.geoid}
}

export default connect(mapStateToProps, mapDispatchToProps)(PartitionFilter)
