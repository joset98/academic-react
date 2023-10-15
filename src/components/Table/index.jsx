/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Grid,
  Checkbox,
  Hidden,
  Divider,
} from "@mui/material/";
import PropTypes from "prop-types";
import {
  useTable,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from "react-table";

import { 
  Pagination, 
  TableCell, 
  TableRow, 
  ContainerLoading, 
  Empty, 
  CardMobile, 
  WrappperMobile, 
  CellMobile 
} from "./styles";
import TableTop from "./components/TableTop";
import PerPage from "./components/PerPage";
import ChangePage from "./components/ChangePage";
import TableSearch from "./TableSearch";
import TableColumns from "./components/TableColumns";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const Template = ({
  columns,
  data,
  loading,
  search,
  filters,
  left,
  right,
  selectDefault,
  selectedOne,
  handleClickRow,
  getAllSelected,
  checkbox,
  showTableTop,
  ...rest
}) => {
  const [selectedRowId, setSelectedRowId] = useState(selectDefault);

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    allColumns,
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: rest || {},
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        !selectedOne && checkbox
          ? // Let's make a column for selection
            {
              id: "selection",
              // The header can use the table's getToggleAllRowsSelectedProps method
              // to render a checkbox
              Header: ({ getToggleAllPageRowsSelectedProps }) => (
                <div>
                  <IndeterminateCheckbox
                    {...getToggleAllPageRowsSelectedProps()}
                  />
                </div>
              ),
              // The cell can use the individual row's getToggleRowSelectedProps method
              // to the render a checkbox
              Cell: ({ row }) => (
                <div>
                  <Checkbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            }
          : {},
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    setSelectedRowId(selectDefault || null);
  }, [data]);

  useEffect(() => {
    const selected = selectedFlatRows.map((row) => row.original);
    getAllSelected(selected);
  }, [selectedFlatRows])

  // Render the UI for your table
  return (
    <>
      {showTableTop && (
        <TableTop
          left={(
            <>
              { search && (
                <TableSearch
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              )}
              {left}
            </>
          )}
          right={(
            <>
              {filters && <TableColumns allColumns={allColumns} />}
              {right}
            </>
          )}
        />
      )}
      <TableContainer>
        <Hidden only={['xs', 'sm']}>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup,index) => (
                <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <TableCell
                      key={index}
                      padding={index === 0 ? "checkbox":"none"}
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </TableCell>
                ))}
                </TableRow>
            ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {!loading ? page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  key={row.id}
                  className={selectedRowId === row.id ? "selected" : ""}
                  onClick={() => {
                    if (selectedOne) {
                      setSelectedRowId(row.id);
                      handleClickRow(row.original);
                    }
                  }}
                  variant={selectedOne ? "selectedOne" : null}
                >
                  {row.cells.map((cell, index) => (
                    <TableCell
                      key={index}
                      variant={selectedOne ? "selectedOne" : null}
                      padding={index === 0 ? "checkbox":"none"}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            }) :(
              <TableRow>
                <ContainerLoading colSpan="100">
                  <div>
                    <CircularProgress color="primary" />
                  </div>
                </ContainerLoading>
              </TableRow>
            )}
            </TableBody>
          </Table>
        </Hidden>
        <Hidden mdUp>
          <WrappperMobile {...getTableProps()} {...getTableBodyProps()}>
            {loading ? (
              <Table>
                <TableBody>
                  <TableRow>
                    <ContainerLoading colSpan="100">
                      <div>
                        <CircularProgress color="primary" />
                      </div>
                    </ContainerLoading>
                  </TableRow>
                </TableBody>
              </Table>

            )
            :
               page.map((row, i) => {
                prepareRow(row);
                return (
                  <CardMobile
                    key={row.id}
                    className={selectedRowId === row.id ? "selected" : ""}
                    onClick={() => {
                    if (selectedOne) {
                      setSelectedRowId(row.id);
                      handleClickRow(row.original);
                    }
                  }}
                  > 
                    {row.cells.map((currentCell, index) => (
                      (index !== 0) ? (
                        <>
                          { ((checkbox && index !== 1) || (!checkbox) && index > 1) && <Divider />}
                          <CellMobile
                            key={`${index}-cell`}
                          >
                            {currentCell.column.Header !== '' && (
                              <strong>
                                {`${currentCell.column.Header  }:`}
                              </strong>
                            )}
                            {' '}
                            { currentCell.render('Cell') }
                          </CellMobile>
                        </>
                      ) : null
                    ))}
                  </CardMobile>
                )
              })}
          </WrappperMobile>
        </Hidden>
      </TableContainer>
      {!loading && page.length === 0 && <Empty>No hay información a mostrar</Empty>}
      <Pagination item container xs={12} justify="space-between" padding={2}>
        <Grid xs={6} item container direction="row" alignItems="center">
          <PerPage
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          />
        </Grid>
        <Grid xs={6} item container justify="flex-end" alignItems="center">
          <ChangePage
            pageSize={pageSize}
            currentPage={pageIndex + 1}
            totalPages={pageOptions.length}
            canPreviousPage={canPreviousPage}
            totalRows={data.length}
            previousPage={previousPage}
            canNextPage={canNextPage}
            nextPage={nextPage}
          />
        </Grid>
      </Pagination>
    </>
  );
};

Template.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  search: PropTypes.bool,
  filters: PropTypes.bool,
  left: PropTypes.element,
  right: PropTypes.element,
  selectedOne: PropTypes.bool,
  handleClickRow: PropTypes.func,
  getAllSelected: PropTypes.func,
  selectDefault: PropTypes.string,
  checkbox: PropTypes.bool,
  showTableTop: PropTypes.bool,
};

Template.defaultProps = {
  data: [],
  columns: [],
  loading: false,
  search: true,
  filters: true,
  left: () => {},
  right: () => {},
  selectedOne: false,
  handleClickRow: () => {},
  getAllSelected: () => {},
  selectDefault: null,
  checkbox: true,
  showTableTop: true,
};

export default Template;
