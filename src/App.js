import Home from './Notes/NoteManager'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import * as ROUTES from './constants/routes'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditNote from './Notes/EditNote';
import AddNote from './Notes/AddNote';

function App() {
  return (
    <div class='app'>
    <br />
    <Router>
      <Routes>
        <Route exact path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.EDIT_NOTE} element={<EditNote />} />
        <Route path={ROUTES.ADD_NOTE} element={<AddNote />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
