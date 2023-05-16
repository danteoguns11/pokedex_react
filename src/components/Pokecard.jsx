import React from 'react'
import { Card } from 'react-bootstrap';


export function Pokecard({ pokemon }) {
    return (
        <Card className='h-100 shadow-sm bg-light rounded'>
            <Card.Body className='d-flex flex-column'>
                <div className='mb-2 justify-content-between'>
                    <Card.Title>{pokemon.name}</Card.Title>
                </div>
                <Card.Img src={pokemon.image} />
                <Card.Text className='card-type'>Type: {pokemon.type}</Card.Text>
            </Card.Body>
        </Card>
    )
}
