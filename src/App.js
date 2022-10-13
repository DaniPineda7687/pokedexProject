import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen.js";
function App() {
  return (
      <BrowserRouter>
        <div className="App">
        <ToastContainer position='bottom-center' limit={1}/>
          <Routes>
            <Route path="/" element={<HomeScreen/>} />
            <Route path="search-pokemon:name" element={<SearchScreen/>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
