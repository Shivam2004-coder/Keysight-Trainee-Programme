import React, { useState } from "react";

function ControlledForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    gender: "",
    terms: false
  });

  const [submittedData, setSubmittedData] = useState(null);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const submit = (e) => {
    e.preventDefault();
    setSubmittedData(form); 
    setForm({ name: "", email: "", age: "", course: "", gender: "", terms: false });
  };

  return (
    <div>
      <h2>Student Admission Form</h2>

      <form onSubmit={submit}>
        <label>Name: </label><br />
        <input name="name" value={form.name} onChange={change} placeholder="Name" />
        {!form.name && <p style={{ fontSize: "10px", color: "red" }}>*Name required</p>}
        <br />

        <label>Email: </label><br />
        <input name="email" value={form.email} onChange={change} placeholder="Email" />
        {!form.email && <p style={{ fontSize: "10px", color: "red" }}>*Email required</p>}
        <br />

        <label>Age: </label><br />
        <input name="age" value={form.age} onChange={change} placeholder="Age" />
        {!form.age && <p style={{ fontSize: "10px", color: "red" }}>*Age required</p>}
        <br />

        <select name="course" value={form.course} onChange={change}>
          <option value="">Select Course</option>
          <option>React</option>
          <option>Angular</option>
          <option>Java</option>
          <option>Python</option>
        </select>

        <br />
        <input type="radio" name="gender" value="Male" onChange={change} /> Male
        <input type="radio" name="gender" value="Female" onChange={change} /> Female

        <br />
        <input type="checkbox" name="terms" checked={form.terms} onChange={change} /> Accept Terms

        <br />
        <button disabled={!form.terms}>Submit</button>
      </form>

      {submittedData && (
        <div>
          <h3>Submitted Data</h3>
          <p>
            {submittedData.name} ,
            {submittedData.email} , 
            {submittedData.age} , 
            {" "}
            {submittedData.course} ,
            {submittedData.gender}
          </p>
        </div>
      )}
    </div>
  );
}

export default ControlledForm;
