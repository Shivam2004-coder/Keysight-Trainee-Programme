import React, { useState } from "react";

function ErrorComp1({ add }) {
  try {
    throw new Error("from first component");
  } catch (e) {
    add(e.message);
    return null;
  }
}

function Comp2({ add }) {
  add("you are doing well !!");
  return null;
}

function ErrorComp3({ add }) {
  try {
    throw new Error("from third component");
  } catch (e) {
    add(e.message);
    return null;
  }
}

export default function App() {
  const [messages, setMessages] = useState([]);

  const add = (msg) =>
    setMessages((prev) => (prev.includes(msg) ? prev : [...prev, msg]));

  return (
    <div>
      <ErrorComp1 add={add} />
      <Comp2 add={add} />
      <ErrorComp3 add={add} />

      <hr />
      {messages.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </div>
  );
}
