import React from "react";

function StudentList() {
  const students = [
    { studid: 1, studname: "Shivam", age: 22, city: "Delhi" },
    { studid: 2, studname: "Ravi", age: 23, city: "Mumbai" },
    { studid: 3, studname: "Sumanth", age: 21, city: "Bangalore" },
    { studid: 4, studname: "Rajeev", age: 24, city: "Chennai" }
  ];

  return (
    <div>
      {students.map((s) => (
        <div key={s.studid}>
          <h2>Student Name - {s.studname}</h2>
          <h3>Age - {s.age}</h3>
          <p>City - {s.city}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentList;
