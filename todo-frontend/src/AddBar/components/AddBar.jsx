import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import "../styles/AddBar.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";

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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
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
        <>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                p: 1,
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
                  borderRadius: "16px",
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
                  p: 1,
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
                    width: "80%",
                    textAlign: "center",
                  }}
                >
                  <input
                    name="inputBox"
                    maxLength={200}
                    type="text"
                    style={{ paddingLeft: "10px" }}
                    placeholder="Please Enter Name of Todo"
                    className="flex-item-left-addbar"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </Box>
                <Box
                  sx={{
                    p: 2,
                    color: "grey",
                    border: "2px solid grey",
                    borderRadius: "8px",
                    fontSize: "1.5rem",
                    width: "20%",
                    textAlign: "center",
                  }}
                >
                  Item 2
                </Box>
              </Box>
              <Item>The Error Msg</Item>
            </Box>
            <button
              onClick={handleClose}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              &times;
            </button>

            <h3 className="flex-item-addbar" style={{ color: "#2380d7" }}>
              Add New Todo
            </h3>

            <div
              className="flex-container-addbar"
              style={{
                flexDirection: "row",
                minWidth: "100%",
                minHeight: "10px",
                marginBottom: "30px",
              }}
            >
              <Button
                className="flex-item-right-addbar"
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
            </div>

            <div
              className="flex-item-addbar"
              style={{ justifyContent: "space-around" }}
            >
              <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
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
            </div>
          </Box>
        </>
      </Modal>
    </div>
  );
}
