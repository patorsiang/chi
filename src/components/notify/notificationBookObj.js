import React, { Component } from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { withStyles } from '@material-ui/core/styles';
// import { connect } from 'react-redux'
import Avatar from 'react-avatar'
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
                <ListItem button className={classes.list} key={data.id} onClick={(event) => this.handleChange(event, data.data.linked)}>
                    <ListItemIcon>
                        <BookmarkIcon />
                    </ListItemIcon>
                    <ListItemText primary={data.data.content} secondary={data.data.date} />
                    <Avatar name={data.data.name} size="40" src={data.data.photo} />
                </ListItem>
            </Link>
        )
    }

}

export default withStyles(styles, { withTheme: true })(notiObj)
