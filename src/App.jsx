import React, {Suspense} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import RootContainer from "./container/RootContainer";
import Login from "./views/Home/Login";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const App = () =>{
  return(
      <BrowserRouter>
        <Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
            {/*<Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />*/}
            {/*<Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />*/}
            {/*<Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />*/}
            <Route path="/" name="Root" render={props => <RootContainer {...props}/>} />
          </Switch>
        </Suspense>
      </BrowserRouter>
  )
}

export default App;
