import { useEffect, useState } from "react";
import Input from "./Input/Input";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("USD");
  const [currency, setCurrency] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11")
      .then((i) => {
        setData(i.data);
        console.log(i.data);
        setCurrency(true);
      });
  }, []);

  const amountChanche1 = (amount1) => {
    let b = 0;
    let a = 0;
    data.forEach((data) => {
      if (data.ccy === currency1) {
        b = data.buy;
      }
    });
    data.forEach((data) => {
      if (data.ccy === currency2) {
        a = data.buy;
      }
    });
    setAmount2(((amount1 * b) / a).toFixed(1));
    setAmount1(amount1);
  };

  const amountChanche2 = (amount2) => {
    let a = 0;
    let b = 0;
    data.forEach((data) => {
      if (data.ccy === currency1) {
        a = data.buy;
      }
    });
    data.forEach((data) => {
      if (data.ccy === currency2) {
        b = data.buy;
      }
    });
    setAmount1(((amount2 * b) / a).toFixed(1));
    setAmount2(amount2);
  };

  return (
    <>
      <div className="header">
        <div className="title">Т/З</div>
        {currency ? (
          <div className="currency">
            <span>UAH</span> : EUR = {data[1].buy}, USD = {data[0].buy}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="inputs">
     
          {" "}
          <Input
            onChangeInput={amountChanche1}
            onCurrencies={setCurrency1}
            currencies={data.map((i) => i.ccy)}
            amount={amount1}
            currency={currency1}
          />
      

      
          {" "}
          <Input
            onChangeInput={amountChanche2}
            onCurrencies={setCurrency2}
            currencies={data.map((i) => i.ccy)}
            amount={amount2}
            currency={currency2}
          />
        </div>
     
    </>
  );
};

export default Home;
