import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Button } from 'reactstrap';
import { Element, scroller } from 'react-scroll'
import Post from '../diary/pubpost'
import { isMobile } from 'react-device-detect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { changeState, loadPost } from '../../store/actions/appAction'
import { connect } from 'react-redux'

const styles = theme => ({
    state: {
        width: "100%",
        color: 'black',
        [theme.breakpoints.up('sm')]: {
            marginTop: '30%',
            width: 'auto',
            marginBottom: '15%',
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
        this.props.changeState(s)
        this.props.loadPost()
    }

    render() {
        // const { classes, post } = this.props;
        const { classes, INstate, post, isLoaded } = this.props;
        return (
            <Fragment>
                <Element name="section_detail" />
                <div className={classes.state}>
                    {INstate.map((s, i) => i === 0 ? <b key={i}>{s}<br /></b> : <Button color='link' key={i} onClick={() => { this.handleClick(s) }}>{s}<br /></Button>)}
                    {isLoaded ? <Fragment><FontAwesomeIcon icon="spinner" spin /> Loading...</Fragment> : null}
                    {/* {["default","inherit","primary","secondary"].} */}
                </div>
                {isMobile ?
                    <div className={classes.state}>
                        {post.map((postData, i) => <Post key={i} no={i} post={postData} />)}
                    </div> :
                    post.map((postData, i) => <Post key={i} no={i} post={postData} />)
                }
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeState: state => dispatch(changeState(state)),
        loadPost: () => dispatch(loadPost()),
    }
}

export default withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(Detail))