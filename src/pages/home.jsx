import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import AddMovieForm from "../components/MovieForm";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const handleDeleteMovie = (movieId) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
  };

  return (
    <Container maxWidth="lg" sx={{ mb: "2rem" }}>
      <Typography
        sx={{
          fontFamily: "monospace",
          fontSize: "4.5rem",
          textAlign: "center",
          margin: "1rem",
        }}
        color="secondary"
      >
        Movie Time
        <Button variant="contained" onClick={handleOpenDialog} sx={{ ml: 2 }}>
          Add Movie
        </Button>
      </Typography>
      <TextField
        label="Search for movies by title"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          sx: {
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover": {
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
            "&:focus": {
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
          },
        }}
        InputLabelProps={{
          sx: {
            color: "white",
            "&.Mui-focused": {
              color: "white",
            },
          },
        }}
        sx={{ mb: 2 }}
      />
      <Grid container spacing={3}>
        {filteredMovies.map((movie) => (
          <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} onDelete={handleDeleteMovie} />
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Movie</DialogTitle>
        <DialogContent>
          <AddMovieForm onAddMovie={handleAddMovie} handleClose={handleCloseDialog}/>
        </DialogContent>
        
      </Dialog>
    </Container>
  );
};

export default HomePage;
