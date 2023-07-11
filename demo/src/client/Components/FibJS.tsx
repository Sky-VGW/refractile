import React, { useState, useEffect } from 'react';
import { FibJSProps, FibResult } from '../../types';

const FibJS = (props: FibJSProps): JSX.Element => {
  //create state hooks for FibC where needed
  const [fibFetched, setFibFetched] = useState<boolean>(false);
  const [fibCFetched, setFibCFetched] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [fibCIsLoading, setFibCIsLoading] = useState<boolean>(false);
  const [fibInput, setFibInput] = useState<number>(41);
  const [fibResult, setFibResult] = useState<number>(0);
  const [fibTime, setFibTime] = useState<number>(0);
  const [fibCTime, setFibCTime] = useState<number>(0);

  const handleClick = async (route: string) => {
    if (route === 'fib-js'){
      setIsLoading(true);
      setFibFetched(false);      
    } else if (route === 'fib-c'){
      setFibCIsLoading(true);
      setFibCFetched(false);
    }
    // work on making handleClick work for fib c and fib js
    const start: number = Date.now();
    try {
      const response = await fetch(`/api/${route}/${fibInput}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFibResult(data.result);
        const timeTaken: number = Date.now() - start;
        if (route === 'fib-js'){
          setFibTime(timeTaken);
          setIsLoading(false);
          setFibFetched(true);          
        } else if (route === 'fib-c'){
          setFibCTime(timeTaken);
          setFibCIsLoading(false);
          setFibCFetched(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex-col gap-3">
      <h3>
        Click the button to calculate a big Fibonacci sequence in JavaScript
      </h3>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="50"
          value={fibInput}
          onChange={(e) => setFibInput(Number(e.target.value))}
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-primary" onClick={() => {
          handleClick('fib-c');
          handleClick('fib-js');
        }}>
          Run Fibonacci
        </button>
      </div>

      <div className="py-4">
        {isloading && (
          <>
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2 bg-primary rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2.5 bg-primary rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        )}

        {fibFetched && (
          <>
            <p>{`The result of JS Fibonacci is: ${fibResult}`}</p>
            <p>{`The time it took is: ${fibTime / 1000} seconds`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FibJS;
