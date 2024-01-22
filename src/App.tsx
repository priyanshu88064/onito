import Personal from './components/Personal';
import Address from './components/Address';
import Dtable from './components/Dtable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Personal/>}/>
          <Route path='/address' element={<Address/>}/>
        </Routes>
      </BrowserRouter>
      <Dtable/>
    </div>
  );
}

export default App;
