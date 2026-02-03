import React, { useState } from "react";

function Hook() {
  const [newInstrument, setNewInstrument] = useState("");

  return (
    <div>
      <p>Old Instrument: Drums</p>
      <p>New Instrument: {newInstrument}</p>

      <button onClick={() => setNewInstrument("Violin")}>
        Show
      </button>
    </div>
  );
}

export default Hook;