import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Paper, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Logo from '../../assets/logo.png';
import Header from '../../components/main/header'
import Co from '../../components/main/cooperate'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signinwithfb } from '../../store/actions/appAction'
import { Button, Container, Row, Col } from 'reactstrap';
import ErrMessage from '../../components/main/errMessage';

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
      marginTop: '12%',
      marginBottom: '9%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '20%',
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
  form: {
    marginTop: theme.spacing.unit * 3,
    width: '100%', // Fix IE 11 issue.
  },
  form1: {
    marginTop: theme.spacing.unit * 3,
    width: '100%', // Fix IE 11 issue.
    backgroundColor: '#FF0066',
    borderColor: '#FF0066',
    border: '1px solid'
  },
  in: {
    marginTop: theme.spacing.unit * 3,
    width: '100%', // Fix IE 11 issue.
    backgroundColor: '#FF9933',
    borderColor: '#FF9933',
    border: '1px solid'
  }
});

class InUp extends Component {

  signinwithfb = () => {
    this.props.signinwithfb()
  }

  render() {
    const { classes, err } = this.props;
    return (
      <main className={classes.main}>
        <Header />
        <CssBaseline />
        <Paper className={classes.paper}>
          <img src={Logo} width="50%" alt="Logo" />
          <Typography component="h3" variant="h5">
            Learn india culture with Chi 𝜒
          </Typography>
          <Container>
            <Row>
              <Col>
                <Button color="primary" className={classes.form} onClick={() => this.signinwithfb()}>Continue with Facebook</Button>
              </Col>
            </Row>
            <ErrMessage err={err} />
            <Row>
              <Col>
                <Link to='/up'>
                  <Button color="primary" className={classes.form1}>Sign up with email</Button>
                </Link>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col>
                <Link to='/in'>
                  <Button className={classes.in}>Log in</Button>
                </Link>
              </Col>
            </Row>
          </Container>
          <br />
          <Link to="/" style={{ fontSize: 13 }}>Cancel</Link>
          <p style={{ color: 'black', fontSize: 12 }}>CHI &#174; 2018</p>
          <Co />
        </Paper>
      </main>
    )
  }
}

InUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    err: state.app.err
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      signinwithfb: () => dispatch(signinwithfb()),
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps,mapDispatchToProps)(InUp));