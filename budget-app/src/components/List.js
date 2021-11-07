import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import REACT_APP_API_URL from "../services/api";
import { totalEgressIngress } from "../constant";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedData: false,
      records: [],
      balance: [],
    };
  }

  deleteRecords(id) {
    console.log(id);
    fetch(`${REACT_APP_API_URL}/deleteRecord/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        this.loadDataLastTen();
        this.loadDataAll();
      })
      .catch(console.log);
  }

  loadDataLastTen() {
    fetch(`${REACT_APP_API_URL}/getLastTenRecords`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ loadedData: true, records: responseData });
      })
      .catch(console.log);
  }

  loadDataAll() {
    fetch(`${REACT_APP_API_URL}/getAllUsersRegisters`)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ loadData: true, balance: responseData });
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.loadDataLastTen();
    this.loadDataAll();
  }

  render() {
    const { loadedData, records, balance } = this.state;

    const totalIncome = totalEgressIngress(balance, "Income");
    const totalExpense = totalEgressIngress(balance, "Expense");
    const currentValue = totalIncome - totalExpense;

    if (!loadedData) {
      return (
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    } else {
      return (
        <div className="card mt-5">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Link className="btn btn-primary" to={"/create"}>
              Add new record
            </Link>
            <div className="ml text-info">
              <h5>Balance: {currentValue}</h5>
            </div>
            <div className="ml text-success">
              <h5>Income: {totalIncome}</h5>
            </div>
            <div className="ml text-danger">
              <h5>Expense: {totalExpense}</h5>
            </div>
          </div>
          <div className="card-body">
            <h4>Record list</h4>
            <table className="table table-responsive table-striped">
              <thead>
                <tr>
                  <th>Concept</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Types</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.concept}</td>
                    <td>{record.amount}</td>
                    <td>{moment(record.date).utc().format("DD-MM-YYYY")}</td>
                    <td>{record.types}</td>
                    <td>
                      <div
                        className="btn-group btn-group-sm"
                        role="group"
                        aria-label=""
                      >
                        <Link
                          className="btn btn-outline-warning my-auto"
                          to={"/edit/" + record.id}
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => this.deleteRecords(record.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer text-muted"></div>
        </div>
      );
    }
  }
}

export default List;
