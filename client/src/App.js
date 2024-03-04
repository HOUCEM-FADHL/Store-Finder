import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom";
import AllStores from './views/AllStores';
import OneStore from './views/OneStore';
import CreateStore from './views/CreateStore';
import UpdateStore from './views/UpdateStore';

function App() {
  return (
    <div className="container bg-light m-5 p-5">
      <Routes>
        <Route path="/" element={<AllStores/>} />
        <Route path="/stores/add" element={<CreateStore/>} />
        <Route path="/stores/:id" element={<OneStore/>} />
        <Route path="/stores/edit/:id" element={<UpdateStore/>} />
      </Routes>
    </div>
  );
}

export default App;
