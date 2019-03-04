import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from '../../layouts/Home'
import Unregist from '../main/unregist'
import { withStyles } from '@material-ui/core/styles';
import { isMobile } from "react-device-detect";
import PropTypes from 'prop-types';
import EditForm from "./form2";

const styles = theme => ({
    colorSwitchBase: {
        '&$colorChecked': {
            color: '#FF9933',
            '& + $colorBar': {
                backgroundColor: '#FF9933',
            },
        },
    },
    colorBar: {},
    colorChecked: {},
    root: {
        flexGrow: 1,
        marginLeft: '64px',
        alignItems: 'flex-start !important',
        
    },
    rootmod: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: 'navy',
        backgroundColor: '#FFFFCC',
    },
    add: {
        fontSize: '2em'
    }
});

class Edit extends Component {
    state = {
        public: false,
        text: 'private'
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        if (event.target.checked) {
            this.setState({ text: 'public' })
        } else {
            this.setState({ text: 'private' })
        }
    };
    render() {
        const { classes } = this.props
        return (
            <Home>
                {this.props.auth.uid ?
                    isMobile ?
                        <div className={classes.rootmod}>
                            <EditForm/>
                        </div> :
                        <div className={classes.root}>
                            <EditForm/>
                        </div>
                    : <Unregist name='Diary' />}
            </Home>
        )
    }
}

Edit.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Edit))
