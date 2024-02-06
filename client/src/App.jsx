import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Signup from './Signup';
import Header from './components/header/index';
import Footer from './components/footer/index';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
