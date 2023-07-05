import React, { useState } from 'react';
import axios from 'axios';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Container, Typography, Button, ButtonGroup, TextField, Box, Grid, Card, CardContent, CircularProgress, IconButton, Tooltip } from '@mui/material';

const Questionnaire = () => {
    const [reason, setReason] = useState('');
    const [topic, setTopic] = useState('');
    const [genreOrFormat, setGenreOrFormat] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false); // Add a loading state here

    const genres = ['Fantasy', 'Mystery', 'Romance', 'Sci-fi', 'Horror', 'Self-help'];
    const formats = ['Textbooks', 'Workbooks', 'Trade Books', 'Scholarly Journals', 'Monographs', 'Biographies / Autobiographies'];
    const reasons = ['Personal', 'Education', 'Research'];

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true when you start fetching
        try {
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
        } catch (error) {
            console.log(error);
        }
        setLoading(false); // Set loading to false when done fetching
    };

    const container = {
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    return (
        <Container maxWidth="sm" style={container}>
            {loading ? (
                <>
                    <Typography variant="h6">Searching for the perfect books...</Typography>
                    <CircularProgress />
                </>
            ) : recommendations.length > 0 ? (
                <>
                    <Typography variant="h6">
                        Here are your recommendations!
                        <Tooltip title="These are affiliate links. If you purchase a book through these links, you help support our site. Thank you!">
                            {/* Small question mark icon, that when hovered, explains to the user that these are affeliate links and it helps support our site when someone buys the book using our link */}
                            <IconButton aria-label="info">
                                <HelpOutlineIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Use map to iterate over the recommendations */}
                        {recommendations.map((recommendation, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                {/* Wrap each card in a Grid item */}
                                <Card>
                                    <CardContent>
                                        {/* Thumbnail */}
                                        <img src={recommendation.thumbnail} alt={recommendation.title} style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                                        <Typography variant="h6">{recommendation.title}</Typography>
                                        <Typography variant="subtitle2">by {recommendation.author}</Typography>
                                        {/* Link that opens new tab */}
                                        <a href={recommendation.link} target="_blank" rel="noreferrer">Link</a>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Button 
                                variant='outlined' 
                                onClick={() => setRecommendations([])}
                                sx={{
                                    color: '#b6940e',
                                    borderColor: '#b6940e',
                                    '&:hover': {
                                        backgroundColor: 'rgba(182, 148, 14, 0.2)',
                                        borderColor: '#b6940e',
                                    },
                                }}
                                >
                                Modify Search
                            </Button>
                        </Grid>
                    </Grid>

                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                        <Typography variant="h6">What reason are you searching?</Typography>
                        <ButtonGroup variant="outlined">
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
                                    sx={{
                                        color: reason === option.toLowerCase() ? '#fff' : '#b6940e',
                                        backgroundColor: reason === option.toLowerCase() ? '#b6940e' : 'transparent',
                                        borderColor: '#b6940e',
                                        '&:hover': {
                                            backgroundColor: reason === option.toLowerCase() ? '#b6940e' : 'rgba(182, 148, 14, 0.2)',
                                            borderColor: '#b6940e',
                                        },
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
                                label={reason === 'personal' ? "Name any books/authors/topics you already enjoy" : 'Describe the topic you would like to explore'}
                                value={topic}
                                sx={{
                                    backgroundColor: 'rgba(182, 148, 14, 0.2)',
                                    '& .MuiInputBase-input': {
                                        color: '#b6940e',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#b6940e',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#b6940e',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#b6940e',
                                    },
                                }}
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
                                    <Grid item xs={6} sm={4} md={4} key={option}>
                                        <Button
                                            variant={genreOrFormat === option ? 'contained' : 'outlined'}
                                            fullWidth
                                            onClick={() => setGenreOrFormat(option)}
                                            sx={{
                                                color: genreOrFormat === option ? '#fff' : '#b6940e',
                                                backgroundColor: genreOrFormat === option ? '#b6940e' : 'transparent',
                                                borderColor: '#b6940e',
                                                '&:hover': {
                                                    backgroundColor: genreOrFormat === option ? '#b6940e' : 'rgba(182, 148, 14, 0.2)',
                                                    borderColor: '#b6940e',
                                                },
                                            }}
                                        >
                                            {option}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    <Button type="submit" variant="contained" color="primary" disabled={!reason || !topic || !genreOrFormat} sx={{
                        backgroundColor: '#b6940e',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: 'rgba(182, 148, 14, 0.8)',
                        },
                    }}>Submit</Button>
                </form>
            )}
        </Container>
    );
};

export default Questionnaire;
