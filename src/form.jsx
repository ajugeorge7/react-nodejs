import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    submit: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});

class TextFields extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        if (!nextProps.definition || !nextProps.definition.configValue) {
            return null;
        }

        return JSON.parse(nextProps.definition.configValue);
    }

    constructor(props) {
        super(props);
        this.state = {
            snackbar: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    handleFormSubmit() {
        const configValue = this.state;
        delete configValue.snackbar;
        const qualifier = this.props.definition.qualifiers.qualifier.map(entry => ({
            name: entry.name,
            values: { value: [entry.value] },
        }));

        const config = Object.assign({}, this.props.definition, { qualifiers: { qualifier } }, { configValue: JSON.stringify(configValue) });
        delete config.statusCode;
        delete config.auditTrail;
        const configuration = [config];
        const data = {
            configurations: {
                configuration,
            },
        };

        axios.put('/api/rules/booking', data)
            .then(() => {
                this.setState({
                    snackbar: true,
                });
            });
    }

    closeSnackbar() {
        this.setState({
            snackbar: false,
        });
    }

    handleChange(name) {
        return (event) => {
            this.setState({
                [name]: event.target.value,
            });
        };
    }

    render() {
        const { classes, definition } = this.props;
        return (
            <Paper className={classes.root}>
                <form className={classes.container} noValidate autoComplete="off">
                    {Object.keys(JSON.parse(definition.configValue)).map(entry =>
                        (<TextField
                            id={entry}
                            label={_.startCase(entry)}
                            className={classes.textField}
                            value={this.state[entry]}
                            onChange={this.handleChange(entry)}
                            margin="normal"
                        />))}
                </form>
                <br />
                <Button variant="raised" color="primary" className={classes.submit} onClick={this.handleFormSubmit}>Update</Button>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackbar}
                    onClose={this.closeSnackbar}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Updated successfully.</span>}
                />
            </Paper>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
    definition: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
