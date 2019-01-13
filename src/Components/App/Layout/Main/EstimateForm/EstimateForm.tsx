import "./EstimateForm.css";

import React, { Component } from "react";
import EstimateFormMain from "./EstimateFormMain/EstimateFormMain";
import { MainHeader } from "../MainHeader/MainHeader";

export default class EstimateForm extends Component {
  render() {
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

    return (
      <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
        <MainHeader title="견적서보기" />
        <div className="estimate_container">
          <EstimateFormMain />
        </div>
      </div>
    );
  }
}
