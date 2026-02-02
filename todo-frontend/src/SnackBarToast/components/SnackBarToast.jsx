import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
export default function SnackBarToast({ type, message, setError }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setError("");
  };

  const handleSnackbarStatus = () => {
    setOpenSnackbar(true);
  };
  return (
    <Snackbar
      open={message === "" ? false : true}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
    >
      <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
