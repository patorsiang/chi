import React, { Component } from 'react'
// import { connect } from 'react-redux'
import Home from '../../layouts/Home'
import Unregist from '../../components/main/unregist'
import { Grid, Fab, Tooltip } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles';
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import PriPost from '../../components/diary/pripost'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '64px',
        alignItems: 'flex-start !important',
    },
    rootmod: {
        flexGrow: 1,
    },
    add: {
        fontSize: '2em'
    },
    main: {
        [theme.breakpoints.up('sm')]: {
            marginTop: '6%',
            marginBottom: '2.5%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '20%',
            marginBottom: '20%',
        },
    },
    fab: {
        margin: theme.spacing.unit * 2,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },

});

class Diary extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    render() {
        const { classes, diary } = this.props

        return (
            <Home>
                {this.props.auth.uid ?
                    isMobile ?
                        <div className={classes.rootmod}>
                            <Grid container spacing={16} className={classes.main}>
                                <Grid item xs={12} align='right'>
                                    <Link to='/diary/create'>
                                        <Tooltip title="Add" aria-label="Add" onClick={() => { this.props.changeMenu("/diary/create"); }}>
                                            <Fab size="small" color="primary" align="right" className={classes.fab}>
                                                <AddIcon />
                                            </Fab>
                                        </Tooltip>
                                    </Link>
                                </Grid>
                                <PriPost diary={diary} />
                            </Grid>
                        </div> :
                        <div className={classes.root}>
                            <Grid container spacing={24} className={classes.main}>
                                <Grid item xs={12} align='right'>
                                    <Link to='/diary/create'>
                                        <Tooltip title="Add" aria-label="Add" onClick={() => { this.props.changeMenu("/diary/create"); }}>
                                            <Fab size="big" color="primary" align="right" className={classes.fab}>
                                                <AddIcon />
                                            </Fab>
                                        </Tooltip>
                                    </Link>
                                </Grid>
                                <PriPost diary={diary} />
                            </Grid>
                        </div>
                    : <Unregist name='Diary' />}
            </Home>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Diary)
