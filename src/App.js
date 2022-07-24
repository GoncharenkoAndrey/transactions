import Transactions from "./components/Transactions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import ImportExport from "./components/ImportExport";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="transactionsContainer">
      <Header />
      <div className = "actionsContainer">
        <Filter />
        <ImportExport />
      </div>
      <Transactions />
    </div>
  );
}

export default App;
