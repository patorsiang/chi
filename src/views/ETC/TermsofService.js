import React, { Component, Fragment } from 'react'
import Home from '../../layouts/Home'
import {Grid } from '@material-ui/core/'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: '5%',
    },
    card: {
        marginTop:'10%',
        marginBottom:'5%',
        maxWidth: '100%',
    },
    
});

class TermService extends Component {
    render() {
        const { classes} = this.props
        return (
            <Home>
                <Fragment className={classes.root}>
                <Grid item>
                    <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="title" gutterBottom > Terms and Conditions </Typography>
                        <Typography variant="overline" align="right" gutterBottom> Last updated: January 20, 2019 </Typography>
                        <Typography component="p" variant="body1" align="left"> Please read these Terms and Conditions
                        carefully before using the “https://app-chi.firebaseapp.com/upin” website and mobile application or it
                        can be called the "Service" operated by CHI.
                        Your access to and use of the Service is conditioned on your acceptance of and 
                        compliance with these Terms. These Terms apply to all visitors, users and
                        others who access or use the Service.
                        By accessing or using the Service you agree to be bound by these Terms. If you
                        disagree with any part of the terms then you may not access the Service. The 
                        Terms and Conditions agreement for CHI is based on the [Terms Feed's Terms and 
                        Conditions Template](https://termsfeed.com/blog/sample-terms-and-conditions-template/).
                        </Typography>
                        <Typography variant="body1" align="right"gutterBottom> Accounts. </Typography>
                        </CardContent>

                        <CardContent>
                        <Typography component="p" variant="body1" align="left">
                        When you create an account with us, you must provide us information that is
                        accurate, complete, and current at all times. Failure to do so constitutes a
                        breach of the Terms, which may result in immediate termination of your account
                        on our Service.
                        You are responsible for safeguarding the password that you use to access the
                        Service and for any activities or actions under your password, whether your 
                        password is with our Service or a third-party service.
                        You agree not to disclose your password to any third party. You must notify us
                        immediately upon becoming aware of any breach of security or unauthorized use
                        of your account.
                        </Typography>
                        <Typography variant="body1" align="right" gutterBottom> Publishing Content. </Typography>
                        </CardContent>

                        <CardContent>
                        <Typography component="p" variant="body1" align="left">
                        Our Service allow user to publish content by their own. They can post any stories or experiences they 
                        have to others so that others can receive the information that might be useful for their education. We 
                        want to provide every user to have experience of sharing and gaining every information on posts to 
                        extend the knowledge of your own.
                        Our Service also allow user to create their own diary so that they can take any notes they are interesting 
                        in and they can link them to outsider sources.
                        </Typography>
                        <Typography variant="body1" align="right" gutterBottom> Links To Other Web Sites.  </Typography>
                        </CardContent>

                        <CardContent>
                        <Typography component="p" variant="body1" align="left">
                        Our Service may contain links to third-party web sites or services that are
                        not owned or controlled by CHI.
                        CHI has no control over, and assumes no responsibility for, the content,
                        privacy policies, or practices of any third party web sites or services. You
                        further acknowledge and agree that CHI shall not be responsible or liable,
                        directly or indirectly, for any damage or loss caused or alleged to be caused
                        by or in connection with use of or reliance on any such content, goods or
                        services available on or through any such web sites or services.
                        We strongly advise you to read the terms and conditions and privacy policies
                        of any third-party web sites or services that you visit.
                        </Typography>
                        <Typography variant="body1" align="right" gutterBottom> Termination.  </Typography>
                        </CardContent>

                        <CardContent>
                        <Typography component="p" variant="body1" align="left">
                        We may terminate or suspend your account or the access to our Service immediately, without prior 
                        notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        Upon termination, your right to use the Service will immediately cease. If you
                        wish to terminate your account, you may simply discontinue using the Service.
                        All provisions of the Terms which by their nature should survive termination
                        shall survive termination, including, without limitation, ownership
                        provisions, warranty disclaimers, indemnity and limitations of liability.
                        </Typography>
                        <Typography variant="body1" align="right" gutterBottom> Governing Law.  </Typography>
                        </CardContent>

                        <CardContent>
                        <Typography component="p" variant="body1" align="left">
                        These Terms shall be governed and construed in accordance with the laws of
                        Thailand, without regard to its conflict of law provisions.
                        Our failure to enforce any right or provision of these Terms will not be
                        considered a waiver of those rights. If any provision of these Terms is held
                        to be invalid or unenforceable by a court, the remaining provisions of these
                        Terms will remain in effect. These Terms constitute the entire agreement
                        between us regarding our Service, and supersede and replace any prior
                        agreements we might have between us regarding the Service.
                        </Typography>
                        <Typography variant="body1" align="right" gutterBottom> Changes.  </Typography>
                        </CardContent>

                        <CardContent>
                        <Typography component="p" variant="body1" align="left">
                        We reserve the right, at our sole discretion, to modify or replace these Terms
                        at any time. If a revision is material, we will try to provide at least 30 days
                        notice prior to any new terms taking effect. What constitutes a material
                        change will be determined at our sole discretion.
                        By continuing to access or use our Service after those revisions become
                        effective, you agree to be bound by the revised terms. If you do not agree to
                        the new terms, please stop using the Service.
                        </Typography>
                        </CardContent>
                        <CardContent>
                        <Typography variant="subtitle1" align="right">  "CHI Developer's Team." </Typography>
                        </CardContent>
                    </Card>
            </Grid>
            </Fragment>
            </Home>
        )
    }
}
export default withStyles(styles)(TermService)