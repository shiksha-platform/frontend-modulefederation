import React from "react";
import "./App.css";
import Login from "pages/Login";
import { NativeBaseProvider } from "native-base";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <NativeBaseProvider>
      <>
        <Router>
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </>
    </NativeBaseProvider>
  );
}

export default App;
