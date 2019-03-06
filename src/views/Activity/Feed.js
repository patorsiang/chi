import React, { Component } from 'react'
import Home from '../../layouts/Home'
// import { connect } from 'react-redux'
import Unregist from '../../components/main/unregist'
import { Grid } from '@material-ui/core/'
import { isMobileOnly, isTablet } from "react-device-detect";
import { withStyles } from '@material-ui/core/styles';
import Choice from '../../components/feed/themeChoice'
import Post from '../../components/diary/pubpost'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '64px',
        alignItems: 'flex-start !important',
    },
    rootmod: {
        flexGrow: 1,
    },
    main: {
        [theme.breakpoints.up('sm')]: {
            marginTop: '8.5%',
            marginBottom: '2.5%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '20%',
            marginBottom: '20%',
        },
    },
    fab: {
        margin: theme.spacing.unit,
        backgroundColor: '#FF9933',
        borderColor: '#FF9933',
        '&:hover': {
            backgroundColor: '#FF6600',
            borderColor: '#FF6600',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(255,153,102,.5)',
        },
    },
    img: {
        width: 'auto',
        height: 'auto',
        margin: 'center',
        display: 'block',
        maxWidth: '50%',
        maxHeight: '50%',
    },
});

class Feed extends Component {
    render() {
        const { classes, post } = this.props

        return (
            <Home>
                {this.props.auth.uid ?
                    isMobileOnly ?
                        <div className={classes.rootmod}>
                            <Grid container spacing={16} className={classes.main}>
                                <Choice s={"small"} />
                            </Grid>
                            <Grid container spacing={24} >
                                {post.map((postData, i) => <Post key={i} no={i} sz={12} post={postData} />)}
                            </Grid>
                        </div> :
                        isTablet ? 
                            <div className={classes.rootmod}>
                                <Grid container spacing={16} className={classes.main}>
                                    <Choice s={"small"} />
                                </Grid>
                                <Grid container spacing={24} >
                                    {post.map((postData, i) => <Post key={i} no={i} sz={6} post={postData} />)}
                                </Grid>
                            </div> :
                        <div className={classes.root}>
                            <Grid container spacing={24} className={classes.main}>
                                <Choice s={"large"} />
                            </Grid>
                            <Grid container spacing={24} >
                                {post.map((postData, i) => <Post key={i} no={i} sz={4} post={postData} />)}
                            </Grid>
                        </div>
                    : <Unregist name='Feed' />}
            </Home>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Feed)
