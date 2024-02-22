import { useState } from 'react';
import './app.css';

export default () => {
  const [count, setCount] = useState(1);
  const increment = () => setCount((count) => count + 1);

  return (
    <div>
      <p>This is React. {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};
