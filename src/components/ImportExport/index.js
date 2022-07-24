import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {addTransactionAction} from "../../reducers/transactions";
import "./ImportExport.css";

function ImportExport({transactions, addTransaction}) {
    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        const array = csvRows.map(i => {
          const values = i.split(",");
          const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
          }, {});
          return obj;
        });
        array.forEach((element) => {
            addTransaction(transaction);
        });
    };

    const arrayToCsvFile = dataObject => {
        const keys = Object.keys(dataObject);
        if(keys.length) {
            const columnHeaders = Object.keys(dataObject[keys[0]]);
            let csv = "";
            columnHeaders.map((header) => {
                csv += header + ',';
            });
            csv = csv.substring(0, csv.length - 1);
            csv += '\n';
            keys.map((key) => {
                const transaction = dataObject[key];
                csv += transaction.TransactionId + ',';
                csv += transaction.Status + ',';
                csv += transaction.Type + ',';
                csv += transaction.ClientName + ',';
                csv += transaction.Amount + '\n';
            });
            const file = new Blob([csv], {type: "text/csv"});
            const filename = "transactions.csv"
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, filename);
            else {
                const a = document.createElement("a"),
                url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);  
                }, 0); 
            }
        }
    }
    
    function handleImport(e) {
        const file = e.target.files[0];
        const fileReader = new FileReader();

        if (file) {
            fileReader.onload = function(event) {
                const text = event.target.result;
                csvFileToArray(text);
            };

            fileReader.readAsText(file);
        };
    }

    function handleExport(e) {
        arrayToCsvFile(transactions);
    }

    return (
        <div className = "importExport">
            <div className = "buttonContainer">
                <label htmlFor = "file-upload" className = "file">
                    Import
                </label>
                <input id = "file-upload" type = "file" accept = ".csv" onChange = {handleImport}/>
            </div>
            <div className = "buttonContainer">
                <Button className = "file" variant="light" onClick = {handleExport}>Export</Button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTransaction: (transaction) => dispatch(addTransactionAction(transaction))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportExport);