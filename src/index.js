import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, SurveyProvider } from './utils/context'

import Header from "./components/Header";
import Error from "./components/Error";
import Home from "./pages/Home";
import Survey from "./pages/Survey";
import Results from "./pages/Results";
import Freelances from "./pages/Freelances";
import Profile from "./pages/Profile";
import GlobalStyle from './utils/style/GlobalStyle'
import Footer from "./components/Footer";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <SurveyProvider>
          <GlobalStyle />
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/survey/:questionNumber" component={Survey} />
            <Route path="/freelances" component={Freelances} />
            <Route path="/results" component={Results} />
            <Route path='/profile/:id' render={(props) => <Profile {...props} />}
            />
            <Route component={Error} />
          </Switch>
          <Footer />
        </SurveyProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
