import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import REACT_APP_API_URL from "../services/api";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loadedData: false, record: [], mistakes: [] };
  }

  changeValue = (e) => {
    const state = this.state.record;
    state[e.target.name] = e.target.value;
    this.setState({ record: state, mistakes: [] });
  };

  checkError(element) {
    return this.state.mistakes.indexOf(element) !== -1;
  }

  sendData = (e) => {
    e.preventDefault();
    const { id, concept, amount, date } = this.state.record;

    var mistakes = [];
    if (!concept) mistakes.push("error_concept");
    if (!amount || amount < 0) mistakes.push("error_amount");
    if (!date) mistakes.push("error_date");

    this.setState({ mistakes: mistakes });
    if (mistakes.length > 0) return false;

    var dataSend = {
      id: id,
      concept: concept,
      amount: amount,
      date: date,
    };

    fetch(`${REACT_APP_API_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSend),
    })
      .then(() => {
        this.props.history.push("/");
      })
      .catch(console.log);
  };

  loadData() {
    const id = this.props.match.params.id;
    fetch(`${REACT_APP_API_URL}/getAllUsersRegisters/${id}`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ loadedData: true, record: responseData[0] });
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    const { loadedData, record } = this.state;

    if (!loadedData) {
      return (
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    } else {
      return (
        <div className="card mt-5">
          <div className="card-header">Edit budget</div>
          <div className="card-body">
            <form onSubmit={this.sendData}>
              <div className="form-group">
                <label htmlFor="">Concept</label>
                <input
                  type="text"
                  name="concept"
                  onChange={this.changeValue}
                  value={record.concept}
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
                  value={record.amount}
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
                  value={moment(record.date).utc().format("YYYY-MM-DD")}
                  // value={record.date}
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
                  disabled
                  className="form-control"
                  name="types"
                  onChange={this.changeValue}
                  id="types"
                >
                  <option value={""}></option>
                  <option value={"Income"}>Income</option>
                  <option value={"Expense"}>Expense</option>
                </select>
                <small id="helpId" className="text-muted">
                  You cannot modify this option
                </small>
              </div>
              <div className="btn-group mt-3" role="group" aria-label="">
                <button type="submit" className="btn btn-success">
                  Update record
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
}

export default Edit;
