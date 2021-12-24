import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route, Link, Outlet} from "react-router-dom";
import AddContact from './AddContact';
import EditContact from './EditContact';
import Contact from './Contact';
import Nav from './Nav';

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Contact />} />
                <Route path="/add-contact" element={<AddContact />} />
                <Route path="/edit-contact/:id" element={<EditContact />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
