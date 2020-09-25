import React from 'react';

// module
import ChartEditor from 'modules/ChartEditor';

// components
import Header from 'components/Header';

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <main>
          <ChartEditor />
        </main>
      </div>
    </>
  );
}

export default App;
