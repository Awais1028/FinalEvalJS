import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          p: 1,
          m: 1,
          bgcolor: "grey.100",
          color: "grey.800",
          border: "1px solid",
          borderColor: "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          ...theme.applyStyles("dark", {
            bgcolor: "#101010",
            color: "grey.300",
            borderColor: "grey.800",
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};

export default function AddBar({ onSendData }) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpen = () => setOpen(true); // reuse

  const handleClose = () => {
    setOpen(false);
    setInputValue("");
  };

  //SnackBar Specific Func
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSnackbarStatus = () => {
    setOpenSnackbar(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="theme.palette.primary"
        size="medium"
        onClick={handleOpen}
      >
        Add New Item
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              alignSelf: "center",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                color: "#007bff",
                fontSize: "1.5rem",
                width: "100%",
                textAlign: "center",
              }}
            >
              Add New Item
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                p: 0.5,
                m: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  color: "grey",
                  border: "2px solid grey",
                  borderRadius: "8px",
                  fontSize: "1.5rem",
                  height: "auto",
                  width: "80%",
                  textAlign: "center",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Please Enter Name of Todo"
                  value={inputValue}
                  sx={{ width: "100%" }}
                  variant="outlined"
                  slotProps={{
                    htmlInput: {
                      maxLength: 150,
                    },
                  }}
                  onChange={handleInputChange}
                />
              </Box>
              <Button
                onClick={() => {
                  if (inputValue === "") {
                    console.log("toast printing");
                    handleSnackbarStatus();
                  } else {
                    onSendData(inputValue);
                    setOpen(false);
                    setInputValue("");
                  }
                }}
              >
                Add
              </Button>
            </Box>
            <Box
              sx={{
                color: "grey",
                fontSize: "1.5rem",
                width: "100%",
                height: 36,
                textAlign: "center",
              }}
            >
              <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity="error"
                  variant="filled"
                  sx={{ width: "100%" }}
                >
                  Please Enter the Todo Title
                </Alert>
              </Snackbar>
            </Box>
          </Box>
          <button
            onClick={handleClose}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            &times;
          </button>
        </Box>
      </Modal>
    </div>
  );
}
