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

class MapFilter extends Component {
  constructor(props) {
    super(props)
    this.geoRadios = [
      {name: 'County', value: 'counties'},
      {name: 'State', value: 'states'},
    ]
    this.subcatRadios =  [
      {name: 'Phylum', value: 'phylum'},
      {name: 'Class', value: 'klass'},
      {name: 'Order', value: 'order'},
      {name: 'Family', value: 'family'},
      {name: 'Genus', value: 'genus'},
      {name: 'Species', value: 'species'},
      {name: 'Common Name', value: 'common'},
    ]
    this.kingdomRadios =  [
      {name: 'Animals', value: 'Animalia'},
      {name: 'Plants', value: 'Plantae'},
      {name: 'Fungi', value: 'Fungi'},
    ]
  }

  handleGeoChange = (e) => {
    if(this.props.selection !== '') {
      // TODO: need to fix changeObs args
      this.props.changeObs(this.props.selection, this.props.subcat, this.props.kingdom, e.target.value)
    } else {
      console.log('no change') 
    }
    this.props.changeGeo(e.target.value) 
  }

  render() {
    return (
      <Container>
        <Row className='justify-content-center mt-1'>
          <Col className='col-10 mx-auto text-center'>
            <ButtonGroup toggle>
              {this.geoRadios.map((radio, i) => (
                <ToggleButton
                  key={i}
                  size='sm'
                  type='radio'
                  variant='primary'
                  name={radio.name}
                  value={radio.value}
                  checked={radio.value === this.props.geo}
                  onChange={this.handleGeoChange}
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
              onChange={(sel) => this.props.changeObs(sel.value, this.props.subcat, this.props.kingdom, this.props.geo, this.props.geoid)}
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
  } 
}

function mapStateToProps(state) {
  return {...state.filter, selection: state.obs.selection, geo: state.geo.type, geoid: state.geo.geoid}
}

export default connect(mapStateToProps, mapDispatchToProps)(MapFilter)
