import React, {Component} from 'react'
import {connect} from 'react-redux'
import Filter from '../components/map/Filter'
import {partitionData} from '../actions/partitionActions'

import Partition from '../components/partition/Partition'

const PartitionContainer = (props) => Object.keys(props.aggData).length > 0 ? <Partition /> : ''

const mapStateToProps = (state) => ({
  aggData: state.partition.aggData
})

export default connect(mapStateToProps)(PartitionContainer)
