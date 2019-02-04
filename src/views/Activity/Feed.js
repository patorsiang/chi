import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import Unregist from '../../components/main/unregist'
import { Grid, Fab } from '@material-ui/core/'
import { isMobile } from "react-device-detect";
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Portrait';
import LocIcon from '@material-ui/icons/WhereToVote';
import EventIcon from '@material-ui/icons/Event';
import ArtIcon from '@material-ui/icons/Collections';
import ConsumeIcon from '@material-ui/icons/LocalDining';
import OtherIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip';
import PubPost from '../../components/diary/pubpost'
import img from '../../assets/world_her.png';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '64px',
        alignItems: 'flex-start !important',
    },
    rootmod: {
        flexGrow: 1,
    },
    main:{
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
                    isMobile ?
                    <div className={classes.rootmod}>
                            <Grid container spacing={16} className={classes.main}>
                            <Grid item xs={12} align='center'>
                            <Tooltip title="Person" aria-label="Person" >
                                <Fab variant="contained" color="secondary" size="small" className={classes.fab}> <PersonIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Location" aria-label="Location" >
                                <Fab variant="contained" color="secondary" size="small" className={classes.fab}> <LocIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Event" aria-label="Event">
                                <Fab variant="contained" color="secondary" size="small" className={classes.fab}> <EventIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Art" aria-label="Art">
                                <Fab variant="contained" color="secondary" size="small" className={classes.fab}> <ArtIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Consume_Good" aria-label="Consume_Good">
                                <Fab variant="contained" color="secondary" size="small" className={classes.fab}> <ConsumeIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="World_Heritage" aria-label="World_Heritage">
                                <Fab variant="contained" color="secondary" size="small" className={classes.fab}> 
                                    <img className={classes.img} alt="complex" src= {img} /> 
                                </Fab>
                            </Tooltip>
                            <Tooltip title="Other" aria-label="Other">
                                <Fab variant="contained" color="secondary" size="small" className={classes.fab}> 
                                    <OtherIcon />
                                </Fab>
                            </Tooltip>
                            </Grid>
                                <PubPost sz={12} like={true} book={true}/>
                            </Grid>
                        </div> :
                        <div className={classes.root}>
                            <Grid container spacing={24} className={classes.main}>
                            <Grid item xs={12} align='center'>
                            <Tooltip title="Person" aria-label="Person">
                                <Fab variant="contained" color="secondary" size="big" className={classes.fab}> <PersonIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Location" aria-label="Location">
                                <Fab variant="contained" color="secondary" size="big" className={classes.fab}> <LocIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Event" aria-label="Event">
                                <Fab variant="contained" color="secondary" size="big" className={classes.fab}> <EventIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Art" aria-label="Art">
                                <Fab variant="contained" color="secondary" size="big" className={classes.fab}> <ArtIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Consume_Good" aria-label="Consume_Good">
                                <Fab variant="contained" color="secondary" size="big" className={classes.fab}> <ConsumeIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="World Heritage" aria-label="World_Heritage">
                                <Fab color="secondary" size="big" className={classes.fab}> 
                                    <img className={classes.img} alt="complex" src= {img} /> 
                                </Fab>
                            </Tooltip>
                            <Tooltip title="Other" aria-label="Other">
                                <Fab variant="contained" color="secondary" size="big" className={classes.fab}> 
                                    <OtherIcon />
                                </Fab>
                            </Tooltip>
                            </Grid>
                                {post.map(postData => <PubPost sz={4} like={true} love={true} book={true} booked={true} post={postData} />)}
                            </Grid>
                        </div>
                    : <Unregist name='Feed' />}
            </Home>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        post: state.map.post,
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Feed))
