import React, { useState, useEffect } from 'react'
import { ListGroup, Accordion, Card, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';


export function FormCard({ pokemonDetails, loading }) {

    const navigate = useNavigate();


    const selectPokemon = () => {
        navigate(`/details/${pokemonDetails.id}`);
    };

    return (
        <>
            {
                loading ? null :
                    <Card className='h-100 shadow-sm bg-light rounded'>
                        <div className="row">
                            <div className="col-sm">
                                {/* <Card.Body> */}
                                <Card.Img className="card-img-top" src={pokemonDetails.sprites.front_default} />
                                {/* </Card.Body> */}
                            </div>
                            <div className="col-sm">
                                <Card.Img className="card-img-top" src={pokemonDetails.sprites.back_default} />
                            </div>
                        </div>
                        <Card.Body className='d-flex flex-column'>

                            <>
                                <div className='mb-2 justify-content-between'>
                                    <Card.Title>{pokemonDetails.name}</Card.Title>
                                </div>

                                <Card.Text className='card-type'>Type: {pokemonDetails.types?.[0]?.type?.name}</Card.Text>
                                <Card.Text className='card-type'>Height: {pokemonDetails.height}</Card.Text>
                                <Card.Text className='card-type'>Weight: {pokemonDetails.weight}</Card.Text>

                                <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen="true">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Top Abilities</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup as="ol" numbered>
                                                {pokemonDetails.abilities?.map((abData, abIndex) =>
                                                    <ListGroup.Item key={abIndex} as="li">{abData.ability.name}</ListGroup.Item>
                                                )}
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Top 10 Moves</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup as="ol" numbered>
                                                {pokemonDetails.moves?.slice(0, 10).map((movesData, moveIndex) =>
                                                    <ListGroup.Item key={moveIndex} as="li">{movesData.move.name}</ListGroup.Item>
                                                )}
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Shiny Version</Accordion.Header>
                                        <div className="row">
                                            <div className="col-sm">
                                                <Accordion.Body>
                                                    <Card.Img src={pokemonDetails.sprites.front_shiny} />
                                                </Accordion.Body>
                                            </div>
                                            <div className="col-sm">
                                                <Accordion.Body>
                                                    <Card.Img src={pokemonDetails.sprites.back_shiny} />
                                                </Accordion.Body>
                                            </div>
                                        </div>
                                    </Accordion.Item>
                                </Accordion>

                                <Link to={`/details/${pokemonDetails.id}`}>
                                    <Button
                                        className='mt-auto font-weight-bold'
                                        variant='success'
                                        onClick={selectPokemon}
                                    >
                                        Select Pokemon
                                    </Button>
                                </Link>
                            </>
                        </Card.Body>
                    </Card>
            }
        </>)
}
