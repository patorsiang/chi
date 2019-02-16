import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import Unregist from '../../components/main/unregist'
import { Grid } from '@material-ui/core/'
import { isMobile } from "react-device-detect";
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { getBook } from '../../store/actions/bookAction'
import { changeMenu } from '../../store/actions/mapAction'
import { Link } from 'react-router-dom'
const styles = theme => ({
  root: {
    marginTop: '3%',
    flexGrow: 1,
    marginLeft: '64px',
  },
  rootmod: {
    marginTop: '5%',
    flexGrow: 1,
  },
  button: {
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',

  },
});


class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booklist: null
    }
  }

  componentWillMount() {
    this.props.getBook()
  }

  componentDidUpdate() {
    if (this.props.book.length > 0) {
      window.localStorage.setItem('book', JSON.stringify(this.props.book))
    }
    if (!this.state.booklist) {
      this.setState({
        booklist: JSON.parse(window.localStorage.getItem('book'))
      })
    }
  }

  render() {
    const { booklist } = this.state
    const { classes, changeMenu } = this.props
    return (
      <Home>
        {this.props.auth.uid ?
          isMobile ?
            <div className={classes.rootmod}>
              <Grid container spacing={16}>
                {booklist ? booklist.map((b, i) =>
                  <Grid item xs={6} key={i}>
                    <Link to='/acheive'>
                      <ButtonBase className={classes.button} onClick={() => changeMenu('/acheive')}>
                        <img className={classes.img} alt="complex" src={b.data.photo[0]} />
                      </ButtonBase>
                    </Link>
                  </Grid>) : null}
              </Grid>
            </div> :
            <div className={classes.root}>
              <Grid container spacing={24}>
                {booklist ? booklist.map((b, i) =>
                  <Grid item xs={3} key={i}>
                    <Link to='/acheive'>
                      <ButtonBase className={classes.button} onClick={() => changeMenu('/acheive')}>
                        <img className={classes.img} alt="complex" src={b.data.photo[0]} />
                      </ButtonBase>
                    </Link>
                  </Grid>) : null}
              </Grid>
            </div>
          : <Unregist name='Book' />}
      </Home>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    book: state.book.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBook: () => dispatch(getBook()),
    changeMenu: (S) => dispatch(changeMenu(S))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Book))
