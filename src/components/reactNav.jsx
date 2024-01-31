import React from 'react'
import { Nav , Container , Navbar , Button } from 'react-bootstrap'
import { useUserAuth } from './context/UserAuthContext'

function reactNav() {
  const { user , logOut } = useUserAuth();
  return (
    <Navbar  expand="sm"  data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">ยินดีต้อนรับ 
            <h6>{user.email}</h6>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href="/">บัญชีของคุณ</Nav.Link>
              <Nav.Link href="/revenue">เพิ่มรายรับ</Nav.Link>
              <Nav.Link href="/expenese">เพิ่มรายจ่าย</Nav.Link>
              <Nav.Link href="#t">เพิ่มบัญชี</Nav.Link>
              <Nav.Link href="#t#t">ผู้พัฒนา</Nav.Link>
              <Button variant='primary' onClick={logOut} >ล็อกเอ๊าท์</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default reactNav
