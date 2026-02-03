import React, { useRef } from "react";

function UnControlledForm() {
  const nameRef = useRef();
  const courseRef = useRef();
  const msgRef = useRef();
  const rateRef = useRef();

  const submit = (e) => {
    e.preventDefault();
    alert(
      `${nameRef.current.value}\n${courseRef.current.value}\n${msgRef.current.value}\nRating: ${rateRef.current.value}`
    );
    e.target.reset();
  };

  return (
    <div>
      <h2>Course Feedback Form</h2>

      <form onSubmit={submit}>  
        <label>Name: </label><br />
        <input ref={nameRef} placeholder="Student Name" /><br />

        <label>Course Name: </label><br />
        <input ref={courseRef} placeholder="Course Name" /><br />

        <label>Feedback: </label><br />
        <textarea ref={msgRef} placeholder="Feedback" /><br />

        <label>Rating: </label><br />
        <input ref={rateRef} type="number" min="1" max="5" placeholder="Rating" /><br />
        <button>Submit</button><br />
      </form>
    </div>
  );
}

export default UnControlledForm