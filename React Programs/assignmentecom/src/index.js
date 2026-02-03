import React from 'react';
import ReactDOM from 'react-dom';
import Hook from './Hook';
import NameList from './listDemo';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Hook />);

const myList = ["Shivam","Sumanth","Ravi","Rajeev"];
// ReactDOM.render(<NameList myList={myList} /> , document.getElementById("root"));

ReactDOM.render(
  <React.StrictMode>
    <NameList myList={myList} />
  </React.StrictMode>,
  document.getElementById("root")
);
