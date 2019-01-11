import "./Rental.css";

import React, { Component, MouseEvent, FormEvent } from "react";
import axios from "axios";

import Origin from "./Origin/Origin";

interface IBrand {
  car_brand: string;
}

interface ISeries {
  car_series: string;
}

interface IModel {
  car_model: string;
}

interface IDetail {
  car_detail: string;
}

interface IGrade {
  car_grade: string;
}

interface IOption {
  car_option: string;
  car_option_price: number;
}

interface IRentalProps {
  isSidebarOpen: boolean;
}

interface IRentalStates {
  origin: string;

  brand: string;
  brandList: IBrand[];

  series: string;
  seriesList: ISeries[];

  model: string;
  modelList: IModel[];

  detail: string;
  detailList: IDetail[];

  grade: string;
  gradeList: IGrade[];

  option: string;
  optionList: IOption[];

  price: number;

  checkedBrand: string;
  checkedSeries: string;
  checkedModel: string;
  checkedDetail: string;
  checkedGrade: string;
  checkedOption: string;
  [key: string]: string | number | IBrand[] | ISeries[] | IModel[] | IDetail[] | IGrade[] | IOption[];
}

interface ISelectMessages {
  [key: string]: string;
}

const selectMessages: ISelectMessages = {
  none: "정보없음",
  series: "제조사를 선택해주세요.",
  model: "시리즈를 선택해주세요.",
  detail: "모델을 선택해주세요.",
  grade: "상세모델을 선택해주세요.",
  option: "등급을 선택해주세요."
};

function isInvaildItem(item: string): boolean {
  for (const msg in selectMessages) {
    if (item === selectMessages[msg]) {
      return true;
    }
  }

  return false;
}

export default class Rental extends Component<IRentalProps, IRentalStates> {
  constructor(props: IRentalProps) {
    super(props);

    this.state = {
      origin: "korea",

      brand: "",
      brandList: [{ car_brand: "" }],

      series: "",
      seriesList: [{ car_series: selectMessages.series }],

      model: "",
      modelList: [{ car_model: selectMessages.model }],

      detail: "",
      detailList: [{ car_detail: selectMessages.detail }],

      grade: "",
      gradeList: [{ car_grade: selectMessages.grade }],

      option: "",
      optionList: [{ car_option: selectMessages.option, car_option_price: 0 }],

      price: 0,

      checkedBrand: "",
      checkedSeries: "",
      checkedModel: "",
      checkedDetail: "",
      checkedGrade: "",
      checkedOption: ""
    };

    this.handleOriginClick = this.handleOriginClick.bind(this);
    this.handleBrandClick = this.handleBrandClick.bind(this);
    this.handleSeriesClick = this.handleSeriesClick.bind(this);
    this.handleModelClick = this.handleModelClick.bind(this);
    this.handleDetailClick = this.handleDetailClick.bind(this);
    this.handleGradeClick = this.handleGradeClick.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);

    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(e: FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  handleOriginClick(origin: string) {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/${origin}`)
      .then((res) => {
        const brandList: IBrand[] = res.data.brandList;
        this.setState({
          brandList,
          origin,
          seriesList: [{ car_series: selectMessages.series }],
          modelList: [{ car_model: selectMessages.model }],
          detailList: [{ car_detail: selectMessages.detail }],
          gradeList: [{ car_grade: selectMessages.grade }],
          optionList: [{ car_option: selectMessages.option, car_option_price: 0 }],
          price: 0
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  handleBrandClick(e: MouseEvent) {
    const brand = e.currentTarget.textContent || selectMessages.none;
    if (isInvaildItem(brand)) {
      return;
    }

    const origin = this.state.origin;
    const encodedBrand = encodeURI(brand);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/${origin}/${encodedBrand}`)
      .then((res) => {
        const seriesList: ISeries[] = res.data.seriesList;
        this.setState({
          seriesList,
          brand,
          modelList: [{ car_model: selectMessages.model }],
          detailList: [{ car_detail: selectMessages.detail }],
          gradeList: [{ car_grade: selectMessages.grade }],
          optionList: [{ car_option: selectMessages.option, car_option_price: 0 }],
          price: 0
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  handleSeriesClick(e: MouseEvent) {
    const series = e.currentTarget.textContent || selectMessages.none;
    if (isInvaildItem(series)) {
      return;
    }

    const origin = this.state.origin;
    const brand = this.state.brand;

    const encodedBrand = encodeURI(brand);
    const encodedSeries = encodeURI(series);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/${origin}/${encodedBrand}/${encodedSeries}`)
      .then((res) => {
        const modelList: IModel[] = res.data.modelList;
        this.setState({
          modelList,
          series,
          detailList: [{ car_detail: selectMessages.detail }],
          gradeList: [{ car_grade: selectMessages.grade }],
          optionList: [{ car_option: selectMessages.option, car_option_price: 0 }],
          price: 0
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  handleModelClick(e: MouseEvent) {
    const model = e.currentTarget.textContent || selectMessages.none;
    if (isInvaildItem(model)) {
      return;
    }

    const origin = this.state.origin;
    const brand = this.state.brand;
    const series = this.state.series;

    const encodedBrand = encodeURI(brand);
    const encodedSeries = encodeURI(series);
    const encodedModel = encodeURI(model);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/${origin}/${encodedBrand}/${encodedSeries}/${encodedModel}`)
      .then((res) => {
        const detailList: IDetail[] = res.data.detailList;
        this.setState({
          detailList,
          model,
          gradeList: [{ car_grade: selectMessages.grade }],
          optionList: [{ car_option: selectMessages.option, car_option_price: 0 }],
          price: 0
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  handleDetailClick(e: MouseEvent) {
    const detail = e.currentTarget.textContent || selectMessages.none;
    if (isInvaildItem(detail)) {
      return;
    }

    const origin = this.state.origin;
    const brand = this.state.brand;
    const series = this.state.series;
    const model = this.state.model;

    const encodedBrand = encodeURI(brand);
    const encodedSeries = encodeURI(series);
    const encodedModel = encodeURI(model);
    const encodedDetail = encodeURI(detail);

    axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/api/rental/${origin}/${encodedBrand}/${encodedSeries}/${encodedModel}/${encodedDetail}`
      )
      .then((res) => {
        const gradeList: IGrade[] = res.data.gradeList;
        this.setState({
          gradeList,
          detail,
          optionList: [{ car_option: selectMessages.option, car_option_price: 0 }],
          price: 0
        });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  handleGradeClick(e: MouseEvent) {
    const grade = e.currentTarget.textContent || selectMessages.none;
    if (isInvaildItem(grade)) {
      return;
    }

    const origin = this.state.origin;
    const brand = this.state.brand;
    const series = this.state.series;
    const model = this.state.model;
    const detail = this.state.detail;

    const encodedBrand = encodeURI(brand);
    const encodedSeries = encodeURI(series);
    const encodedModel = encodeURI(model);
    const encodedDetail = encodeURI(detail);
    const encodedGrade = encodeURI(grade);

    axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/api/rental/${origin}/${encodedBrand}/${encodedSeries}/${encodedModel}/${encodedDetail}/${encodedGrade}`
      )
      .then((res) => {
        const price = res.data.car_price;
        const optionList: IOption[] = res.data.optionList;
        this.setState({ optionList, grade, price });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  handleOptionClick(e: MouseEvent) {
    const option = e.currentTarget.children[1].children[0].textContent || selectMessages.none;

    if (isInvaildItem(option)) {
      return;
    }

    this.setState({ option });
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/rental/korea`)
      .then((res) => {
        const brandList: IBrand[] = res.data.brandList;
        this.setState({ brandList });
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  render() {
    const option = this.state.option;
    const optionInfo = this.state.optionList.reduce(
      (accu, curr) => {
        return curr.car_option === option ? curr : accu;
      },
      {
        car_option: selectMessages.none,
        car_option_price: 0
      }
    );

    const carPrice = this.state.price;
    const optionPrice = optionInfo.car_option_price;

    const resultPrice = carPrice + optionPrice;

    return (
      <div id="my-main" className={this.props.isSidebarOpen ? "" : "my-main-margin-left"}>
        <h1>
          <i className="fa fa-cab" />
          장기렌트
        </h1>
        <div className="select_car">
          <div className="item_lists">
            <div className="item_list">
              <div className="item_lists_title">
                <div className="item_list_title">
                  <div className="item_list_title">제조사</div>
                </div>
                <Origin handleOriginClick={this.handleOriginClick} />
              </div>
              <ul className="list_group">
                {this.state.brandList.map((v) => (
                  <li className="list-group-item" onClick={this.handleBrandClick} key={v.car_brand}>
                    <input
                      type="radio"
                      name="checkedBrand"
                      id={v.car_brand}
                      value={v.car_brand}
                      checked={this.state.checkedBrand === v.car_brand}
                      onChange={this.handleCheck}
                    />
                    <label htmlFor={v.car_brand}>{v.car_brand}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="item_list">
              <div className="item_lists_title">
                <div className="item_list_title">시리즈</div>
              </div>
              <ul className="list_group">
                {this.state.seriesList.map((v) => (
                  <li className="list-group-item" onClick={this.handleSeriesClick} key={v.car_series}>
                    <input
                      type="radio"
                      name="checkedSeries"
                      id={v.car_series}
                      value={v.car_series}
                      checked={this.state.checkedSeries === v.car_series}
                      onChange={this.handleCheck}
                    />
                    <label htmlFor={v.car_series}>{v.car_series}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="item_list">
              <div className="item_lists_title">
                <div className="item_list_title">모델명</div>
              </div>
              <ul className="list_group">
                {this.state.modelList.map((v) => (
                  <li className="list-group-item" onClick={this.handleModelClick} key={v.car_model}>
                    <input
                      type="radio"
                      name="checkedModel"
                      id={v.car_model}
                      value={v.car_model}
                      checked={this.state.checkedModel === v.car_model}
                      onChange={this.handleCheck}
                    />
                    <label htmlFor={v.car_model}>{v.car_model}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="item_list">
              <div className="item_lists_title">
                <div className="item_list_title">상세모델</div>
              </div>
              <ul className="list_group">
                {this.state.detailList.map((v) => (
                  <li className="list-group-item" onClick={this.handleDetailClick} key={v.car_detail}>
                    <input
                      type="radio"
                      name="checkedDetail"
                      id={v.car_detail}
                      value={v.car_detail}
                      checked={this.state.checkedDetail === v.car_detail}
                      onChange={this.handleCheck}
                    />
                    <label htmlFor={v.car_detail}>{v.car_detail}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="item_list">
              <div className="item_lists_title">
                <div className="item_list_title">등급</div>
              </div>
              <ul className="list_group">
                {this.state.gradeList.map((v) => (
                  <li className="list-group-item" onClick={this.handleGradeClick} key={v.car_grade}>
                    <input
                      type="radio"
                      name="checkedGrade"
                      id={v.car_grade}
                      value={v.car_grade}
                      checked={this.state.checkedGrade === v.car_grade}
                      onChange={this.handleCheck}
                    />
                    <label htmlFor={v.car_grade}>{v.car_grade}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="option_and_price">
            <div className="option">
              <div className="item_lists_title">
                <div className="item_list_title">옵션</div>
              </div>
              <ul className="list_group">
                {this.state.optionList.map((v) => (
                  <li
                    className="list-group-item apply_display_flex_sb"
                    onClick={this.handleOptionClick}
                    key={v.car_option}
                  >
                    <input
                      type="radio"
                      name="checkedOption"
                      id={v.car_option}
                      value={v.car_option}
                      checked={this.state.checkedOption === v.car_option}
                      onChange={this.handleCheck}
                    />
                    <label htmlFor={v.car_option}>
                      <span>{v.car_option}</span>
                      <span>{`${v.car_option_price.toLocaleString()}원`}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="price">
              <div>
                차량가격 : <span>{`${carPrice.toLocaleString()}원`}</span>
              </div>
              <div>
                옵션가격 : <span>{`${optionPrice.toLocaleString()}원`}</span>
              </div>
              <hr />
              <div>
                최종가격 : <span>{`${resultPrice.toLocaleString()}원`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
