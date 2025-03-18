# React Hooks Cheat Sheet

![React Hook](https://miro.medium.com/v2/resize:fit:1400/1*HJz0SzrHdXvPG7iy2c0_hQ.png)

## Introduction
React Hooks are powerful tools that allow you to use state and lifecycle features in function components. No more class components—just clean, reusable logic! 🧼🚀

## Basic Hooks

### 1. `useState`
Manages state in functional components.

```jsx
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};
```

### 2. `useEffect`
Runs side effects in function components (e.g., API calls, subscriptions).

```jsx
import { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup function
  }, []);

  return <p>Elapsed Time: {seconds}s</p>;
};
```

### 3. `useRef`
Creates a reference to DOM elements or persists values without re-rendering.

```jsx
import { useRef } from "react";

const FocusInput = () => {
  const inputRef = useRef(null);

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </div>
  );
};
```

## Advanced Hooks

### 4. `useMemo`
Optimizes performance by memoizing computed values.

```jsx
import { useState, useMemo } from "react";

const ExpensiveCalculation = ({ num }) => {
  const computedValue = useMemo(() => {
    console.log("Computing...");
    return num * 2;
  }, [num]);

  return <p>Computed Value: {computedValue}</p>;
};
```

### 5. `useCallback`
Memoizes functions to prevent unnecessary re-renders.

```jsx
import { useCallback, useState } from "react";

const Button = ({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
};

const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={handleClick} />
    </div>
  );
};
```

### 6. `useContext`
Access global state without prop drilling.

```jsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

const ThemedComponent = () => {
  const theme = useContext(ThemeContext);
  return <p>Current Theme: {theme}</p>;
};
```

## 🎉 Conclusion
React Hooks make state management and side effects much easier in function components. Master these hooks, and you’ll write cleaner, more efficient React apps! 🚀🔥

---
💡 **Pro Tip:** Always remember dependency arrays (`[]`) in `useEffect`, `useMemo`, and `useCallback` to control when they run! Happy coding! 🎨💻
