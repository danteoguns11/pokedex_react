import React, { useState, useEffect } from 'react'
import { ListGroup, Accordion, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


export function Pokecard({ pokemonUrl }) {

    const [selectedPokemons, setSelectedPokemons] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchPokemon()
    }, [])

    const fetchPokemon = async () => {
        try {
            const response = await fetch(pokemonUrl)
            const pokemonData = await response.json()
            setSelectedPokemons(pokemonData)
        } catch (error) {
            console.log('error message:', error);
            setSelectedPokemons(null);
        }
    }

    // console.log("pokecard", selectedPokemons.id)

    const selectPokemon = () => {
        navigate(`/details/${selectedPokemons.id}`);
    };

    return (
        <Card className='h-100 shadow-sm bg-light rounded'>
            <Card.Body className='d-flex flex-column'>
                {selectedPokemons && (
                    <>
                        <div className='mb-2 justify-content-between'>
                            <Card.Title>{selectedPokemons.name}</Card.Title>
                        </div>

                        <Card.Img className="card-img-top" src={selectedPokemons.sprites.front_default} />
                        <Card.Text className='card-type'>Type: {selectedPokemons.types?.[0]?.type?.name}</Card.Text>
                        <Card.Text className='card-type'>Height: {selectedPokemons.height}</Card.Text>
                        <Card.Text className='card-type'>Weight: {selectedPokemons.weight}</Card.Text>


                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Top Abilities</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        {selectedPokemons.abilities?.map((abData, abIndex) =>
                                            <ListGroup.Item key={abIndex} as="li">{abData.ability.name}</ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Top 10 Moves</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        {selectedPokemons.moves?.slice(0, 10).map((movesData, moveIndex) =>
                                            <ListGroup.Item key={moveIndex} as="li">{movesData.move.name}</ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <Link to={`/details/${selectedPokemons.id}`}>
                            <Button
                                className='mt-4 font-weight-bold'
                                variant='success'
                                onClick={selectPokemon}
                            >
                                Select Pokemon
                            </Button>
                        </Link>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}
