import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(232, 241, 250)", // Default background
          "&:hover": {
            backgroundColor: "rgb(232, 241, 250)", // Keep the same color on hover
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: "rgb(232, 241, 250)",
            },
          },
          "&.Mui-focused": {
            backgroundColor: "rgb(232, 241, 250)", // Keep the same color when focused
          },
        },
      },
    },
  },
});

export default function FilterMenu({ onSendData, resetPage }) {
  const [labelValue, setLabelValue] = useState("ALL");
  const [inputValue, setInputValue] = useState("All");

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setLabelValue(newValue.toUpperCase());
    setInputValue(newValue);
    resetPage();
    onSendData(newValue);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <ThemeProvider theme={customTheme}>
        <FormControl fullWidth color="warning">
          <InputLabel id="demo-simple-select-label">ALL</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={inputValue}
            label={labelValue}
            sx={{
              color: "white",
              // 1. Static (Default) Outline Color
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)", // Change this to your desired color
              },
              // 2. Hover Outline Color
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "warning.main", // Use theme colors like 'warning.main'
              },
              // 3. Focused (Clicked) Outline Color
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "warning.dark",
                borderWidth: "2px", // Recommended to keep focus visible
              },
            }}
            onChange={handleSelectChange}
          >
            <MenuItem value={"All"}>ALL</MenuItem>
            <MenuItem value={"Active"}>ACTIVE</MenuItem>
            <MenuItem value={"Deleted"}>DELETED</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </Box>
  );
}
