import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

const dateParse = (date) => {
  let newDate = new Date(date)
  return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`
}

const obsCard = ({sobs}) => (
  <Card>
    <Card.Header bg='primary'>
      <p className='m-auto text-center'><strong>Observation #{sobs.gid}</strong></p>
      <p className='m-auto text-center'><small>{dateParse(sobs.date)} | {sobs.countyname} County, {sobs.statename}</small></p>
      <p className='m-auto text-center'><Badge variant='primary'><a href={sobs.url}>View at iNaturalist</a></Badge></p>
    </Card.Header>
    <Card.Body className='pt-2'>
      <ListGroup className='card-list-group' variant='flush'>
        <ListGroup.Item><strong>Kingdom:</strong> {sobs.kingdom ? sobs.kingdom : 'N/A'}</ListGroup.Item>
        <ListGroup.Item><strong>Phylum:</strong> {sobs.phylum ? sobs.phylum : 'N/A'}</ListGroup.Item>
        <ListGroup.Item><strong>Class:</strong> {sobs.klass ? sobs.klass : 'N/A'}</ListGroup.Item>
        <ListGroup.Item><strong>Order:</strong> {sobs.order ? sobs.order : 'N/A'}</ListGroup.Item>
        <ListGroup.Item><strong>Family:</strong> {sobs.family ? sobs.family : 'N/A'}</ListGroup.Item>
        <ListGroup.Item><strong>Genus:</strong> {sobs.genus ? sobs.genus : 'N/A'}</ListGroup.Item>
        <ListGroup.Item><strong>Species:</strong> {sobs.species ? sobs.species : 'N/A'}</ListGroup.Item>
        <ListGroup.Item><strong>Commmon:</strong> {sobs.common ? sobs.common : 'N/A'}</ListGroup.Item>
      </ListGroup>
    </Card.Body>
  </Card>
)

export default obsCard
