import { useState } from "react";

export function useDashboardPagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const resetPage = () => {
    setCurrentPage(1);
  };

  //Update Current Page Value
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return { currentPage, handlePageChange, resetPage };
}
