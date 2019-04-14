import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { Grid } from '@material-ui/core/'
import { isMobile } from "react-device-detect";
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getBook } from '../../store/actions/appAction'

const styles = theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '10%',
      marginBottom: '2.5%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '25%',
      marginBottom: '20%',
    },
    marginTop: '3%',
    flexGrow: 1,
    marginLeft: '64px',
  },
  rootmod: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '6%',
      marginBottom: '2.5%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '20%',
      marginBottom: '20%',
    },
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

  componentWillMount() {
    this.props.getBook()
  }

  render() {
    const { classes, book } = this.props

    return (
      <Home>
          {isMobile ?
            <div className={classes.rootmod}>
              <Grid container spacing={16}>
                {book.map((b, i) =>
                  <Grid item xs={6} key={i}>
                    <Link to='/acheive'>
                      <ButtonBase className={classes.button}>
                        <img className={classes.img} alt={b.data.title} src={b.data.photo[0]} />
                      </ButtonBase>
                    </Link>
                  </Grid>)}
              </Grid>
            </div> :
            <div className={classes.root}>
              <Grid container spacing={24}>
                {book.map((b, i) =>
                  <Grid item xs={3} key={i}>
                    <Link to='/acheive'>
                      <ButtonBase className={classes.button}>
                        <img className={classes.img} alt={b.data.title} src={b.data.photo[0]} />
                      </ButtonBase>
                    </Link>
                  </Grid>)}
              </Grid>
            </div>}
      </Home>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    book: state.app.book,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBook: () => dispatch(getBook())
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Book))
