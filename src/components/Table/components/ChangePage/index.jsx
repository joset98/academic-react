import React from "react";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { IconButton, Text } from "./styles";

const ChangePage = ({
  canPreviousPage,
  canNextPage,
  totalPages,
  totalRows,
  previousPage,
  nextPage,
  currentPage,
  pageSize,
}) => (
  <>
    <Text>
      {pageSize * (currentPage - 1) + 1} -
      {currentPage * pageSize >= totalRows ? totalRows : currentPage * pageSize}
{" "}
      de {totalRows}
    </Text>
    <label htmlFor="icon-button-file">
      <IconButton
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        color="default"
        aria-label="upload picture"
        component="span"
        fontSize="small"
      >
        <ArrowBackIosOutlinedIcon />
      </IconButton>
    </label>

    <label htmlFor="icon-button-file">
      <IconButton
        onClick={() => nextPage()}
        disabled={!canNextPage}
        color="default"
        aria-label="upload picture"
        component="span"
        fontSize="small"
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </label>
  </>
);

export default ChangePage;
