import React from 'react';
import { useHistory } from 'react-router';
import './index.css';

function NotFound() {
  const history=useHistory();
  return (
    <div className="not-found">
      <h2>This is not the page you are looking for</h2>
      <button onClick={()=>history.push("/")}>Back</button>
    </div>
  );
}

export default NotFound;
