import React, { useState, useEffect } from 'react'
import { ListGroup, Accordion, Card, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';


export function ViewPokecard({ selectedPokemons }) {

    const { pokemonId } = useParams();
    const [showPokemons, setShowPokemons] = useState([]);
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
            setShowPokemons([viewData])
        } catch (error) {
            console.log('error message:', error);
            setShowPokemons(null);
        }
    }

    return (
        <Card className='h-100 shadow-sm bg-light rounded'>
            <Card.Body className='d-flex flex-column'>
                {showPokemons && (
                    <>
                        <div className='mb-2 justify-content-between'>
                            <Card.Title>{showPokemons?.[0]?.name}</Card.Title>
                        </div>

                        <div className="row">
                            <div className="col-sm">
                                <Card.Img src={showPokemons?.[0]?.sprites?.front_default} />
                            </div>
                            <div className="col-sm">
                                <Card.Img src={showPokemons?.[0]?.sprites?.back_default} />
                            </div>
                        </div>

                        <Card.Text className='card-type'>Type: {showPokemons?.[0]?.types?.[0]?.type?.name}</Card.Text>
                        <Card.Text className='card-type'>Height: {showPokemons?.[0]?.height}</Card.Text>
                        <Card.Text className='card-type'>Weight: {showPokemons?.[0]?.weight}</Card.Text>


                        <Accordion defaultActiveKey={['0', '1']} alwaysOpen="true">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Top Abilities</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        {showPokemons?.[0]?.abilities?.map((abData, abIndex) =>
                                            <ListGroup.Item key={abIndex} as="li">{abData.ability.name}</ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Top 10 Moves</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup as="ol" numbered>
                                        {showPokemons?.[0]?.moves?.slice(0, 10).map((movesData, moveIndex) =>
                                            <ListGroup.Item key={moveIndex} as="li">{movesData.move.name}</ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Accordion.Body>
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
