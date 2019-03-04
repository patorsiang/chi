import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import Mu from '../../assets/MU Symbol- Full Colour.png'
import ICT from '../../assets/customLogo.gif.png'
import Bh from '../../assets/Logo_BharatMahidol_Feb2016.png'
import { Container, Row, Col } from 'reactstrap'

const styles = theme => ({
    mulogo: {
        width: '100%',
        verticalAlign: 'bottom',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        margin: '50% -50% 0 50%'
    },
})

class Cooperate extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <a href='https://www.ict.mahidol.ac.th/en/' target="_blank" rel="noopener noreferrer"><img src={ICT} alt="ICT" className={classes.mulogo} /></a>
                    </Col>
                    <Col>
                        <a href='https://mahidol.ac.th' target="_blank" rel="noopener noreferrer"><img src={Mu} alt="Mu" className={classes.mulogo} /></a>
                    </Col>
                    <Col>
                        <a href='http://www.bharat.lc.mahidol.ac.th' target="_blank" rel="noopener noreferrer"><img src={Bh} alt="Bh" className={classes.mulogo} /></a>
                    </Col>
                </Row>
            </Container>
        )
    }
}

Cooperate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Cooperate)

