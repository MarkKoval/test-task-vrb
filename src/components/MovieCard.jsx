import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const MovieCard = ({ movie: initialMovie, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState({ ...initialMovie });
  const [movie, setMovie] = useState({ ...initialMovie });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/movies/${movie.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete(movie.id);
        setOpenDialog(false);
      } else {
        console.error("Failed to delete movie:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/movies/${editedMovie.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedMovie),
        }
      );
      if (response.ok) {
        setMovie(editedMovie);
        handleCloseDialog();
      } else {
        console.error("Failed to update movie:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea onClick={handleOpenDialog} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="450"
          image={movie.image}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {movie.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <StarIcon sx={{ color: "#f5c518", mr: 0.5 }} />
            <Typography variant="body2">{movie.rating}</Typography>
          </Box>
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "center", pb: 1 }}>
          <Button variant="contained" onClick={handleOpenDialog}>
            View movie
          </Button>
        </Box>
      </CardActionArea>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            backgroundColor: "#141414",
            color: "#ffffff",
          },
        }}
      >
        <DialogTitle>{isEditing ? "Edit Movie" : movie.title}</DialogTitle>
        <DialogContent>
          {isEditing ? (
            <Box sx={{ backgroundColor: "#ffffff", p: 2, borderRadius: 2 }}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={editedMovie.title}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={editedMovie.description}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Rating"
                name="rating"
                value={editedMovie.rating}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Release Date"
                name="release_date"
                value={editedMovie.release_date}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Genre"
                name="genre"
                value={editedMovie.genre.join(", ")}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Actors"
                name="actors"
                value={editedMovie.actors.join(", ")}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Director"
                name="director"
                value={editedMovie.director}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={editedMovie.image}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            </Box>
          ) : (
            <>
              <Box display="flex" justifyContent="center" margin="1rem">
                <img
                  src={movie.image}
                  alt={movie.title}
                  style={{ maxWidth: "70%" }}
                  gutterBottom
                />
              </Box>
              <Typography gutterBottom variant="body1" align="center">
                {movie.description}
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ marginRight: "8px", fontSize: "1.5rem" }}
                >
                  Rating:
                </Typography>
                <StarIcon sx={{ color: "#f5c518", fontSize: "1.5rem" }} />
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ marginLeft: "8px", fontSize: "1.5rem" }}
                >
                  {movie.rating}
                </Typography>
              </Box>

              <Typography gutterBottom variant="h6">
                Release Date: {movie.release_date}
              </Typography>
              <Typography gutterBottom variant="h6">
                Genre:{" "}
                {Array.isArray(movie.genre)
                  ? movie.genre.join(", ")
                  : movie.genre}
              </Typography>
              <Typography gutterBottom variant="h6">
                Actors:{" "}
                {Array.isArray(movie.actors)
                  ? movie.actors.join(", ")
                  : movie.actors}
              </Typography>
              <Typography gutterBottom variant="h6">
                Director: {movie.director}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {isEditing ? (
            <>
              <Button onClick={handleSave} color="success">
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)} color="secondary">
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleEdit} color="secondary">
                Edit
              </Button>
              <Button onClick={handleDelete} color="error">
                Delete
              </Button>
              <Button onClick={handleCloseDialog} color="secondary">
                Close
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default MovieCard;
