import React, { Component } from 'react'
import { Grid, Fab } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Portrait';
import LocIcon from '@material-ui/icons/WhereToVote';
import EventIcon from '@material-ui/icons/Event';
import ArtIcon from '@material-ui/icons/Collections';
import ConsumeIcon from '@material-ui/icons/LocalDining';
import OtherIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip';
import img from '../../assets/world_her.png';
import AllIcon from '@material-ui/icons/AllInclusive'
import { connect } from 'react-redux'
import { searchByTheme, loadPost } from "../../store/actions/appAction";

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
    active: {
        margin: theme.spacing.unit,
        backgroundColor: '#FF6600',
        borderColor: '#FF6600',
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

class Choice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            choice: this.props.choice
        }
    }

    componentWillMount() {
        this.props.searchByTheme("ALL")
        this.setState({
            choice: "ALL"
        })
        this.props.loadPost()
    }

    changeChoice(choice) {
        this.props.searchByTheme(choice)
        this.setState({
            choice
        })
        this.props.loadPost()
    }

    render() {
        const { classes, s } = this.props
        const { choice } = this.state

        return (
            <Grid item xs={12} align='center'>
                {choice === 'ALL' ?
                    <Tooltip title="All" aria-label="All">
                        <Fab variant="round" color="secondary" size={s} className={classes.active} > <AllIcon /> </Fab>
                    </Tooltip> : <Tooltip title="All" aria-label="All" onClick={() => this.changeChoice("ALL")}>
                        <Fab variant="round" color="secondary" size={s} className={classes.fab}> <AllIcon /> </Fab>
                    </Tooltip>}
                {choice === 'PERSON' ?
                    <Tooltip title="Person" aria-label="Person">
                        <Fab variant="round" color="secondary" size={s} className={classes.active}> <PersonIcon /> </Fab>
                    </Tooltip>
                    : <Tooltip title="Person" aria-label="Person" onClick={() => this.changeChoice("PERSON")}>
                        <Fab variant="round" color="secondary" size={s} className={classes.fab}> <PersonIcon /> </Fab>
                    </Tooltip>}
                {choice === 'LOCATION' ?
                    <Tooltip title="Location" aria-label="Location" >
                        <Fab variant="round" color="secondary" size={s} className={classes.active}> <LocIcon /> </Fab>
                    </Tooltip>
                    : <Tooltip title="Location" aria-label="Location" onClick={() => this.changeChoice("LOCATION")}>
                        <Fab variant="round" color="secondary" size={s} className={classes.fab}> <LocIcon /> </Fab>
                    </Tooltip>}
                {choice === 'EVENT' ?
                    <Tooltip title="Event" aria-label="Event" >
                        <Fab variant="round" color="secondary" size={s} className={classes.active}> <EventIcon /> </Fab>
                    </Tooltip>
                    : <Tooltip title="Event" aria-label="Event" onClick={() => this.changeChoice("EVENT")}>
                        <Fab variant="round" color="secondary" size={s} className={classes.fab}> <EventIcon /> </Fab>
                    </Tooltip>}
                {choice === 'WORK_OF_ART' ?
                    <Tooltip title="Work_of_Art" aria-label="Work_of_Art" >
                        <Fab variant="round" color="secondary" size={s} className={classes.active}> <ArtIcon /> </Fab>
                    </Tooltip>
                    : <Tooltip title="Work_of_Art" aria-label="Work_of_Art" onClick={() => this.changeChoice("WORK_OF_ART")}>
                        <Fab variant="round" color="secondary" size={s} className={classes.fab}> <ArtIcon /> </Fab>
                    </Tooltip>}
                {choice === 'CONSUMER_GOOD' ?
                    <Tooltip title="Consume_Good" aria-label="Consume_Good" >
                        <Fab variant="round" color="secondary" size={s} className={classes.active}> <ConsumeIcon /> </Fab>
                    </Tooltip>
                    : <Tooltip title="Consume_Good" aria-label="Consume_Good" onClick={() => this.changeChoice("CONSUMER_GOOD")}>
                        <Fab variant="round" color="secondary" size={s} className={classes.fab}> <ConsumeIcon /> </Fab>
                    </Tooltip>}
                {choice === 'ORGANIZATION' ?
                    <Tooltip title="World_Heritage" aria-label="World_Heritage" >
                        <Fab variant="round" color="secondary" size={s} className={classes.active}>
                            <img className={classes.img} alt="complex" src={img} />
                        </Fab>
                    </Tooltip>
                    : <Tooltip title="World_Heritage" aria-label="World_Heritage" onClick={() => this.changeChoice("ORGANIZATION")}>
                        <Fab variant="round" color="secondary" size={s} className={classes.fab}>
                            <img className={classes.img} alt="complex" src={img} />
                        </Fab>
                    </Tooltip>}
                {choice === 'OTHER' ?
                    <Tooltip title="Other" aria-label="Other">
                        <Fab variant="round" color="secondary" size={s} className={classes.active}>
                            <OtherIcon />
                        </Fab>
                    </Tooltip>
                    : <Tooltip title="Other" aria-label="Other" onClick={() => this.changeChoice("OTHER")}>
                        <Fab variant="round" color="secondary" size={s} className={classes.fab}>
                            <OtherIcon />
                        </Fab>
                    </Tooltip>}
            </Grid>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchByTheme: state => dispatch(searchByTheme(state)),
        loadPost: () => dispatch(loadPost()),
    }
}

export default withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(Choice))
