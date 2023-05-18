import React, { useState, useEffect } from 'react'
import { ListGroup, Accordion, Card, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';


export function ViewPokecard({ selectedPokemons }) {

    const { pokemonId } = useParams();
    const [showPokemons, setShowPokemons] = useState("");
    const navigate = useNavigate();

    const backBtn = () => {
        navigate('/');
    };

    useEffect(() => {
        viewPokemon()
    }, [])

    const viewPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            const viewData = await response.json()
            setShowPokemons(viewData)
            console.log("pokecard Data", showPokemons)

        } catch (error) {
            console.log('error message:', error);
            setShowPokemons(null);
        }
    }

    return (
        <Card className='h-100 shadow-sm bg-light rounded'>
            <div className="row">
                <div className="col-sm">
                    {/* <Card.Body> */}
                    <Card.Img className="card-img-top" src={showPokemons.sprites?.front_default} />
                    {/* </Card.Body> */}
                </div>
                <div className="col-sm">
                    <Card.Img className="card-img-top" src={showPokemons.sprites?.back_default} />
                </div>
            </div>
            <Card.Body className='d-flex flex-column'>
                {showPokemons && (
                    <>
                        <div className='mb-2 justify-content-between'>
                            <Card.Title>{showPokemons.name}</Card.Title>
                        </div>

                        <Card.Text className='card-type'>Type: {showPokemons.types?.[0]?.type?.name}</Card.Text>
                        <Card.Text className='card-type'>Height: {showPokemons.height}</Card.Text>
                        <Card.Text className='card-type'>Weight: {showPokemons.weight}</Card.Text>


                        <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen="true">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Top Abilities</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        {showPokemons.abilities?.map((abData, abIndex) =>
                                            <ListGroup.Item key={abIndex} as="li">{abData.ability.name}</ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Top 10 Moves</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        {showPokemons.moves?.slice(0, 10).map((movesData, moveIndex) =>
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
                                            <Card.Img src={showPokemons.sprites.front_shiny} />
                                        </Accordion.Body>
                                    </div>
                                    <div className="col-sm">
                                        <Accordion.Body>
                                            <Card.Img src={showPokemons.sprites.back_shiny} />
                                        </Accordion.Body>
                                    </div>
                                </div>
                            </Accordion.Item>
                        </Accordion>

                        <Link to={`/`}>
                            <Button
                                className='mt-auto font-weight-bold'
                                variant='success'
                                onClick={backBtn}
                            >
                                Back
                            </Button>
                        </Link>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}
