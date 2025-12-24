import React, { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Check for empty fields
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("All fields are required.");
      setSubmittedData(null);
      return;
    }

    // 2. Check for invalid email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      setSubmittedData(null);
      return;
    }

    // 3. Success: Display data AND clear inputs
    setError("");
    setSubmittedData({ name, email, message });

    // Clear input fields upon success
    setName("");
    setEmail("");
    setMessage("");
  };

  // Helper: clear error when user starts typing again
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="App">
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleInputChange(setName)}
          placeholder="Name"
          data-testid="name-input"
        />
        <input
          type="email"
          value={email}
          onChange={handleInputChange(setEmail)}
          placeholder="Email"
          data-testid="email-input"
        />
        <textarea
          value={message}
          onChange={handleInputChange(setMessage)}
          placeholder="Message"
          data-testid="message-input"
        />
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </form>

      {error && (
        <p data-testid="error-message" className="error">
          {error}
        </p>
      )}

      {submittedData && (
        <div data-testid="submitted-data" className="submitted-data">
          <h2>Submitted Information</h2>
          <p>
            <strong>Name:</strong> {submittedData.name}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Message:</strong> {submittedData.message}
          </p>
        </div>
      )}
    </div>
  );
}

export default ContactForm;