import React from 'react'
import pokemons from '../data.json'

import { Container, Row, Col } from 'react-bootstrap';
import { Pokecard } from './Pokecard'

export function Pokedex({ pokemon }) {
    return (
        <Container>
            <Row className='justify-content-center'>
                {pokemons.map((pokemon) => (
                    <Col xs={4} className='mb-5' key={pokemon.id}>
                        <Pokecard key={pokemon.id} pokemon={pokemon} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
