import React, { Component } from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FavIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Avatar from 'react-avatar'
import { changeMenu } from "../../store/actions/mapAction";
import { checkRead } from "../../store/actions/notiAction";
import { Link } from 'react-router-dom'

const styles = theme => ({
    list: {
        '&:hover': {
            backgroundColor: '#FFCC99',
            borderColor: '#FFCC99',
        },
    },
    img: {
        width: 'auto',
        height: 'auto',
        margin: 'right',
        display: 'block',
        maxWidth: '20%',
        maxHeight: '20%%',
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
        this.state = {
            value: this.props.Menu,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, t, id) {
        this.setState({ value: t });
        this.props.changeMenu(t)
        this.props.checkRead(this.props.data.id)
    }

    render() {
        const { classes, data } = this.props

        return (
            <Link to={data.data.linked} className={classes.dec}>
                <ListItem button className={classes.list} onClick={(event) => this.handleChange(event, data.data.linked)}>
                    <ListItemIcon>
                        <FavIcon />
                    </ListItemIcon>
                    <ListItemText primary={data.data.content} secondary={data.data.date} />
                    <Avatar name={data.data.name} size="40" src={data.data.photo} />
                </ListItem>
            </Link>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        Menu: state.map.Menu,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMenu: Menu => dispatch(changeMenu(Menu)),
        checkRead: Id => dispatch(checkRead(Id)),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(notiObj))
