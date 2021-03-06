import "./RegisterTerms.css";

import React, { Component, FormEvent } from "react";

import logo from "assets/img/logo_basic.png";
import * as termsContent from "../../../../../../util/Terms/terms";
import { IHandlePage } from "../../../../App";

interface IRegisterTermsProps {
  handlePage: IHandlePage;
}

interface IRegisterTermsState {
  isCheckedFst: boolean;
  isCheckedSnd: boolean;
}

export default class RegisterTerms extends Component<IRegisterTermsProps, IRegisterTermsState> {
  constructor(props: IRegisterTermsProps) {
    super(props);

    this.state = {
      isCheckedFst: false,
      isCheckedSnd: false
    };
  }

  handleChangeFst = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ isCheckedFst: e.currentTarget.checked });
  };
  handleChangeSnd = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ isCheckedSnd: e.currentTarget.checked });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!this.state.isCheckedFst || !this.state.isCheckedSnd) {
      return alert("회원가입약관 및 개인정보처리방침에 동의해야 회원가입이 가능합니다.");
    }

    this.props.handlePage("/user/register");
  };

  render() {
    const { terms, privatePolicy } = termsContent;
    const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

    return (
      <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
        <div className="terms-form-container">
          <div>
            <div className="terms-logo">
              <img src={logo} />
            </div>
            <div className="terms-form-box">
              <div className="terms-title">
                <i className="fa fa-sign-in" />
                회원가입약관
              </div>
              <hr />
              <form className="terms-form-input" method="post" onSubmit={this.handleSubmit}>
                <div className="terms-container">
                  회원가입약관
                  <textarea value={terms} rows={6} cols={54} disabled />
                  <label className="checkbox-container">
                    회원가입약관의 내용에 동의합니다
                    <input type="checkbox" onChange={this.handleChangeFst} />
                  </label>
                </div>
                <div className="terms-container bottom-container">
                  개인정보처리방침안내
                  <textarea value={privatePolicy} rows={6} cols={54} disabled />
                  <label className="checkbox-container">
                    개인정보처리방침안내의 내용에 동의합니다
                    <input type="checkbox" onChange={this.handleChangeSnd} />
                  </label>
                </div>
                <input type="submit" id="btn-next" value="NEXT" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
