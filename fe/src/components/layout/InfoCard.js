import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const InfoCard = (props) => (
  <Card border='secondary'>
    <Card.Img variant="top" src={props.img[0]} />
    <Card.Footer>
      <p><small className="text-muted">{props.common}</small></p>
      <p><small className="text-muted">{props.species}</small></p>
      <p><small className="text-muted">{props.county}, {props.state}</small></p>
      <p><small className="text-muted">{props.date}</small></p>
    </Card.Footer>
  </Card>
)
export default InfoCard
