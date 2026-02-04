import CreateAction from "../CreateAction";
import Filters from "../Filters";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function NavBar({
  handleAddNewItem,
  setFilterValue,
  resetPage,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1.5,
        pl: 10,
        pr: 10,
        bgcolor: "#442675",
      }}
    >
      <CreateAction onSendData={handleAddNewItem} />
      <Typography variant="h4">Todo App</Typography>
      <Filters onSendData={setFilterValue} resetPage={resetPage} />
    </Box>
  );
}
