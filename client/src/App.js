import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Join from "./Components/join";
import Chat from "./Components/chat";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join}/>
      <Route path="/chat" component={Chat}/>
    </Router>
  )
};

export default App;