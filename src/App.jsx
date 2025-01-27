import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupForm from "./component/SignupForm";
import LoginForm from "./component/LoginForm";
import Homepage from "./pages/Homepage";
import Products from "./component/Products";
import PrivateContext from "./contexts/PrivateContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/signup" element={<SignupForm />} />

          <Route path="/login" element={<LoginForm />} />
          
          <Route path="/products" element={<PrivateContext><Products /></PrivateContext> } />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
