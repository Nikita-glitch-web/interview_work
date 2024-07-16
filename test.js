// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission, such as sending data to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Working with POST request</h1>

      <label>
        Your name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </label>
      <br />

      <label>
        Phone:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+38 [XXX] XXX - XX - XX"
        />
      </label>
      <br />

      <label>Select your position:</label>
      <br />
      <label>
        <input
          type="radio"
          name="position"
          value="Frontend developer"
          checked={formData.position === "Frontend developer"}
          onChange={handleChange}
        />
        Frontend developer
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="position"
          value="Backend developer"
          checked={formData.position === "Backend developer"}
          onChange={handleChange}
        />
        Backend developer
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="position"
          value="Designer"
          checked={formData.position === "Designer"}
          onChange={handleChange}
        />
        Designer
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="position"
          value="QA"
          checked={formData.position === "QA"}
          onChange={handleChange}
        />
        QA
      </label>
      <br />

      <label>
        Upload your photo:
        <input type="file" name="photo" onChange={handleChange} />
      </label>
      <br />

      <button type="submit">Sign up</button>
    </form>
  );
};

export default MyForm;
