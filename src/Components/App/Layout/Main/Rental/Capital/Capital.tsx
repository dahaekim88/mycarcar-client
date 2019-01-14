import "./Capital.css";

import React, { MouseEvent } from "react";

import { ICapitalList, ABOVE21, ABOVE26 } from "../Rental";

interface ICapitalProps {
  totalPrice: number;
  capitalList: ICapitalList[];
  rentalPeriod: number;
  insurancePlan: string;
  deposit: number;
  advancePay: number;

  handleModal: (e: MouseEvent<HTMLInputElement>) => void;
}

export const Capital = (props: ICapitalProps) => {
  const { totalPrice, capitalList, rentalPeriod, insurancePlan, deposit, advancePay } = props;
  const insurancePrice = insurancePlan === "21세 이상" ? ABOVE21 : ABOVE26;

  return (
    <div className="capital-list">
      <div className="capital-list-head">
        <div>캐피탈사</div>
        <div>총 렌탈 금액</div>
        <div>월 렌탈료</div>
        <div>견적서 보기</div>
      </div>
      {capitalList
        .sort((a, b) => (a.capital_profit > b.capital_profit ? 1 : b.capital_profit > a.capital_profit ? -1 : 0))
        .map((capital) => {
          const finalRent = totalPrice * (1 + capital.capital_profit / 100) + insurancePrice;
          const monthlyRend = (finalRent - (finalRent * deposit + finalRent * advancePay)) / rentalPeriod;

          return (
            <div className="capital-list-content" key={capital.capital_name}>
              <div>{capital.capital_name}</div>
              <div>{`${Math.floor(finalRent).toLocaleString()}원`}</div>
              <div>{`${Math.floor(monthlyRend).toLocaleString()}원`}</div>
              <div>
                <input
                  type="button"
                  value="보기"
                  data-capital={capital.capital_name}
                  data-profit={capital.capital_profit}
                  onClick={props.handleModal}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};
