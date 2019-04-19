import React, { Component, Fragment } from 'react'
import Home from '../../layouts/Home'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
class unregist extends Component {

    render() {
        const { auth } = this.props
        const { func } = this.props.match.params
        return (
            <Home>
                {auth.uid ? <Redirect to={`/${func.toLowerCase()}`}/> : null}
                <Fragment> {func} is not available for unregister please <Link to='/upin'><Button color='success'>signup</Button></Link></Fragment>
            </Home>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(unregist);
