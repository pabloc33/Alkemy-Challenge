import React from "react";
import { Link } from "react-router-dom";
import REACT_APP_API_URL from "../services/api";

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      concept: "",
      amount: "",
      date: "",
      types: "",
      mistakes: [],
    };
  }

  changeValue = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state, mistakes: [] });
  };

  checkError(element) {
    return this.state.mistakes.indexOf(element) !== -1;
  }

  sendData = (e) => {
    e.preventDefault();
    const { concept, amount, date, types } = this.state;

    var mistakes = [];
    if (!concept) mistakes.push("error_concept");
    if (!amount || amount < 0) mistakes.push("error_amount");
    if (!date) mistakes.push("error_date");
    if (!types) mistakes.push("error_types");

    this.setState({ mistakes: mistakes });
    if (mistakes.length > 0) return false;

    var dataSend = {
      concept: concept,
      amount: amount,
      date: date,
      types: types,
    };

    fetch(`${REACT_APP_API_URL}/createRegister`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSend),
    })
      .then(() => {
        this.props.history.push("/");
      })
      .catch(console.log);
  };

  render() {
    const { concept, amount, date } = this.state;

    return (
      <div className="card mt-5">
        <div className="card-header">Budget Form</div>
        <div className="card-body">
          <form onSubmit={this.sendData}>
            <div className="form-group">
              <label htmlFor="">Concept</label>
              <input
                type="text"
                name="concept"
                onChange={this.changeValue}
                value={concept}
                id="concept"
                className={
                  (this.checkError("error_concept") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Write the budget concept
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="">Amount</label>
              <input
                type="number"
                name="amount"
                onChange={this.changeValue}
                value={amount}
                id="amount"
                className={
                  (this.checkError("error_amount") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Write the amount $
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="">Date</label>
              <input
                type="date"
                name="date"
                onChange={this.changeValue}
                value={date}
                id="date"
                className={
                  (this.checkError("error_date") ? "is-invalid" : "") +
                  " form-control"
                }
                placeholder=""
                aria-describedby="helpId"
              />
              <small id="helpId" className="invalid-feedback">
                Put the date
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="">Select Income or Expense</label>
              <select
                className={
                  (this.checkError("error_types") ? "is-invalid" : "") +
                  " form-control"
                }
                name="types"
                onChange={this.changeValue}
                id="types"
              >
                <option value={""}>-- Select one --</option>
                <option value={"Income"}>Income</option>
                <option value={"Expense"}>Expense</option>
              </select>
              <small id="helpId" className="invalid-feedback">
                Select an option
              </small>
            </div>
            <div className="btn-group mt-3" role="group" aria-label="">
              <button type="submit" className="btn btn-success">
                Add new record
              </button>
              <Link to={"/"} className="btn btn-primary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
    );
  }
}

export default Create;
