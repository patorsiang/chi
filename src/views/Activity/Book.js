import React, { Component } from 'react'
import Home from '../../layouts/Home'
import Unregist from '../../components/main/unregist'
import { Grid } from '@material-ui/core/'
import { isMobile } from "react-device-detect";
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom'
const styles = theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '6%',
      marginBottom: '2.5%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '20%',
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
    // const { booklist } = this.state
    const { classes, changeMenu, book } = this.props
    // console.log(book);

    return (
      <Home>
        {this.props.auth.uid ?
          isMobile ?
            <div className={classes.rootmod}>
              <Grid container spacing={16}>
                {book.map((b, i) =>
                  <Grid item xs={6} key={i}>
                    <Link to='/acheive'>
                      <ButtonBase className={classes.button} onClick={() => changeMenu('/acheive')}>
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
                      <ButtonBase className={classes.button} onClick={() => changeMenu('/acheive')}>
                        <img className={classes.img} alt={b.data.title} src={b.data.photo[0]} />
                      </ButtonBase>
                    </Link>
                  </Grid>)}
              </Grid>
            </div>
          : <Unregist name='Book' />}
      </Home>
    )
  }
}

export default withStyles(styles)(Book)
