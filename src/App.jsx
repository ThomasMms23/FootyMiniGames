import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Flagrank } from "./pages/Flagrank";
import { Error } from "./pages/Error";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Error />} />
                <Route path="/Flagrank" element={<Flagrank />} />
            </Routes>
        </>
    );
}

export default App;
