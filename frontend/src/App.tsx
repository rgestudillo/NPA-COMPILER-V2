import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProblem from "./pages/AddProblem";
import Home from "./pages/Home";
import ProblemPage from "./pages/ProblemPage";
import { asyncLogin } from "./store/authSlice";
import Playground from "./pages/Playground";
import ParseTreeDiagram from "./pages/ParseTreeDiagram";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncLogin() as any)  
  }, [dispatch]);

  return (
    <div data-color-mode="light">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
        <Route path="/create" element={<AddProblem />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/calculator" element={<ParseTreeDiagram />} />
      </Routes>
    </div>
  );
}

export default App;
