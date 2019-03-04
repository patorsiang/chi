import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline, FormControl, Input, InputLabel, Paper, Typography, TextField } from '@material-ui/core';
import { Container, CustomInput, FormGroup, Label } from 'reactstrap';
import withStyles from '@material-ui/core/styles/withStyles';
import Logo from '../../assets/logo.png';
import Header from '../../components/main/header'
import { Link } from 'react-router-dom'
import Co from '../../components/main/cooperate'
// import { connect } from 'react-redux'
import ErrMessage from '../../components/main/errMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    [theme.breakpoints.up('sm')]: {
      marginTop: '8%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '15%',
    },
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    color: 'rgb(255,153,51)',
    marginBottom: '5%',
  },
  paper: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,

  },
  block: {
    width: '10rem',
    height: '10rem',
    borderRadius: '50%',
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
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
    '&$cssFocused': {
      borderColor: '#FF9933',
    },
  },
  start: {
    fontSize: '10em',
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Email: '',
      Password: '',
      RePassword: '',
      DOB: '1997-01-01',
      Photo: null,
      filename: '',
      err: null,
      progress: 0,
      url: null
    };
    this.handleChangePhoto = this.handleChangePhoto.bind(this)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangePhoto(event) {
    if (event.target.files[0]) {
      this.setState({
        Photo: event.target.files[0],
        filename: event.target.files[0].name,
        url: URL.createObjectURL(event.target.files[0])
      })
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.Password === this.state.RePassword && this.state.Name !== '' && this.state.Email !== '') {
      this.props.register(this.state)
    } else {
      this.setState({ err: 'some field are missing' })
    }
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
            Register
        </Typography>
          <form className={classes.form} method="post" onSubmit={(event) => this.handleClick(event)}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name" classes={{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }}
              >
                Display name
            </InputLabel>
              <Input id="name" name="name" classes={{
                underline: classes.cssUnderline,
              }}
                autoFocus onChange={this.handleChange('Name')} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                Email Address</InputLabel>
              <Input id="email" name="email" classes={{
                underline: classes.cssUnderline,
              }}
                autoFocus onChange={this.handleChange('Email')} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                Password</InputLabel>
              <Input name="password" classes={{
                underline: classes.cssUnderline,
              }}
                type="password" id="password" onChange={this.handleChange('Password')} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="repassword"
                classes={{
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }}
              >
                Re-Password</InputLabel>
              <Input name="repassword" classes={{
                underline: classes.cssUnderline,
              }}
                type="password" id="repassword" onChange={this.handleChange('RePassword')} />
            </FormControl>
            {this.state.Password !== this.state.RePassword && this.state.RePassword.length > 0 ? <ErrMessage err='Password does not match with RePassword' /> : null}
            <div style={{ marginTop: 20, marginBottom: 15 }} >
              <b style={{ fontSize: 15, float: 'left' }}
              >Birthday: </b>
              <TextField
                id="date"
                name="Birthday"
                type="date"
                defaultValue="1997-01-01"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange('DOB')}
              />
            </div>
            <FormGroup>
              <Label for="exampleCustomFileBrowser" style={{ fontSize: 15, float: 'left' }}><b>Profile image:</b></Label>
              <CustomInput style={{ fontSize: 1 }} type="file" id="exampleCustomFileBrowser" accept="image/*" name="customFile" onChange={(event) => this.handleChangePhoto(event)} label={this.state.filename} />
            </FormGroup>
            {this.state.url ?
              <img className={classes.block} src={this.state.url} alt={this.state.filename} /> :
              <Container fluid className={classes.start}>
                <FontAwesomeIcon icon={['far', 'images']} />
              </Container>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
          </Button>
            <br />
            <ErrMessage err={err} />
            <br />
            <ErrMessage err={this.state.err} />
            <Link to="/upin" style={{ fontSize: 13 }}> Back</Link> <Link to="/" style={{ fontSize: 13 }}> Cancel</Link>
            <br />

          </form>
          <p style={{ color: 'black', fontSize: 12 }}>CHI &#174; 2018</p>
          <Co />
        </Paper>
      </main>
    )
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SignUp);