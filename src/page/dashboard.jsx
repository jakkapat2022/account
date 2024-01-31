import React , { useState ,useEffect}from 'react'
import Nav from '../components/reactNav.jsx'
import Table_accounting from '../components/Table_accounting.jsx';
import { Container , Row , Col } from 'react-bootstrap';
import { useUserAuth } from '../components/context/UserAuthContext.jsx';
import Table_revenue from '../components/Table_revenue.jsx';
import Table_expenese from '../components/Table_expenese.jsx';

function dashboard() {

  const { user } = useUserAuth();
 
  return (
    <div>
        <Nav />
        
            <Container className='pt-3 text-center'>
              <h1>รายการบัญชี</h1>
                  <Table_accounting/>
            </Container>
              
            
          
       
    </div>
  )
}

export default dashboard
