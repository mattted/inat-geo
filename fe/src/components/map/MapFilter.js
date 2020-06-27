import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

class MapFilter extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log(this.props.test)
  }
  
  render() {
    return (
      <>
        <ButtonGroup toggle>
          <ToggleButton
            type='radio'
            variant='info'
            value={1}
          >
            Test
          </ToggleButton>
        </ButtonGroup>
      </>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {} 
}

function mapStateToProps(state){
  return {
    test: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapFilter)
