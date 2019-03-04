import React from "react";
import Loadable from 'react-loadable'

import App from "./layouts/App";
import Unregist from './components/main/unregist'

import { connect } from 'react-redux'
import { Route, Switch, Router, Redirect } from "react-router-dom";

import createBrowserHistory from 'history/createBrowserHistory'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'reactstrap';
const history = createBrowserHistory()

const LoadingComponant = ({ isLoading, error }) => {
    if (isLoading) {
        return <Alert color="info" style={{ margin: '25% 5%' }}><FontAwesomeIcon icon="spinner" spin /> Loading... </Alert>;
    } else if (error) {
        return <Alert color="danger" style={{ margin: '25% 5%' }}>Sorry, unable to load the page ...</Alert>
    } else {
        return null
    }
}

const SignIn = Loadable({
    loader: () => import('./views/Main/SignIn'),
    loading: LoadingComponant
})

const SignUp = Loadable({
    loader: () => import('./views/Main/SignUp'),
    loading: LoadingComponant
})

const InUp = Loadable({
    loader: () => import('./views/Main/IncludeInUp'),
    loading: LoadingComponant
})

const Map = Loadable({
    loader: () => import('./views/Activity/Map'),
    loading: LoadingComponant
})

const Diary = Loadable({
    loader: () => import('./views/Activity/Diary'),
    loading: LoadingComponant
})

const Book = Loadable({
    loader: () => import('./views/Activity/Book'),
    loading: LoadingComponant
})

const Feed = Loadable({
    loader: () => import('./views/Activity/Feed'),
    loading: LoadingComponant
})

const Notice = Loadable({
    loader: () => import('./views/Activity/Notice'),
    loading: LoadingComponant
})

const Profile = Loadable({
    loader: () => import('./views/Main/Profile'),
    loading: LoadingComponant
})

const UpdateIMG = Loadable({
    loader: () => import('./components/inup/UpdateIMG'),
    loading: LoadingComponant
})

const Term = Loadable({
    loader: () => import('./views/ETC/TermsofService'),
    loading: LoadingComponant
})

const Privacy = Loadable({
    loader: () => import('./views/ETC/PrivacyPolicy'),
    loading: LoadingComponant
})

const NotFound = Loadable({
    loader: () => import('./views/ETC/PrivacyPolicy'),
    loading: LoadingComponant
})

const CreateDiary = Loadable({
    loader: () => import('./components/diary/create'),
    loading: LoadingComponant
})

const EditDiary = Loadable({
    loader: () => import('./components/diary/edit'),
    loading: LoadingComponant
})

const Acheive = Loadable({
    loader: () => import('./views/Book/Acheive'),
    loading: LoadingComponant
})

const Routes = props => {
    return (
        <App auth={props.auth}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/Privacy" component={Privacy} />
                    <Route exact path="/Terms" component={Term} />
                    <Route exact path="/upin" render={() =>
                        !props.auth.uid ?
                            <InUp />
                            : <Redirect to='/' />
                    } />
                    <Route exact path="/up" render={() =>
                        !props.auth.uid ?
                            <SignUp />
                            : <Redirect to='/' />
                    } />
                    <Route exact path="/in" render={() =>
                        !props.auth.uid ?
                            <SignIn />
                            : <Redirect to='/' />
                    } />
                    <Route exact path="/upin" render={() =>
                        !props.auth.uid ?
                            <InUp />
                            : <Redirect to='/' />
                    } />
                    <Route exact path="/diary" render={() =>
                        props.auth.uid ?
                            <Diary />
                            : <Unregist name='Diary' />
                    } />
                    <Route exact path="/diary/create" render={() =>
                        props.auth.uid ?
                            <CreateDiary />
                            : <Unregist name='Create Diary' />
                    } />
                    <Route exact path="/diary/edit" render={() =>
                        props.auth.uid ?
                            <EditDiary />
                            : <Unregist name='Edit Diary' />
                    } />
                    <Route exact path="/feed" render={() =>
                        props.auth.uid ?
                            <Feed />
                            : <Unregist name='Feed' />
                    } />
                    <Route exact path="/bookmark" render={() =>
                        props.auth.uid ?
                            <Book />
                            : <Unregist name='Book' />
                    } />
                    <Route exact path="/acheive" render={() =>
                        props.auth.uid ?
                            <Acheive />
                            : <Unregist name='Acheive' />
                    } />
                    <Route exact path="/notice" render={() =>
                        props.auth.uid ?
                            <Notice />
                            : <Unregist name='Notice' />
                    } />
                    <Route exact path="/profile" render={() =>
                        props.auth.uid ?
                            <Profile />
                            : <Unregist name='Profile' />
                    } />
                    <Route exact path="/profile/img" render={() =>
                        props.auth.uid ?
                            <UpdateIMG />
                            : <Unregist name='/profile/img' />
                    } />
                    <Route exact path="/" component={Map} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </Router>
        </App>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(Routes);