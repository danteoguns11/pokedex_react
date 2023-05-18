import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Pokecard } from './Pokecard'

export function Pokedex({ props }) {

    let [pokemons, setPokemons] = useState("");

    useEffect(() => {
        fetchPokemons()
    }, [])

    const fetchPokemons = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon")
            const pokemonsData = await response.json()
            const urls = pokemonsData.results?.map(result => result.url);
            setPokemons(urls ?? "")
        } catch (error) {
            console.log('error message:', error);
            setPokemons(null);
        }
    }

    return (
        < Container >
            <Row className='justify-content-center'>
                {pokemons.map((pokemonUrl, index) => (
                    <Col xs={3} className='mb-5' key={index}>
                        <Pokecard pokemonUrl={pokemonUrl} />
                    </Col>
                ))}
            </Row>
        </Container >
    )
}

