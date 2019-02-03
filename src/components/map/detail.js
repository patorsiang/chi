import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
//import map from '../assets/map.svg';
import { withStyles } from '@material-ui/core/styles';
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { changeState } from '../../store/actions/mapAction'
import { Element, scroller } from 'react-scroll'
import Post from '../diary/pubpost'
import { isMobile } from 'react-device-detect'
const styles = theme => ({
    state: {
        width: "100%",
        color: 'black',
        [theme.breakpoints.up('sm')]: {
            marginTop: '45%',
            width: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: '20%',
            width: 'auto',
        },
    }
})

class Detail extends Component {
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

    handleClick(s) {
        this.props.changeState(s);
    }
    
    render() {
        const { classes, valueState, post } = this.props;

        return (
            <Fragment>
                <Element name="section_detail" />
                <div className={classes.state}>
                    {valueState.map((s, i) => i === 0 ? <b key={i}>{s}<br /></b> : <Button color='link' key={i} onClick={() => { this.handleClick(s) }}>{s}<br /></Button>)}
                </div>
                {isMobile ?
                    <div className={classes.state}>
                    {console.log(post)}
                        {post.map((postData, i) => <Post key={i} no={i} post={postData} />)}
                    </div> :
                    post.map((postData, i) => <Post key={i} no={i} post={postData} />)}
            </Fragment>
        )
    }
}

Map.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        valueState: state.map.valueState,
        post: state.map.post,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeState: valueState => dispatch(changeState(valueState))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Detail))