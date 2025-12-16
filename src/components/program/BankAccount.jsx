import React, { useReducer, useState } from 'react';

// Step 1: Define the initial state
const initialState = { balance: 0 };

// Step 2: Define the reducer function
// state: current data
// action: object containing { type, payload }
const bankingReducer = (state, action) => {
  switch (action.type) {
    case 'DEPOSIT':
      return { balance: state.balance + action.payload };

    case 'WITHDRAW':
      // Prevent negative balance (business logic example)
      if (state.balance < action.payload) return state;
      return { balance: state.balance - action.payload };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

const BankAccount = () => {
  // Step 3: Initialize the hook
  // dispatch is the function used to send commands to the reducer
  const [state, dispatch] = useReducer(bankingReducer, initialState);

  const [amount, setAmount] = useState(0);
  const [lastAction, setLastAction] = useState(null);

  const handleAction = (type, payload) => {
    if (type === 'DEPOSIT' && payload > 0) {
      dispatch({ type, payload });
      setLastAction({ type: 'deposit', amount: payload });
    } else if (type === 'WITHDRAW' && payload > 0 && state.balance >= payload) {
      dispatch({ type, payload });
      setLastAction({ type: 'withdraw', amount: payload });
    } else if (type === 'RESET') {
      dispatch({ type });
      setLastAction({ type: 'reset' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50 rounded-3xl shadow-2xl border border-gray-200/50 p-8 md:p-10 my-8 max-w-lg mx-auto">
      {/* Background decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-linear-to-tr from-emerald-200/20 to-green-200/20 rounded-full blur-lg"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2">
            Bank Account
          </h2>
          <p className="text-gray-600 font-medium">Manage your balance with useReducer</p>
        </div>

        {/* Balance Display */}
        <div className="relative bg-linear-to-r from-emerald-50 via-green-50 to-teal-50 border-2 border-emerald-200/60 rounded-2xl p-8 mb-8 text-center shadow-inner">
          <div className="absolute inset-0 bg-linear-to-r from-emerald-100/50 to-green-100/50 rounded-2xl opacity-50"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl mb-3">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <p className="text-sm font-semibold text-emerald-700 mb-2 uppercase tracking-wide">Current Balance</p>
            <p className="text-5xl md:text-6xl font-bold text-emerald-800 mb-1">${state.balance.toFixed(2)}</p>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-600 font-medium">Live Balance</span>
            </div>
          </div>
        </div>

        {/* Last Action Display */}
        {lastAction && (() => {
          let actionBgClass;
          if (lastAction.type === 'deposit') {
            actionBgClass = 'bg-green-100';
          } else if (lastAction.type === 'withdraw') {
            actionBgClass = 'bg-red-100';
          } else {
            actionBgClass = 'bg-gray-100';
          }

          return (
            <div className="bg-linear-to-r from-gray-50 to-slate-50 border border-gray-200/60 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${actionBgClass}`}>
                {lastAction.type === 'deposit' && (
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                )}
                {lastAction.type === 'withdraw' && (
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                )}
                {lastAction.type === 'reset' && (
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                )}
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {lastAction.type === 'deposit' && `Deposited $${lastAction.amount.toFixed(2)}`}
                  {lastAction.type === 'withdraw' && `Withdrew $${lastAction.amount.toFixed(2)}`}
                  {lastAction.type === 'reset' && 'Account Reset'}
                </p>
              </div>
            </div>
          </div>
          );
        })()}

        {/* Amount Input */}
        <div className="mb-8">
          <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-3">
            Transaction Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 font-semibold">$</span>
            </div>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg font-semibold bg-white shadow-sm"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => handleAction('DEPOSIT', amount)}
            disabled={amount <= 0}
            className="group relative px-6 py-4 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span className="text-xs">Deposit</span>
            </div>
          </button>

          <button
            onClick={() => handleAction('WITHDRAW', amount)}
            disabled={amount <= 0 || state.balance < amount}
            className="group relative px-6 py-4 bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              <span className="text-xs">Withdraw</span>
            </div>
          </button>

          <button
            onClick={() => handleAction('RESET')}
            className="group relative px-6 py-4 bg-linear-to-r from-gray-600 to-slate-700 hover:from-gray-700 hover:to-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span className="text-xs">Reset</span>
            </div>
          </button>
        </div>

        {/* Transaction Guide */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl p-6">
          <h3 className="text-sm font-bold text-blue-800 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Transaction Guide
          </h3>
          <div className="space-y-2 text-xs text-blue-700">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 shrink-0"></div>
              <p><strong>Deposit:</strong> Add money to your balance</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
              <p><strong>Withdraw:</strong> Remove money (prevents negative balance)</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full mt-1.5 shrink-0"></div>
              <p><strong>Reset:</strong> Clear balance to $0.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccount;