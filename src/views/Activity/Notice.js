import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import Unregist from '../../components/main/unregist'
import { withStyles } from '@material-ui/core/styles';
import Notification from '../../components/notify/notification'
import { isMobile } from 'react-device-detect'
import { initial } from '../../store/actions/notiAction'
import { List, ListSubheader } from '@material-ui/core';
import { changeMenu } from "../../store/actions/mapAction";

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

  componentDidMount() {
    this.props.changeMenu('/notice')
  }

  componentWillMount() {
    this.props.initial()
  }

  render() {
    const { classes, noti } = this.props

    return (
      <Home>
        {this.props.auth.uid ?
          isMobile ?
            <List component="nav" className={classes.mobileroot} subheader={<ListSubheader component="div" align="left">Notification</ListSubheader>}>
              <Notification noti={noti} />
            </List>
            : <List component="nav" className={classes.root} subheader={<ListSubheader component="div" align="left">Notification</ListSubheader>}>
              <Notification noti={noti} />
            </List>
          : <Unregist name='Notice' />}
      </Home>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    noti: state.noti.noti
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initial: () => dispatch(initial()),
    changeMenu: Menu => dispatch(changeMenu(Menu)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Notice))
