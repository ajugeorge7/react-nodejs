import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Results from './table';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    button: {
        float: 'right',
        top: '-45px',
    },
});

const query = {
    CompanyCode: 10126,
    ManagementUnitCode: 1256,
    JurisdictionCode: 'CAN',
};

class SimpleSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gds: '',
            pos: '',
            Path: '',
            FareType: '',
            results: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.filter = this.filter.bind(this);
        this.selectRow = this.selectRow.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    selectRow(row) {
        const { onSelect } = this.props;
        onSelect(row);
    }

    filter() {
        axios('/api/rules/booking', {
            params: Object.assign({}, query, {
                FareType: this.state.FareType,
                PathType: this.state.Path,
            }),
        })
            .then((res) => {
                this.setState({
                    results: res.data.value.configurations.configuration
                        .filter(config => config.configValue !== 'NO_VALUE_FOUND'),
                });
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="gds">GDS</InputLabel>
                        <Select
                            value={this.state.gds}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'gds',
                                id: 'gds',
                            }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Amadeus">Amadeus</MenuItem>
                            <MenuItem value="Sabre">Sabre</MenuItem>
                            <MenuItem value="TravelFusion">Travel Fusion</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="pos">Point of sale</InputLabel>
                        <Select
                            value={this.state.pos}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'pos',
                                id: 'pos',
                            }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Expedia.com">Expedia US</MenuItem>
                            <MenuItem value="CAN">Travelocity Canada</MenuItem>
                            <MenuItem value="Expedia.com.au">Expedia Australia</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="Path">Path</InputLabel>
                        <Select
                            value={this.state.Path}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'Path',
                                id: 'Path',
                            }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Standalone">Standalone</MenuItem>
                            <MenuItem value="Package">Package</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="FareType">Fare type</InputLabel>
                        <Select
                            value={this.state.FareType}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'FareType',
                                id: 'FareType',
                            }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="Published">Published</MenuItem>
                            <MenuItem value="Web">Web</MenuItem>
                            <MenuItem value="Naked Net">Naked Net</MenuItem>
                            <MenuItem value="Package Net">Package Net</MenuItem>
                            <MenuItem value="White Label">White Label</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="raised" color="primary" onClick={this.filter}>Filter</Button>
                </Paper>
                <Results onSelect={this.selectRow} results={this.state.results} />
            </div>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(SimpleSelect);
