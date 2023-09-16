import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { visuallyHidden } from '@mui/utils';
import { Link, Avatar, Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { order, orderBy, headCells, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id} sx={{ fontWeight: 550 }}
                        align='left'
                        padding='normal'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    headCells: PropTypes.array.isRequired
};

function EnhancedTableToolbar({ dense, handleChangeDense }) {

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense"
            />
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    dense: PropTypes.bool.isRequired,
    handleChangeDense: PropTypes.func.isRequired,
};
export default function PlayersTable({ data, rating,season,}) {

    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('rating');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = data

    const headCells = [
        {
            id: 'ranking',
            numeric: true,
            disablePadding: false,
            label: <FormattedMessage id = 'PRS.rank' />,
        },
        {
            id: 'Player',
            numeric: false,
            disablePadding: true,
            label: <FormattedMessage id = 'PRS.ply' />,
        },
        {
            id: 'Nation',
            numeric: true,
            disablePadding: false,
            label: <FormattedMessage id = 'PRS.nation' />,
        },
        {
            id: 'Club',
            numeric: false,
            disablePadding: false,
            label: <FormattedMessage id = 'PRS.club' />,
        },
        {
            id: 'MP',
            numeric: true,
            disablePadding: false,
            label: <FormattedMessage id = 'PRS.mp' />,
        },

    ];

    //add rating value for the player rating system, you must set a model for showing the table
    if (rating) {

        headCells.push(
            {
                id: 'rating',
                numeric: true,
                disablePadding: false,
                label: <FormattedMessage id = 'PRS.rate' />,
            }
        )
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // control gage for table   
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // control rows for table   
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // conver table size
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar dense={dense} handleChangeDense={handleChangeDense} />
                <TableContainer>
                    <Table
                        // sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            headCells={headCells}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>

                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            sx={{
                                                '&:hover':{
                                                    color:'#278AF3',
                                                    backgroundColor:'#278AF3'
                                                }

                                            }}
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                            <TableCell align='left' sx={{ fontWeight: 400 }} >
                                                {row.ranking}  </TableCell>
                                            <TableCell sx={{ fontWeight: 500 }}
                                                align='left'
                                                padding='normal'
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >

                                                <Link underline="none" target="_blank" rel="noreferrer"
                                                    color='black' variant='keys'
                                                    align='start'
                                                    href={`player-report/${row.player.id}/${season}/${row.Player}`}
                                                    sx={{
                                                        '&:hover':{
                                                            color:'#278AF3'
                                                        }
                                                    }}
                                                >
                                                        {row.Player}
                                                </Link>
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 500 }} align='center' >
                                                <Tooltip title={row.player.Nation} placement="right" >
                                                    <Avatar
                                                        alt={row.player.Nation}
                                                        src={`https://playerscubestore.storage.iran.liara.space/nations/${row.player.Nation}.png`} sx={{ width: 20, height: 20, ml: 1 }} />

                                                </Tooltip>

                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 500 }} >{row.Club}    </TableCell>
                                            <TableCell sx={{ fontWeight: 500 }} >{row.MP}       </TableCell>
                                            {rating && <TableCell sx={{ fontWeight: 500 }} >
                                                <StarIcon fontSize='small' color="ranking" sx={{ mt: -0.5 }} />
                                                {Number(row.rating).toFixed(2)}   </TableCell>}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"

                >
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page} showFirstButton showLastButton
                        labelRowsPerPage={
                            <Typography sx={{ mt: 1.7 }}  >
                                <FormattedMessage id = 'PRS.row' />
                            </Typography>
                        }
                        labelDisplayedRows={({ from, to, count }) => (
                            <Typography sx={{ mt: 1.9 }}  >
                                {from} – {to} of {count}
                            </Typography>
                        )}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </Paper>
        </Box>
    );
}
