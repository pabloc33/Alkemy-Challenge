import "./App.css";
import List from "./components/List";
import Create from "./components/Create";
import Edit from "./components/Edit";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <br></br>
        <h1 className="display-2 text-uppercase text-center text-light">
          Budget App
        </h1>
        <Route exact path="/" component={List}></Route>
        <Route path="/create" component={Create}></Route>
        <Route path="/edit/:id" component={Edit}></Route>
      </div>
    </Router>
  );
}

export default App;
