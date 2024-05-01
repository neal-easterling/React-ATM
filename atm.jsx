const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="300" value="Submit" id="submit-input" disabled={isValid}></input>
    </label>
  );
};

const Ledger = ({transactionLog}) => {
  return (
    <div className="container ledger">
      <h3>Transactions</h3>
      <ul>
       {transactionLog.map((value) => {
        console.log('triggered');
          return <li>{value[0]} : ${value[1]}</li>;
        })}
      </ul>
    </div>
  )
}

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [transactionLog, setTransactionLog] = React.useState([]);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    //console.log(`handleChange ${event.target.value}`);
    if(event.target.value <= 0) {
      setValidTransaction(false);
      return;
    }
    if(atmMode == 'Cash Back' && event.target.value > totalState){
      setValidTransaction(false)
    }else{
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    setTransactionLog([...transactionLog, [atmMode, deposit]]);
    event.preventDefault();
  };
  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    let isDeposit = true;
    if(event.target.value == 'Cash Back') isDeposit = false;
    if(event.target.value == "") return;
    setIsDeposit(isDeposit);
  }

  return (
    <section>
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      {
        atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={!validTransaction}></ATMDeposit>
      }
      
    </form>
    <Ledger transactionLog={transactionLog} />
    </section>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
