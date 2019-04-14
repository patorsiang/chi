import React, { Component, Fragment } from 'react'
import portrait from '../../assets/test_Portrait.png'
import landscrape from '../../assets/test_Landscrape.png'
import { isMobile, } from "react-device-detect";
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
    button: {
        fillOpacity: 0
    },
})

class Landing extends Component {
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                {isMobile ?
                    <svg
                        width="100%" height="100%"
                        viewBox="0 0 1008 1344"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <image xlinkHref={portrait} width="100%" height="100%" />
                        <Link to="/map"><circle cx="16%" cy="60%" r="6.5%" className={classes.button} /></Link>
                        <Link to="/feed"><circle cx="51%" cy="60%" r="6.5%" className={classes.button} /></Link>
                        <Link to="/feed"><circle cx="83%" cy="60%" r="6.5%" className={classes.button} /></Link>
                        <Link to="/diary"><circle cx="50%" cy="90%" r="6.5%" className={classes.button} /></Link>
                    </svg>
                    : <svg
                        width="100%" height="100%"
                        viewBox="0 0 2389 1344"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <image xlinkHref={landscrape} width="100%" height="100%" />
                        <Link to="/map"><circle cx="5.5%" cy="50%" r="5%" className={classes.button} /></Link>
                        <Link to="/feed"><circle cx="15.75%" cy="50%" r="5%" className={classes.button} /></Link>
                        <Link to="/feed"><circle cx="26.5%" cy="50%" r="5%" className={classes.button} /></Link>
                        <Link to="/diary"><circle cx="93.5%" cy="50%" r="6.5%" className={classes.button} /></Link>
                    </svg>
                }
            </Fragment >
        )
    }
}

export default withStyles(styles, { withTheme: true })(Landing)