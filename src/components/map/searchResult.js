import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { scroller } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = theme => ({
    state: {
        width: "100%",
        color: 'black',
        textAlign: 'right',
        [theme.breakpoints.up('sm')]: {
            marginTop: '9%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '30%',
        },
        fontSize: '16px bold'
    }
})

class Result extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        scroller.scrollTo('section_map', {
            duration: 1000,
            delay: 100,
            smooth: true,
            offset: 0, // Scrolls to element + 50 pixels down the page
        })
    }

    handleClick() {
        scroller.scrollTo('section_detail', {
            duration: 1000,
            delay: 100,
            smooth: true,
            offset: 0, // Scrolls to element + 50 pixels down the page
        })
    }
    render() {
        const { classes, INstate, search } = this.props;
        return (
            <Fragment>
                {search ? <div className={classes.state}>
                    Search = '{search}' with {INstate[0] === '' ? 0 : INstate.length} Result(s) <Button color='link' onClick={() => { this.handleClick() }}><FontAwesomeIcon icon={['fas', 'arrow-right']} /><br /></Button>
                </div> : null}
            </Fragment>
        )
    }
}

Result.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        INstate: state.app.stateOfIN,
        search: state.app.search,
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Result))