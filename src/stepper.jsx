import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from './paper';
import Select from './select';
import Form from './form';

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

function getSteps() {
    return ['Select a rule', 'Apply filter criteria', 'Configure the rule'];
}

function getStepContent(step, handleNext, selectedRow) {
    switch (step) {
    case 0:
        return (
            <div>
                <Paper title="OID/PCC Management" description="Configure Office Id and PCC management rules." onSelect={handleNext} />
                <Paper title="Ticketing delays." description="Configures all the blah blah related rules." onSelect={handleNext} />
                <Paper title="Beta Management" description="Lorem ipsum blah blah lorem impusj alha betea gamma delta." onSelect={handleNext} />
            </div>
        );
    case 1:
        return (
            <div>
                <Select onSelect={handleNext} />
            </div>
        );
    case 2:
        return (<Form definition={selectedRow} />);
    default:
        return 'Unknown step';
    }
}

class HorizontalLinearStepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
        };

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleNext(selectedRow) {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1,
            selectedRow,
        });
    }

    handleBack() {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep, selectedRow } = this.state;

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => {
                        const props = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...props}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {getStepContent(activeStep, this.handleNext, selectedRow)}
                    <div>
                        <br />
                        <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

HorizontalLinearStepper.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HorizontalLinearStepper);
