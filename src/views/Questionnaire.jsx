import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, ButtonGroup, TextField, Box, Grid } from '@mui/material';

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

        const response = await axios.post('http://your-api-url/recommend', {
            reason,
            topic,
            genreOrFormat,
        });

        setRecommendations(response.data);
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Box mb={3}>
                    <Typography variant="h6">What reason are you searching?</Typography>
                    <ButtonGroup color="primary" variant="contained">
                        {reasons.map((option) => (
                            <Button
                                key={option}
                                color={reason === option.toLowerCase() ? 'secondary' : 'primary'}
                                onClick={() => setReason(option.toLowerCase())}
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
                                        variant="contained"
                                        fullWidth
                                        color={genreOrFormat === option ? 'secondary' : 'primary'}
                                        onClick={() => setGenreOrFormat(option)}
                                    >
                                        {option}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}


                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </Container>
    );
};

export default Questionnaire;
