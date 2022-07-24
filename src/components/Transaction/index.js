import Button from "react-bootstrap/Button";
import "./Transaction.css";

function Transaction({transaction, editTransaction, deleteTransaction}) {
    return (
        <tr className = "transactionRow">
            <td>{transaction.TransactionId}</td>
            <td>{transaction.Status}</td>
            <td>{transaction.Type}</td>
            <td>{transaction.ClientName}</td>
            <td>${transaction.Amount}</td>
            <td>
                <div className="actions">
                    <Button
                        className = "actionButton editButton"
                        variant = "light"
                        onClick = {() => editTransaction(transaction.TransactionId)}
                    >
                        Edit
                    </Button>
                    <Button
                        className = "actionButton"
                        variant = "light"
                        onClick = {() => deleteTransaction(transaction.TransactionId)}
                    >
                        Delete
                    </Button>
                </div>
            </td>
        </tr>
    );
}
export default Transaction;