import React, {Component} from 'react'
import {connect} from 'react-redux'
import {partitionData} from '../actions/partitionActions'

import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

import Partition from '../components/partition/Partition'
import PartitionFilter from '../components/partition/PartitionFilter'
import Obs from '../components/obs/Obs'

class PartitionContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    !this.props.aggData[0] && this.props.partitionData()
  }
  
  render() {
    return (
      <>
        <PartitionFilter />
        {this.props.loading ? <Row className='justify-content-center m-4'><Spinner animation='border' variant='danger' /></Row> : <Partition />}
        <Obs />    
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.partition
})

const mapDispatchToProps = dispatch => {
  return {
    partitionData: () => dispatch(partitionData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartitionContainer)

