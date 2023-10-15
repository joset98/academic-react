import React from "react";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import { FilterList } from "@mui/icons-material";

const TableColumns = ({ allColumns }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Filtros" aria-label="filters">
        <IconButton
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          <FilterList />
        </IconButton>
      </Tooltip>
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {allColumns.map(
          (column, index) =>
            index !== 0 &&
            column.Header !== "" && (
              <MenuItem>
                <FormControlLabel
                  control={(
                    <Checkbox
                      {...column.getToggleHiddenProps()}
                      name={column.id}
                    />
                  )}
                  label={column.Header}
                />
              </MenuItem>
            )
        )}
      </Menu>
    </>
  );
};

TableColumns.propTypes = {
  allColumns: PropTypes.array.isRequired,
};

export default TableColumns;
