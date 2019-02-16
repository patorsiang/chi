import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Badge, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom'
import { changeMenu } from "../../store/actions/mapAction";
import { connect } from 'react-redux'
import { getNotiNum } from '../../store/actions/notiAction'
// import Background from '../../assets/bg.jpg'

const styles = {
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: 'rgb(98,12,7)',
        // backgroundImage: `url( ${Background} )`,
        fontSize: '1.5em',
    },
    choice: {
        color: 'white',
        minWidth: '0 !important',
        padding: '0 !important',
        "&$selected": {
            color: 'rgb(233,176,106)',
        }
    },
    selected: {
        color: 'rgb(233,176,106)',
    }
}

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.Menu,
        }
    }

    componentWillMount() {
        this.props.getNotiNum()
    }

    handleChange = (event, value) => {
        this.setState({ value })
        this.props.changeMenu(value)
    };

    renderRedirect = (value) => {
        if (value !== window.location.pathname) {
            return <Redirect to={value} />
        }
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <BottomNavigation value={value} onChange={this.handleChange} className={classes.root} showLabels>
                {this.renderRedirect(value)}
                <BottomNavigationAction
                    classes={{
                        root: classes.choice,
                        selected: classes.selected
                    }} label="Map" value="/" icon={<FontAwesomeIcon icon={['fas', 'map-marked-alt']} />} />
                <BottomNavigationAction classes={{
                    root: classes.choice,
                    selected: classes.selected
                }} label="Diary" value="/diary" icon={<FontAwesomeIcon icon={['fas', 'file-signature']} />} />
                <BottomNavigationAction classes={{
                    root: classes.choice,
                    selected: classes.selected
                }} label="Feed" value="/feed" icon={<FontAwesomeIcon icon={['fas', 'newspaper']} />} />
                <BottomNavigationAction classes={{
                    root: classes.choice,
                    selected: classes.selected
                }} label="Bookmark" value="/bookmark" icon={<FontAwesomeIcon icon={['fas', 'bookmark']} />} />
                <BottomNavigationAction classes={{
                    root: classes.choice,
                    selected: classes.selected
                }} label="Notice" value="/notice" icon={this.props.num > 0 ? <Badge badgeContent={this.props.num} color="secondary"><FontAwesomeIcon icon={['fas', 'bell']} /></Badge> : <FontAwesomeIcon icon={['fas', 'bell']} />} />
            </BottomNavigation>
        )
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        Menu: state.map.Menu,
        num: state.noti.num
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMenu: Menu => dispatch(changeMenu(Menu)),
        getNotiNum: () => dispatch(getNotiNum())
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Footer))

