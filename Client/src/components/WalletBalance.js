import React, { useEffect, useState } from "react";
import axios from "axios";

const WalletBalance = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const balanceResponse = await axios.get("/api/wallet/balance");
        const transactionsResponse = await axios.get(
          "/api/wallet/transactions"
        );

        setBalance(balanceResponse.data.balance);
        setTransactions(transactionsResponse.data.transactions);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchWalletData();
  }, []);

  const handleWithdraw = async () => {
    if (amount > 0) {
      try {
        await axios.post("/api/wallet/withdraw", { amount });
        setBalance((prev) => prev - amount);
        setTransactions((prev) => [...prev, { type: "Withdrawal", amount }]);
        setAmount("");
      } catch (error) {
        console.error("Error withdrawing funds:", error);
      }
    }
  };

  const handleTransfer = async () => {
    if (amount > 0 && recipient) {
      try {
        await axios.post("/api/wallet/transfer", { amount, recipient });
        setBalance((prev) => prev - amount);
        setTransactions((prev) => [
          ...prev,
          { type: "Transfer", amount, recipient },
        ]);
        setAmount("");
        setRecipient("");
      } catch (error) {
        console.error("Error transferring funds:", error);
      }
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">My Wallet</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">
          Balance: ${balance.toFixed(2)}
        </h3>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Transaction History</h3>
        <ul className="space-y-2">
          {transactions.map((tx, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded-md">
              {tx.type}: ${tx.amount} {tx.recipient && `to ${tx.recipient}`}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Request a Withdrawal</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Amount"
        />
        <button
          onClick={handleWithdraw}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Withdraw
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Transfer Funds</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Amount"
        />
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mt-2"
          placeholder="Recipient"
        />
        <button
          onClick={handleTransfer}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Transfer
        </button>
      </div>
    </div>
  );
};

export default WalletBalance;
