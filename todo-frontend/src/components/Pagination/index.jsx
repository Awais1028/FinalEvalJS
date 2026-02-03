import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
export default function DashboardPagination({ count, page, onChange }) {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      p={2}
      border="1px dashed grey"
    >
      <Pagination
        sx={{
          width: "270px",
          "& .MuiPaginationItem-root": {
            color: "black", // Color for inactive pages (and active initially)
          },
        }}
        color="primary"
        siblingCount={0}
        defaultPage={1}
        boundaryCount={1}
        count={count}
        page={page}
        onChange={onChange}
      />
    </Box>
  );
}
