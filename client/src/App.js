import {BrowserRouter,Routes,Route} from "react-router-dom"
import Homepage from "./Chatpages/Home";
import Chatpage from "./Chatpages/Chat";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/chat" element={<Chatpage/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
