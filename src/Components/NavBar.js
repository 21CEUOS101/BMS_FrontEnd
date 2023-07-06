
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function NavBar() {

    const [cssClass1, Toggle1] = useState(false);
    const [cssClass2, Toggle2] = useState(false);
    const [cssClass3, Toggle3] = useState(false);
    const [cssClass4, Toggle4] = useState(false);
    const [cssClass5, Toggle5] = useState(false);
    const [cssClass6, Toggle6] = useState(false);
    const [cssClass7, Toggle7] = useState(false);

    var arr = [Toggle1,Toggle2,Toggle3,Toggle4,Toggle5,Toggle6,Toggle7];

    const MakeActive = (id) => {
        arr.map((e,index) => {
            if (index === id)
            {
                e(true);
            }
            else
            {
                e(false);
            }
            return null;
        })
    }
  return (
    <Navbar  expand="lg" className="bg-body-tertiary navbar">
      <Container>
        <Navbar.Brand>BMS</Navbar.Brand>
        <Navbar.Toggle ariaControls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <div>
            <Link to="/" class={cssClass1 ? "active" : ""} onClick={() => {MakeActive(0)}}>Home</Link>
            <Link to="/myBlogs" class={cssClass2 ? "active" : ""} onClick={() => {MakeActive(1)}}>My Blogs</Link>
            <Link to="/profile" class={cssClass3 ? "active" : ""} onClick={() => { MakeActive(2) }}>Profile</Link>
            <Link to="/makeBlog" class={cssClass7 ? "active" : ""} onClick={() => {MakeActive(6)}}>MakeBlog</Link>
            <Link to="/register" class={cssClass5 ? "active" : ""} onClick={() => {MakeActive(4)}}>Register</Link>
            <Link to="/login" class={cssClass4 ? "active" : ""} onClick={() => {MakeActive(3)}}>Login</Link>
            <Link to="/logout" class={cssClass6 ? "active" : ""} onClick={() => {MakeActive(5)}}>LogOut</Link>
          </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;