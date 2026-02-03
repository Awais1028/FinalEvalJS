import AddBar from "../../AddMenu/components/AddMenu";
import MenuBar from "../../FilterMenu/components/FilterMenu";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export default function NavBar({ handleAddNewItem, setFilterVal, resetPage }) {
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
      <AddBar onSendData={handleAddNewItem} />
      <Typography variant="h4">Todo App</Typography>

      <MenuBar onSendData={setFilterVal} resetPage={resetPage} />
    </Box>
  );
}
