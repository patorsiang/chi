import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'reactstrap';

const styles = theme => ({
    pageTilte: {
        backgroundColor: 'rgb(85,2,4)',
        [theme.breakpoints.up('sm')]: {
            height: '100%',
            fontSize: '100%'
        },
        [theme.breakpoints.down('sm')]: {
            height: '150%',
            fontSize: '150%'
        },
    }
})

class pageTitle extends Component {
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Container fluid className={classes.pageTilte}>
                    <Row>
                        <Col>
                            {['/feed', '/map', '/diary', '/bookmark', '/notice'].map(text =>
                                text.toUpperCase() === window.location.pathname.toUpperCase() ?
                                    window.location.pathname.toLowerCase().replace('/', '')
                                    : null)}
                        </Col>
                        <Col />
                        <Col />
                        <Col />
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default withStyles(styles, { withTheme: true })(pageTitle);
