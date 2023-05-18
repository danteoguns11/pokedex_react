import React, { useState, useEffect } from 'react';
import { ListGroup, Accordion, Card, Button, Form } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FormCard } from './FormCard';
import { Container, Row, Col } from 'react-bootstrap';
import { Pokecard } from './Pokecard';

export function PokeForm({ }) {

    const [inputText, setInputText] = useState("");
    const [pokemonDetails, setPokemonDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const navigate = useNavigate();
    const state = { button: 1 };

    useEffect(() => {
        fetchPokemons();
    }, []);

    const updateName = (e) => {
        setInputText(e.currentTarget.value);
    }

    const fetchPokemons = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://pokeapi.co/api/v2/pokemon");
            const data = await response.json();
            const urls = data.results?.map(result => result.url);
            setPokemons(urls ?? []);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const getPokemon = async () => {
        try {
            setLoading(true);
            const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputText}`);
            const data = await result.json();
            setPokemonDetails(data)
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if (err.message === "Unexpected token 'N', \"Not Found\" is not valid JSON") {
                alert("Pokemon not found!")
            } else {
                console.log(err.message)
            }
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (state.button === 1) {
            console.log("Button 1 clicked!");
            getPokemon();
        }
        if (state.button === 2) {
            console.log("Button 2 clicked!");
            refreshPage();
        }
    }

    const selectPokemon = () => {
        navigate(`/details/`);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="name">Pokemon Name:</Form.Label>
                <Form.Control
                    type="text"
                    id="name"
                    aria-describedby="Pokemon Name"
                    value={inputText}
                    className="pokemon-name"
                    onChange={updateName}
                    required
                />

                {/* <input
                    type="text"
                    id="name"
                    value={inputText}
                    className="pokemon-name"
                    onChange={updateName}
                    required
                /> */}
                <Button onClick={() => (state.button = 1)}
                    type="submit"
                    className="btn1"
                    value="Search"
                >Search
                </Button>
                <Button onClick={() => (state.button = 2)}
                    type="submit"
                    className="btn1"
                    value="See All Pokemons"
                >
                    See All Pokemons
                </Button>
            </Form>

            {loading && <h2>Loading...</h2>}
            {
                pokemonDetails
                    ? <FormCard pokemonDetails={pokemonDetails} loading={loading} />
                    : (
                        <>
                            <Container>
                                <Row className='justify-content-center'>
                                    {pokemons.map((pokemonUrl, index) => (
                                        <Col xs={3} className='mb-5' key={index}>
                                            <Pokecard pokemonUrl={pokemonUrl} />
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </>
                    )
            }
        </>
    )
}
