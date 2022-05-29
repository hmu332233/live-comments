import React from 'react';

type Props = {};

function App({}: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <iframe src={location.href} />
    </div>
  );
}

export default App;
