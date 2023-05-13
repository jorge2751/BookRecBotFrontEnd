import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, ButtonGroup, TextField, Box, Grid, Card, CardContent } from '@mui/material';

const Questionnaire = () => {
    const [reason, setReason] = useState('');
    const [topic, setTopic] = useState('');
    const [genreOrFormat, setGenreOrFormat] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    const genres = ['Fantasy', 'Mystery', 'Romance', 'Sci-fi', 'Horror', 'Self-help']; // Modify as needed
    const formats = ['Articles', 'Books', 'Other Literature Formats']; // Modify as needed
    const reasons = ['Personal', 'Education', 'Research']; // Define reasons

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.post('http://localhost:8000/api/recommend', {
            reason,
            topic,
            genreOrFormat,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRecommendations(response.data);
    };

    const container = {
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    return (
        <Container maxWidth="sm" style={container}>
            {recommendations.length > 0 ? (
                <>
                    {/* Use a fragment to wrap multiple elements */}
                    {recommendations.map((recommendation, index) => (
                        <Card key={index}>
                            <CardContent>
                                <Typography variant="h5">{recommendation.title}</Typography>
                                <Typography variant="subtitle1">{recommendation.author}</Typography>
                                {/* Link that opens new tab */}
                                <a href={recommendation.link} target="_blank" rel="noreferrer">Link</a>
                            </CardContent>
                        </Card>
                    ))}
                    {/* Wrap the Reset button in a Card and CardContent */}
                    <Card>
                        <Button onClick={() => setRecommendations([])}>Modify Search</Button>
                    </Card>
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                        <Typography variant="h6">What reason are you searching?</Typography>
                        <ButtonGroup color="primary" variant="outlined">
                            {reasons.map((option) => (
                                <Button
                                    key={option}
                                    variant={reason === option.toLowerCase() ? 'contained' : 'outlined'}
                                    onClick={() => {
                                        setReason(option.toLowerCase());
                                        setTopic('');
                                        setGenreOrFormat('');
                                        setRecommendations([]);
                                    }}
                                >
                                    {option}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box>

                    {reason && (
                        <Box mb={3}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label={reason === 'personal' ? "Name any books/authors/topics you already enjoy" : 'Describe the topic you would like to explore'}
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </Box>
                    )}

                    {reason && (
                        <Box mb={3}>
                            <Typography variant="h6">
                                {reason === 'personal' ? 'Choose a genre' : 'Choose a format'}
                            </Typography>
                            <Grid container spacing={1} wrap="wrap">
                                {(reason === 'personal' ? genres : formats).map((option) => (
                                    <Grid item xs={6} sm={4} md={3} key={option}>
                                        <Button
                                            variant={genreOrFormat === option ? 'contained' : 'outlined'}
                                            fullWidth
                                            onClick={() => setGenreOrFormat(option)}
                                        >
                                            {option}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}


                    <Button type="submit" variant="contained" color="primary" disabled={!reason || !topic || !genreOrFormat}>Submit</Button>
                </form>
            )}
        </Container>
    );
};

export default Questionnaire;
