import React from 'react'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import noPic from '../img/no-pic.png'

const dateParse = (date) => {
  let newDate = new Date(date)
  return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`
}

const InfoCard = ({obs}) => (
  <Card border='secondary'>
    {obs.img[0] && !obs.img[0].includes('https://static.inaturalist.org/sounds') ? <Card.Img variant="top" src={obs.img[0]} /> : <Card.Img variant="top" src={noPic} />}
    <Card.Footer className='card-info-description'>
      <p className='info-item'><small className="text-muted">{obs.common}</small></p>
      <p className='info-item'><small className="text-muted">{obs.species}</small></p>
      <p className='info-item'><small className="text-muted">{obs.name} County, {obs.state}</small></p>
      <p className='info-item'><small className="text-muted">{dateParse(obs.date)}</small></p>
      <p><Link to={`observation/${obs.gid}`}><Badge variant='primary text-center'>View</Badge></Link></p>
    </Card.Footer>
  </Card>
)
export default InfoCard
