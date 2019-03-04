import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

const styles = theme => ({
    err: {
        color: 'Red',
        fontSize: '14px',
        marginTop: '5%'
    },
    suc: {
        color: 'Green',
        fontSize: '14px',
        marginTop: '5%'
    }
})


class errMessage extends Component {
    render() {
        const { classes, err, suc } = this.props
        return (
            <Fragment>
                {suc ? <p className={classes.suc}> {suc} </p> :null}
                {err ? <p className={classes.err}> {err} </p> : null}
            </Fragment>
        )
    }
}

errMessage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(errMessage)