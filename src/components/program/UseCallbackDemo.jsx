import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// --- CHILD COMPONENT (Wrapped in React.memo) ---
// React.memo says: "Only re-render if props have actually changed."
const ButtonChild = React.memo(({ handleClick, label }) => {
  console.log(`🔄 ${label} rendered at ${new Date().toLocaleTimeString()}`);
  return (
    <button
      onClick={handleClick}
      type="button"
      className="inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 active:scale-95"
    >
      {label}
    </button>
);});

ButtonChild.displayName = 'ButtonChild';
// PropTypes validation to satisfy ESLint rules
ButtonChild.propTypes = {
  handleClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

// --- PARENT COMPONENT ---
// --- PARENT COMPONENT ---
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);

  // 1. WITHOUT useCallback:
  // This function is re-created every time the component re-renders.
  // Because it's a "new" function reference, ButtonChild will re-render unnecessarily.
  const incrementCount = () => {
    console.log('➕ incrementCount called');
    setCount((c) => c + 1);
  };

  // 2. WITH useCallback:
  // This function is cached/stabilized. Even if the parent re-renders, this function
  // reference stays the same because its dependency array is empty [].
  // ButtonChild will NOT re-render when parent re-renders.
  const toggleActive = useCallback(() => {
    console.log('🔄 toggleActive called');
    setActive((prev) => !prev);
  }, []); // <--- Empty dependency array = function never changes

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl my-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          useCallback Demo
        </h1>
        <p className="text-gray-600 mb-6">
          Open browser console to see re-render logs
        </p>
      </div>

      <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-8 border border-gray-200 shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="text-4xl font-bold text-blue-600 mb-2 tabular-nums">{count}</h2>
            <p className="text-gray-600 font-semibold text-lg">Count</p>
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Live Counter
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg transition-colors duration-300 ${
              active
                ? 'bg-linear-to-br from-green-500 to-green-600'
                : 'bg-linear-to-br from-red-500 to-red-600'
            }`}>
              <span className="text-2xl">{active ? '✅' : '❌'}</span>
            </div>
            <h2 className={`text-4xl font-bold mb-2 tabular-nums transition-colors duration-300 ${
              active ? 'text-green-600' : 'text-red-600'
            }`}>
              {active.toString().toUpperCase()}
            </h2>
            <p className="text-gray-600 font-semibold text-lg">Active</p>
            <div className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
              active
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {active ? 'Enabled' : 'Disabled'}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-linear-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-2xl shadow-md">
          <div className="flex items-start space-x-4">
            <div className="shrink-0">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-yellow-800 mb-3">Without useCallback:</h3>
              <p className="text-yellow-700 text-base mb-6 leading-relaxed">
                This button will cause the child component to re-render every time <strong>ANY</strong> state changes
                in the parent (count OR active). Check the console logs - you'll see "Increment Count rendered"
                even when clicking the other button! This demonstrates the performance problem.
              </p>
              <div className="flex justify-center">
                <ButtonChild handleClick={incrementCount} label="Increment Count" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-6 rounded-2xl shadow-md">
          <div className="flex items-start space-x-4">
            <div className="shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-green-800 mb-3">With useCallback:</h3>
              <p className="text-green-700 text-base mb-6 leading-relaxed">
                This button is memoized with useCallback, so the child component will NOT re-render
                when parent state changes. Check console logs - you'll see "Toggle Active rendered" only
                when this specific button is clicked! This demonstrates the performance solution.
              </p>
              <div className="flex justify-center">
                <ButtonChild handleClick={toggleActive} label="Toggle Active" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-800 mb-4">useCallback vs useMemo</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-200">
                <th className="text-left py-2 px-3 font-semibold text-blue-800">Feature</th>
                <th className="text-left py-2 px-3 font-semibold text-blue-800">useMemo</th>
                <th className="text-left py-2 px-3 font-semibold text-blue-800">useCallback</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-blue-100">
                <td className="py-2 px-3 font-medium">What does it return?</td>
                <td className="py-2 px-3">Returns a memoized value (result of a function)</td>
                <td className="py-2 px-3">Returns a memoized function itself</td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-2 px-3 font-medium">Use Case</td>
                <td className="py-2 px-3">Caching expensive calculations (e.g., filtering a huge array)</td>
                <td className="py-2 px-3">Caching event handlers passed to children</td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-2 px-3 font-medium">Syntax</td>
                <td className="py-2 px-3"><code className="bg-blue-100 px-1 rounded">const value = useMemo(fn, deps)</code></td>
                <td className="py-2 px-3"><code className="bg-blue-100 px-1 rounded">const fn = useCallback(fn, deps)</code></td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Equivalence</td>
                <td className="py-2 px-3" colSpan={2}>
                  <code className="bg-blue-100 px-1 rounded">useCallback(fn, deps)</code> is equivalent to{' '}
                  <code className="bg-blue-100 px-1 rounded">useMemo(() =&gt; fn, deps)</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ParentComponent;