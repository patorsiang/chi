import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { withStyles } from '@material-ui/core/styles';
import { isMobile } from "react-device-detect";
import PropTypes from 'prop-types';
import EditForm from "./form";

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '64px',
        alignItems: 'flex-start !important',

    },
    rootmod: {
        flexGrow: 1,
    },
});

class Edit extends Component {
    render() {
        const { classes } = this.props
        return (
            <Home>
                {isMobile ?
                    <div className={classes.rootmod}>
                        <EditForm />
                    </div> :
                    <div className={classes.root}>
                        <EditForm />
                    </div>}
            </Home>
        )
    }
}

Edit.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Edit)
