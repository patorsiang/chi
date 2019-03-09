import React, { Component, Fragment } from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import Unregist from '../../components/main/unregist'
import { Grid } from '@material-ui/core/'
import { isMobile } from "react-device-detect";
import { withStyles } from '@material-ui/core/styles';
import Post from '../../components/diary/pubpost'
const styles = theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            marginTop: '6%',
            marginBottom: '2.5%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '20%',
            marginBottom: '20%',
        },
        marginTop: '10%',
        flexGrow: 1,
        marginLeft: '64px',
    },
    rootmod: {
        [theme.breakpoints.up('sm')]: {
            marginTop: '6%',
            marginBottom: '2.5%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '20%',
            marginBottom: '20%',
        },
        marginTop: '10%',
        flexGrow: 1,
    },
    button: {
        height: '100%',
    },
    img: {
        width: '100%',
        height: '100%',

    },
});


class Acheive extends Component {
    render() {
        const { classes, book } = this.props
        return (
            <Home>
                {this.props.auth.uid ?
                    isMobile ?
                        <div className={classes.rootmod}>
                            <Grid container spacing={16}>
                                {book.map((b, i) =>
                                    <Post sz={12} key={i} no={i} post={b} />)}
                            </Grid>
                        </div> :
                        <div className={classes.root}>
                            <Grid container spacing={24}>
                                {book.map((b, i) =>
                                    <Fragment>
                                        <Grid item xs={3}></Grid>
                                        <Post sz={6} key={i} no={i} post={b} />
                                        <Grid item xs={3}></Grid>
                                    </Fragment>)}
                            </Grid>
                        </div>
                    : <Unregist name='Book' />}
            </Home>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        book: state.app.book,
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Acheive))
