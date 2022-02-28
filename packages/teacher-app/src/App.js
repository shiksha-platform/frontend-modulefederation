import React from "react";
import "./App.css";


const AppShell = React.lazy(() => import("core/AppShell"));

function App() {
  return (

    <React.Suspense fallback="Loading ">
      
    <div className="App">
      <header className="App-header">
        <div>Teacher's Diary</div>
        <AppShell/>
      </header>
    </div>
    
    </React.Suspense>
  );
}

export default App;
