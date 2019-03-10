import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Badge, Icon, Drawer, MenuItem, Menu, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, InputBase, Button } from '@material-ui/core';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Search as SearchIcon } from '@material-ui/icons';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Co from '../../components/main/cooperate'
import Avatar from 'react-avatar'
import { isMobile, isTablet } from "react-device-detect";
import Background from '../../assets/bg.jpg'
import { connect } from 'react-redux'
import { signout, searchByState, searchByTag, loadPost, getnoti } from '../../store/actions/appAction'
const drawerWidth = 240;

const styles = theme => ({
  but: {
    marginRight: 12,
  },
  root: {
    display: 'flex',
  },
  logo: {
    width: '2.5rem',
    marginRight: 12,
    marginLeft: 12,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: '#FC3'
    },
    marginRight: theme.spacing.unit * 2,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(98,12,7)'
  },
  inputRoot: {
    color: 'rgb(98,12,7)',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // backgroundColor: 'rgb(162,224,120)'
    backgroundImage: `url( ${Background} )`,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 8,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  icon: {
    fontSize: '0.45em',
    width: 'auto',
    height: 'auto',
  },
  icons: {
    marginRight: '2em'
  },
  loglike: {
    fontWeight: "bold",
    color: "white !important"
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      search: this.props.search,
      anchorEl: null,
      value: this.props.Menu,
    };
  }

  componentDidMount() {
    this.props.getnoti()
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeSearch = event => {
    this.setState({
      search: event.target.value
    })
  };

  searchByState = (e) => {
    if (e.key === 'Enter') {
      this.props.searchByState(this.state.search)
    }
  }

  searchByTag = (e) => {
    if (e.key === 'Enter') {
      this.props.searchByTag(this.state.search);
      this.props.loadPost()
    }
  }

  signout = () => {
    this.props.signout();
    this.setState({ anchorEl: null });
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleProfile = (value) => {
    this.setState({ anchorEl: null });
    this.setState({ value });
  }

  render() {
    const { classes, theme, profile, auth, noti } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <Link to={'/profile'}><MenuItem onClick={this.handleMenuClose}>Profile</MenuItem></Link>
        <Link to={'/Privacy'}><MenuItem onClick={this.handleMenuClose}>Privacy Policy</MenuItem></Link>
        <Link to={'/Terms'}><MenuItem onClick={this.handleMenuClose}>Terms of Service</MenuItem></Link>
        <MenuItem onClick={this.signout}>Sign Out</MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        {/* {window.location.pathname.search('in') === -1 && window.location.pathname.search('up') === -1 ? this.renderRedirect(value) : null} */}
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            {!isTablet && !isMobile && window.location.pathname.search('in') === -1 && window.location.pathname.search('up') === -1 && auth.uid ?
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <MenuIcon />
              </IconButton>
              : null}
            <Typography variant="h6" color="inherit">
              <Link to="/"><img src={logo} alt='CHI' className={classes.logo} /></Link>
            </Typography>
            <div className={classes.search} style={{ width: '100%', marginLeft: 0 }}>
              {window.location.pathname.search('Privacy') === -1 && window.location.pathname.search('Terms') === -1 && window.location.pathname.search('notice') === -1 && window.location.pathname.search('bookmark') === -1 && window.location.pathname.search('bookmark') === -1 && window.location.pathname.search('diary') === -1 && window.location.pathname.search('in') === -1 && window.location.pathname.search('up') === -1 && window.location.pathname.search('profile') === -1 ?
                <Fragment>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  {window.location.pathname.search('feed') === -1 ?
                    <InputBase
                      placeholder={'Search state ... '}
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      value={this.state.search}
                      onChange={this.handleChangeSearch}
                      onKeyPress={this.searchByState}
                    /> :
                    <InputBase
                      placeholder={'Search tag ... '}
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      value={this.state.search}
                      onChange={this.handleChangeSearch}
                      onKeyPress={this.searchByTag}
                    />}
                </Fragment>
                : null}
            </div>
            {auth.uid ?
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
                className={classes.but}
              >
                <Avatar name={profile.displayName} size="45" src={profile.Photo} round={true} />
              </IconButton>
              : window.location.pathname.search('upin') === -1 ?
                <Button color="inherit" className={classes.but}><Link to="/upin" className={classes.loglike}> Login </Link> </Button> : null}
          </Toolbar>
        </AppBar>
        {!isTablet && !isMobile && window.location.pathname.search('in') === -1 && window.location.pathname.search('up') === -1 && auth.uid ?
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {['/', '/diary', '/feed', '/bookmark', '/notice'].map((text, index) => (
                <ListItem button key={text} selected={window.location.pathname === text}>
                  <ListItemIcon>
                    {index === 0 ?
                      <Link to={text}><FontAwesomeIcon icon={['fas', 'map-marked-alt']} className={classes.icons} /></Link> :
                      index === 1 ?
                        <Link to={text}><FontAwesomeIcon icon={['fas', 'file-signature']} className={classes.icons} /></Link> :
                        index === 2 ?
                          <Link to={text}><FontAwesomeIcon icon={['fas', 'newspaper']} className={classes.icons} /></Link> :
                          index === 3 ?
                            <Link to={text}><FontAwesomeIcon icon={['fas', 'bookmark']} className={classes.icons} /></Link> :
                            <Link to={text}>
                              <Badge badgeContent={noti.length} color="secondary" className={classes.icons}>
                                <FontAwesomeIcon icon={['fas', 'bell']} />
                              </Badge></Link>}
                  </ListItemIcon>
                  {index === 0 ? <Link to={text}><ListItemText primary={'map'} /></Link> : <Link to={text}><ListItemText primary={text.replace('/', '')} /></Link>}
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['/profile', '/Terms', '/Privacy'].map((text, index) => (
                <ListItem button key={text} selected={window.location.pathname === text} >
                  <ListItemIcon>
                    {index === 0 ?
                      <Link to={text}><Icon className={classes.icon}>Profile</Icon></Link> :
                      index === 1 ?
                        <Link to={text}><Icon className={classes.icon}>Terms</Icon></Link> :
                        <Link to={text}><Icon className={classes.icon}>Privacy</Icon></Link>
                    }
                  </ListItemIcon>
                  {index === 0 ? <Link to={'/profile'}><ListItemText primary={'Profile'} /></Link> : index === 1 ? <Link to={'/Terms'}><ListItemText primary={'Terms of Service'} /></Link> : <Link to={'/Privacy'}><ListItemText primary={'Privacy Policy'} /></Link>}
                </ListItem>
              ))}
            </List>
            <Divider />
            <ListItem button onClick={() => this.props.signout()}>
              <ListItemIcon>
                <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
              </ListItemIcon>
              <ListItemText primary={'Sign Out'} />
            </ListItem>
            <Divider />
            <Co />
          </Drawer>
          : null}
        {renderMenu}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  search: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    search: state.app.search,
    noti: state.app.noti
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout()),
    loadPost: () => dispatch(loadPost()),
    searchByState: state => dispatch(searchByState(state)),
    searchByTag: state => dispatch(searchByTag(state)),
    getnoti: () => dispatch(getnoti()),
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Header));
