import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

const getId = () => uuid.v4();
const getHeaders = results => Object.keys(JSON.parse(results[0].configValue));

function SimpleTable(props) {
    const { classes, onSelect, results } = props;
    if (!results.length) {
        return null;
    }
    const headers = getHeaders(results);
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {headers.map(header => (
                            <TableCell>{_.startCase(header)}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map(result => (
                        <TableRow key={getId()} hover onClick={() => { onSelect(result); }}>
                            {headers.map(header => (
                                <TableCell>{JSON.parse(result.configValue)[header]}</TableCell>
                            ))}
                        </TableRow>))
                    }
                </TableBody>
            </Table>
        </Paper>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    results: PropTypes.array.isRequired,
};

export default withStyles(styles)(SimpleTable);
