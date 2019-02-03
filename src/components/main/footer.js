import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom'
import { changeMenu } from "../../store/actions/mapAction";
import { connect } from 'react-redux'

const styles = {
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: 'rgb(162,224,120)',
        color: 'green',
        fontSize: '1.5em',
    },
    choice: {
        minWidth: '0 !important',
        padding: '0 !important',
    }
}

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.Menu,
        }
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
                <BottomNavigationAction className={classes.choice} label="Map" value="/" icon={<FontAwesomeIcon icon={['fas', 'map-marked-alt']} />} />
                <BottomNavigationAction className={classes.choice} label="Diary" value="/diary" icon={<FontAwesomeIcon icon={['fas', 'file-signature']} />} />
                <BottomNavigationAction className={classes.choice} label="Feed" value="/feed" icon={<FontAwesomeIcon icon={['fas', 'newspaper']} />} />
                <BottomNavigationAction className={classes.choice} label="Bookmark" value="/bookmark" icon={<FontAwesomeIcon icon={['fas', 'bookmark']} />} />
                <BottomNavigationAction className={classes.choice} label="Notice" value="/notice" icon={<FontAwesomeIcon icon={['fas', 'bell']} />} />
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMenu: Menu => dispatch(changeMenu(Menu))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Footer))

