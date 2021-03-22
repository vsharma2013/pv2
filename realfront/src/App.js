import React ,{useEffect} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import MainPage from "./containers/dashboard";
import NotFoundPage from "./containers/notfoundpage";
import Projects from "./containers/Projects/projects";
import Account from './containers/Account/account';
import Location from './containers/Location/location';
import LocationSearch from './containers/Location/locationSearch';
import MostLocationSearch from './containers/Location/MostlocationSearch';
import TopLocationSearch from './containers/Location/ToplocationSearch';
import RecentLocationSearch from './containers/Location/RecentlocationSearch';
import ReportReview from "./containers/ReportReview/reportreview";
import LocationReportReview from "./containers/LocationReportReview/locationreportreview";
import LocationDetails from './containers/LocationDetails/locationdetails';
import './App.css';
import Registration from "./components/Registration/registration";
import LinkedInRedirect from "./components/LinkedInRedirect/linkedinredirect";
import ReactGA from 'react-ga';

import PublicBlog from "./components/PublicBlogs";
import ViewBlog from "./components/ViewBlog/ViewBlog";
import EditDraft from './components/EditDraft/EditDraft';
import Modal2 from './components/ForgotpasswordModalbox/ForgotpasswordModalbox';
import Modal3 from './components/ForgotpasswordconfirmModalbox/ForgotpasswordconfirmModalbox';
import ResetRedirect from './components/ResetPassword/ResetRedirect';
import NewPassword from './components/ResetPassword/NewPassword';

function App (){
  useEffect(() => {
    ReactGA.initialize('UA-176563661-1');
    ReactGA.pageview(window.location.pathname);
  }, []);
return (
  <Switch>
    <Route exact path="/" component={MainPage}/>
    <Route exact path="/404" component={NotFoundPage}/>
    <Route exact path="/Projects/:project_id" component={Projects}/>
    <Route exact path="/Projects/ReportReview/:review_id" component={ReportReview}/>
    <Route exact path="/LocationDetails/:location_id" component={LocationDetails}/>
    <Route exact path="/LocationDetails/LocationReportReview/:location_review_id" component={LocationReportReview}/>
    <Route exact path="/Location/:location" component={LocationSearch}/>
    <Route exact path="/MostTrending/Location/:location" component={MostLocationSearch}/>
    <Route exact path="/TopRated/Location/:location" component={TopLocationSearch}/>
    <Route exact path="/RecentLaunched/Location/:location" component={RecentLocationSearch}/>
    <Route exact path="/Account" component={Account}/>
    <Route exact path="/Locations" component={Location}/>
    <Route exact path="/Registration/" component={Registration}/>
    <Route exact path="/Registration/:email_id" component={Registration}/>
    <Route exact path="/LinkedInRedirect/:response_data" component={LinkedInRedirect}/>
    <Route exact path="/Blogs" component={PublicBlog}/>
    <Route exact path="/Blog/:blog_id" component={ViewBlog}/>
    <Route exact path="/Edit/:blog_id" component={EditDraft}/>
    <Route exact path="/ForgotPassword" component={Modal2}/>
    <Route exact path="/ForgotPasswordconfirm" component={Modal3}/>
    <Route exact path="/ResetPassword/:response_data" component={ResetRedirect}/>
    <Route exact path="/NewPassword" component={NewPassword}/>

    <Redirect to="/404"/>
  </Switch>
);
}

export default App;
