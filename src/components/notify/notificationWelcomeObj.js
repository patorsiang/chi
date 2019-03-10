import React, { Component } from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import UserIcon from '@material-ui/icons/SupervisorAccount';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import { checkRead } from '../../store/actions/appAction'

const styles = theme => ({
    list: {
        '&:hover': {
            backgroundColor: '#FFCC99',
            borderColor: '#FFCC99',
        },
    },
    dec: {
        '&:hover': {
            textDecoration: 'none'
        },
    }
});

class notiObj extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, t, id) {
        this.props.checkRead(this.props.data.id)
    }

    render() {
        const { classes, data, profile } = this.props
        return (
            <Link to={data.data.linked} className={classes.dec}>
                <ListItem button className={classes.list} key={data.id} onClick={(event) => this.handleChange(event, data.data.linked)}>
                    <ListItemIcon>
                        <UserIcon />
                    </ListItemIcon>
                    <ListItemText primary={data.data.content} secondary={data.data.date} />
                    <Avatar name={profile.displayName} size="40" src={profile.Photo} />
                </ListItem>
            </Link>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkRead: id => dispatch(checkRead(id)),
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(notiObj))
