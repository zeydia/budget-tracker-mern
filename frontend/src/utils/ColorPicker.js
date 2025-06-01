import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, Grid } from '@mui/material';

const predefinedColors = [
  '#ff0000', // red
  '#e91e63', // pink
  '#9c27b0', // purple
  '#3f51b5', // indigo
  '#2196f3', // blue
  '#4caf50', // green
  '#ff9800', // orange
  '#795548', // brown
  '#000000', // black
  '#ffffff', // white
];

const ColorPicker = ({ label = "Choisir une couleur", onChange }) => {
  const [selectedColor, setSelectedColor] = useState(predefinedColors[0]);

  const handleSelect = (color) => {
    setSelectedColor(color);
    if (onChange) onChange(color);
  };

  const handleCustomColor = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    if (onChange) onChange(color);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="subtitle1">{label}</Typography>

      <Grid container spacing={1}>
        {predefinedColors.map((color) => (
          <Grid item key={color}>
            <IconButton
              onClick={() => handleSelect(color)}
              sx={{
                backgroundColor: color,
                border: selectedColor === color ? '2px solid #000' : '1px solid #ccc',
                width: 36,
                height: 36,
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Box>
        <TextField
          type="color"
          name="color"
          value={selectedColor}
          onChange={handleCustomColor}
          label="Couleur personnalisée"
          variant="outlined"
          fullWidth
          sx={{ width: 160 }}
        />
      </Box>

      <Typography variant="body2">
        Couleur sélectionnée : <strong>{selectedColor}</strong>
      </Typography>
    </Box>
  );
};

export default ColorPicker;
