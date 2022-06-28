
const Input = (props) => {
  return (
    <>
      <div className="input">
        <input
          type="number"
          value={props.amount}
          onChange={(ev) => props.onChangeInput(ev.target.value)}
        />
        <select
          value={props.currency}
          onChange={(ev) => props.onCurrencies(ev.target.value)}
        >
          {props.currencies.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Input;
