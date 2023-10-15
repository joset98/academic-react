import React from "react";
import { InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useAsyncDebounce } from "react-table";
import { OutlinedInput } from "./styles";

const TableSearch = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <OutlinedInput
      id="input-with-icon-adornment"
      variant="outlined"
      placeholder="Buscar"
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      startAdornment={(
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      )}
    />
  );
};

export default TableSearch;
