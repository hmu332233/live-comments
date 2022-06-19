import React from 'react';

type Props = {};
function Main({}: Props) {
  return (
    <div className="hero min-h-screen bg-neutral text-neutral-content">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Live Comments</h1>
          <p className="py-6">Try QA by commenting on the live web page!</p>
        </div>
      </div>
    </div>
  );
}

export default Main;
