import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from '../../layouts/Home'
import { Grid, Fab, Tooltip } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles';
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import PriPost from '../../components/diary/pripost'
import { getDiary } from "../../store/actions/appAction";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            marginTop: '15%',
            marginBottom: '2.5%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '30%',
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

    componentWillMount(){
        this.props.getDiary()
    }

    render() {
        const { classes, diary } = this.props
        return (
            <Home>
                {isMobile ?
                    <div className={classes.rootmod}>
                        <Grid container spacing={16} className={classes.main}>
                            <Grid item xs={12} align='right'>
                                <Link to='/diary/create'>
                                    <Tooltip title="Add" aria-label="Add">
                                        <Fab size="small" color="primary" align="right" className={classes.fab}>
                                            <AddIcon />
                                        </Fab>

                                    </Tooltip>
                                </Link>
                            </Grid>
                            {/* {isLoaded ?
                                <div className={classes.text}>
                                    <FontAwesomeIcon icon="spinner" spin /> Loading...
                                </div>
                                : <PriPost diary={diary} />} */}
                            <PriPost diary={diary} />
                        </Grid>
                    </div> :
                    <div className={classes.root}>
                        <Grid container spacing={24} className={classes.main}>
                            <Grid item xs={12} align='right'>
                                <Link to='/diary/create'>
                                    <Tooltip title="Add" aria-label="Add">
                                        <Fab size="large" color="primary" align="right" className={classes.fab}>
                                            <AddIcon />
                                        </Fab>
                                    </Tooltip>
                                </Link>
                            </Grid>
                            {/* {isLoaded ?
                                <div className={classes.text}>
                                    <FontAwesomeIcon icon="spinner" spin /> Loading...
                                </div>
                                : <PriPost diary={diary} />} */}
                            <PriPost diary={diary} />
                        </Grid>
                    </div>}
            </Home>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        diary: state.app.diary,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDiary: () => dispatch(getDiary())
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Diary))
