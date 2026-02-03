import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function AlertDialog({ type, message, setAlert, setAlertType }) {
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert("");
    setAlertType("");
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
