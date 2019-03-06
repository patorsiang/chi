import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline, FormControl, Input, InputLabel, Paper, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Logo from '../../assets/logo.png';
import Header from '../../components/main/header'
import Co from '../../components/main/cooperate'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ErrMessage from '../../components/main/errMessage';
import { SigninByEmailNPWD } from '../../store/actions/appAction'

const styles = theme => ({
  main: {
    marginTop: '9%',
    marginBottom: '9%',
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '8%',
      marginBottom: '9%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '15%',
      marginBottom: '9%',
    },
  },
  paper: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
  },
  cssLabel: {
    '&$cssFocused': {
      color: '#FF9933',
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#FF9933',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#FF9933',
    },
  },
  notchedOutline: {},
});

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      err: null
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick(e) {
    e.preventDefault()
    this.props.SigninByEmailNPWD(this.state)
  }

  render() {
    const { classes, err } = this.props;
    return (
      <main className={classes.main}>
        <Header />
        <CssBaseline />
        <Paper className={classes.paper}>
          <img src={Logo} width="20%" alt="Logo" />
          <Typography component="h6" variant="h6">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={(event) => this.handleClick(event)}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email" classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              >Email Address</InputLabel>
              <Input id="email" name="email" classes={{
                underline: classes.cssUnderline,
              }}
                autoComplete="email" autoFocus onChange={this.handleChange('Email')} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password" classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              >Password</InputLabel>
              <Input name="password" classes={{
                underline: classes.cssUnderline,
              }}
                type="password" id="password" autoComplete="current-password" onChange={this.handleChange('Password')} />
            </FormControl>
            <br />
            <ErrMessage err={err} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
            <br />
          </form>
          <Link to="/up" style={{ fontSize: 15 }}>Do you have an account?</Link>
          <br />
          <Link to="/upin" style={{ fontSize: 13 }}> Cancel</Link>
          <p style={{ color: 'black', fontSize: 12 }}>CHI &#174; 2018</p>
          <Co />
        </Paper>
      </main>
    )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    err: state.app.err,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SigninByEmailNPWD: user => dispatch(SigninByEmailNPWD(user))
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(SignIn));