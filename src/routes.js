import React from "react";
import Loadable from 'react-loadable'

import App from "./layouts/App"

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

const Unregist = Loadable({
    loader: () => import('./components/main/unregist'),
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

const Landing = Loadable({
    loader: () => import('./views/Landing/index'),
    loading: LoadingComponant
})

const Routes = props => {
    const { auth, profile } = props
    return (
        <App auth={auth}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/Privacy" component={Privacy} />
                    <Route exact path="/Terms" component={Term} />
                    <Route exact path="/upin" render={() =>
                        !auth.uid ?
                            <InUp />
                            : <Redirect to="/feed"/>
                    } />
                    <Route exact path="/up" render={() =>
                        !auth.uid ?
                            <SignUp />
                            : <Redirect to="/feed" />
                    } />
                    <Route exact path="/in" render={() =>
                        !auth.uid ?
                            <SignIn />
                            : <Redirect to="/feed" />
                    } />
                    <Route exact path="/upin" render={() =>
                        !auth.uid ?
                            <InUp />
                            : <Redirect to="/feed" />
                    } />
                    <Route exact path="/diary/edit" render={() =>
                        auth.uid ?
                            <EditDiary />
                            : <Redirect to="/feed" />
                    } />
                    <Route exact path="/diary/create" render={() =>
                        auth.uid ?
                            <CreateDiary />
                            : <Redirect to="/feed" />
                    } />
                    <Route exact path="/diary/acheive" render={() =>
                        auth.uid ?
                            <Acheive auth={auth} />
                            : <Redirect to="/feed" />
                    } />
                    <Route exact path="/profile" render={() =>
                        auth.uid ?
                            <Profile auth={auth} profile={profile} />
                            : <Redirect to="/feed" />
                    } />
                    <Route exact path="/profile/img" render={() =>
                        auth.uid ?
                            <UpdateIMG auth={auth} />
                            : <Redirect to="/feed" />
                    } />
                    <Route exact path="/diary" render={() =>
                        auth.uid ?
                            <Diary />
                            : <Redirect to="/unregist/Diary" />
                    } />
                    <Route exact path="/bookmark" render={() =>
                        auth.uid ?
                            <Book />
                            : <Redirect to="/unregist/Bookmark" />
                    } />
                    <Route exact path="/notice" render={() =>
                        auth.uid ?
                            <Notice />
                            : <Redirect to="/unregist/Notice" />
                    } />
                    <Route path="/unregist/:func" component={Unregist} />
                    <Route exact path="/diary" component={Diary}/>
                    <Route exact path="/bookmark" component={Book}/>
                    <Route exact path="/notice" component={Notice}/>
                    <Route exact path="/" render={() =>
                        auth.uid ?
                            <Redirect to="/feed" />
                            : <Landing />
                    } />
                    <Route exact path="/feed" component={Feed} />
                    <Route exact path="/map" component={Map} />
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