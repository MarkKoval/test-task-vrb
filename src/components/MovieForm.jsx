import React, { useState } from "react";
import { TextField, Box, DialogActions, Button } from "@mui/material";

const AddMovieForm = ({ onAddMovie, handleClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: "",
    release_date: "",
    genre: [],
    actors: [],
    director: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "genre" || name === "actors") {
      const values = value.split(",").map((item) => item.trim());
      setFormData({ ...formData, [name]: values });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Movie added successfully:", data);
        onAddMovie(data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
      });
  };

  return (
    <Box>
      <TextField
        required
        label="Title"
        variant="outlined"
        fullWidth
        name="title"
        value={formData.title}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        label="Description"
        variant="outlined"
        fullWidth
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        label="Rating"
        variant="outlined"
        fullWidth
        name="rating"
        inputProps={{ min: 0, max: 10 }}
        value={formData.rating}
        onChange={handleChange}
        type="number"
        sx={{ mb: 2 }}
      />
      <TextField
        required
        label="Release Date"
        variant="outlined"
        fullWidth
        name="release_date"
        value={formData.release_date}
        onChange={handleChange}
        type="date"
        sx={{ mb: 2 }}
      />
      <TextField
        required
        label="Genre"
        variant="outlined"
        fullWidth
        name="genre"
        value={formData.genre.join(", ")}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        label="Actors"
        variant="outlined"
        fullWidth
        name="actors"
        value={formData.actors.join(", ")}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        label="Director"
        variant="outlined"
        fullWidth
        name="director"
        value={formData.director}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        required
        label="Image URL"
        variant="outlined"
        fullWidth
        name="image"
        value={formData.image}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Box>
  );
};

export default AddMovieForm;
