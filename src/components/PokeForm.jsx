import React, { useState, useEffect } from 'react';
import { Alert, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PokeFormCard } from './PokeFormCard';
import { Pokecard } from './Pokecard';

export function PokeForm({ }) {

    const [inputText, setInputText] = useState("");
    const [pokemonDetails, setPokemonDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const navigate = useNavigate();
    const state = { button: 1 };
    const [errorMessage, setErrorMessage] = useState('');

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
        }
    };

    const getPokemon = async () => {
        try {
            setLoading(true);
            const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputText}`);
            if (result.status === 404) {
                setErrorMessage('Pokemon not found!');
            } else {
                const data = await result.json();
                setPokemonDetails(data);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (state.button === 1) {
            getPokemon();
        }
        if (state.button === 2) {
            refreshPage();
        }
    }

    const handleSeeAll = () => {
        refreshPage();
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Label className="my-auto" htmlFor="name">Pokemon Name:</Form.Label>
                <Form.Control
                    type="text"
                    id="name"
                    aria-describedby="Pokemon Name"
                    value={inputText}
                    className="pokemon-name"
                    onChange={updateName}
                    required
                />

                <Button onClick={() => (state.button = 1)}
                    type="submit"
                    className="btn1"
                    value="Search"
                >Search
                </Button>
                <Button
                    onClick={handleSeeAll}
                    className="btn1"
                    value="See All Pokemons"
                >
                    See All Pokemons
                </Button>
            </Form>

            {loading && <h2>Loading...</h2>}
            {errorMessage && (
                <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>{errorMessage}</p>
                </Alert>
            )}
            {pokemonDetails ? (
                <PokeFormCard pokemonDetails={pokemonDetails} loading={loading} />
            ) : (
                <>
                    <Container>
                        <Row className="justify-content-center">
                            {pokemons.map((pokemonUrl, index) => (
                                <Col xs={3} className="mb-5" key={index}>
                                    <Pokecard pokemonUrl={pokemonUrl} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </>
            )}
        </>
    )
}
