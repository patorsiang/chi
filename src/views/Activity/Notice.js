import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Notification from '../../components/notify/notification'
import { isMobile } from 'react-device-detect'
import { List, ListSubheader } from '@material-ui/core';
import { getnoti } from '../../store/actions/appAction'

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
    width: '70%',
    backgroundColor: theme.palette.background.paper,
    marginLeft: '64px',
  },
  mobileroot: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '6%',
      marginBottom: '2.5%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '20%',
      marginBottom: '20%',
    },
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});
class Notice extends Component {

  componentDidUpdate(){
    this.props.getnoti()
  }

  render() {
    const { classes, noti } = this.props
    
    return (
      <Home>
        {isMobile ?
            <List component="nav" className={classes.mobileroot} subheader={<ListSubheader component="div" align="left">Notification</ListSubheader>}>
              <Notification noti={noti} />
            </List>
            : <List component="nav" className={classes.root} subheader={<ListSubheader component="div" align="left">Notification</ListSubheader>}>
              <Notification noti={noti} />
            </List>}
      </Home>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    noti: state.app.noti
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getnoti: () => dispatch(getnoti()),
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Notice))
