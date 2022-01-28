import React from "react";
import { FormControl, MenuItem } from "@material-ui/core";
import { Text, Select } from './styles';

const PerPage = ({ onChange }) => {
  const [count, setCount] = React.useState(10);

  const handleChange = (event) => {
    setCount(event.target.value);
    onChange(event);
  };

  return (
    <>
      <Text>Items per page:</Text>
      <FormControl>
        <Select
          defaultValue={10}
          value={count}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default PerPage;
