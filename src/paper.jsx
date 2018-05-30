import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
    button: {
        float: 'right',
        top: '-45px',
    },
});

function PaperSheet(props) {
    const { classes, title, onSelect, description } = props;
    return (
        <div>
            <Paper className={classes.root} elevation={4} component="nav">
                <Typography variant="headline" component="h3">{title}</Typography>
                <Typography component="p">{description}</Typography>
                <Button variant="raised" color="primary" className={classes.button} onClick={onSelect}>Select</Button>
            </Paper>
        </div>);
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(PaperSheet);
