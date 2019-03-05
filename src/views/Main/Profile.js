import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { Button, FormControl, Input, InputLabel, Paper, TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { Container, Col, Row, Button as ButtomPW, Alert } from 'reactstrap'
import Avatar from 'react-avatar'
import { connect } from 'react-redux'
import ErrMessage from '../../components/main/errMessage';
import { Redirect, Link } from 'react-router-dom'
import img from '../../assets/peacock.png';
const styles = theme => ({
    main: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginTop: '8.5%',
            marginLeft: '3.5%',
            marginBottom: '2.5%',
            textAlign: 'left',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '20%',
            marginBottom: '20%',
            textAlign: 'center',
        },
        color: 'rgb(255,153,51)',
        padding: '1%',
    },
    profileimg: {
        margin: '1%',
        width: '70%',
        height: 'auto',
    },
    img: {
        textAlign: 'center',
    },
    row: {
        margin: '2.5% 0',
    },
    button: {
        fontSize: '12px',
        marginRight: theme.spacing.unit,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
    },
    image: {
        width: '40px',
        height: '40px',
        margin: '0 5%',
    },
    Alert: {
        fontSize: '0.75em',
    },
    notise: {
        fontSize: '0.6em',
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
})
class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        
        this.state = {
            newEmail: this.props.auth.email,
            uid: this.props.auth.uid,
            DOB: this.props.profile.DOB,
            displayName: this.props.profile.displayName,
            visible: true,
            success: this.props.success,
            click: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClick(e) {
        e.preventDefault();
        this.setState({ click: 1 })
        this.props.updateNameEmailDOB(this.state);
    }

    onDismiss() {
        this.setState({ visible: false });
    }


    renderRedirect = () => {
        if (!this.props.auth.uid) {
            return <Redirect to={'/'} />
        }
    }

    componentDidUpdate() {
        if (this.props.success) {
            this.setState({ success: this.props.success })
        }
        if (this.state.click === 1) {
            this.props.changeMenu('/profile')
        }
    }

    render() {
        const { classes, profile, errprofile, erremail, auth } = this.props;
        return (
            <Home>
                <Container fluid>
                    <Paper className={classes.main}>
                        {!auth.emailVerified && this.state.newEmail ?
                            <Alert color="danger" className={classes.Alert} isOpen={this.state.visible} toggle={this.onDismiss} >
                                Your email is not verified <a href={'https://www.' + this.state.newEmail.split("@")[1]} target="_blank" rel="noopener noreferrer"><ButtomPW onClick={this.onDismiss}>Go to email</ButtomPW></a>
                                <br />
                                <span className={classes.notise}>If this massege display, and it annoys you, you can close it.</span>
                                <br />
                                <span className={classes.notise}>If you've already verified your email, you should log in agian.</span>
                            </Alert> : null}
                        <Row className={classes.row}>
                            <Col xs="12" md="4" className={classes.img}>
                                <Avatar name={profile.displayName} src={profile.Photo} round={true} className={classes.profileimg} />
                            </Col>
                            <Col xs="12" md="8">
                                <Row className={classes.row}>
                                    <img className={classes.image} alt="complex" src={img} /> {' '}{profile.token}{' token'}
                                </Row>
                                <Row>
                                    <Col className={classes.row}>
                                        <Link to='/profile/img'><ButtomPW onClick={() => this.props.changeMenu('/profile/img')} className={classes.button}>Edit profile image</ButtomPW></Link>
                                    </Col>
                                    {this.state.newEmail ?
                                        <Col className={classes.row}>
                                            <a href={'https://www.' + this.state.newEmail.split("@")[1]} target="_blank" rel="noopener noreferrer">
                                                <ButtomPW onClick={() => this.props.updatePWD(this.state)} className={classes.button}>Change password</ButtomPW>
                                            </a>
                                        </Col> : null}

                                </Row>
                                <form className={classes.form} method="post" onSubmit={(event) => this.handleClick(event)}>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="name" classes={{
                                            root: classes.cssLabel,
                                            focused: classes.cssFocused,
                                        }}>
                                            Display name</InputLabel>
                                        <Input id="name" name="name" value={this.state.displayName} classes={{
                                            underline: classes.cssUnderline,
                                        }} onChange={this.handleChange('displayName')} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="email" classes={{
                                            root: classes.cssLabel,
                                            focused: classes.cssFocused,
                                        }}>Email Address</InputLabel>
                                        <Input id="email" name="email" value={this.state.newEmail} classes={{
                                            underline: classes.cssUnderline,
                                        }} onChange={this.handleChange('newEmail')} />
                                    </FormControl>
                                    <div style={{ marginTop: 10 }}>
                                        <p style={{ fontSize: 14 }}>Birthday: </p>
                                        <TextField
                                            id="date"
                                            name="Birthday"
                                            type="date"
                                            defaultValue={this.state.DOB}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChange('DOB')}
                                        />
                                    </div>
                                    <ErrMessage err={errprofile} />
                                    <ErrMessage err={erremail} />
                                    <ErrMessage suc={this.state.success} path={'/profile'} />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        update
                                    </Button>
                                </form>
                            </Col>
                        </Row>
                    </Paper>
                </Container>
            </Home>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Profile))