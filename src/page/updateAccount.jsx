import React, { useState } from 'react'
import { useLocation , useNavigate , Navigate } from 'react-router-dom'

//date
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//firestore
import { db } from '../components/firebase';
import { deleteDoc, doc ,updateDoc , serverTimestamp} from 'firebase/firestore';

//auth
import { useUserAuth } from '../components/context/UserAuthContext';
import { Form , FormControl , Button  , Row, Container ,Col ,FormLabel} from 'react-bootstrap'

function updateAccount() {

    const { user } = useUserAuth();
    const { state } = useLocation();

    if(!state){
        return <Navigate to="/"/>
    }
    let navigate = useNavigate();
    const [name , setName] = useState(state.name);
    const [value , setValue] = useState(state.value);
    const [type , setType] = useState(state.type);
    //const [date , setDate] = useState(new Date(state.date));
    //const [date , setDate] = useState(new Date());
    console.log(name);

    const update_account = async (e) => {
        console.log(e.target.form.selec.value)
        try {
            const ref = doc(db,`record_id${user?.uid}`,state.id);
            await updateDoc(ref , {
                name: name,
                value: value,
                type: e.target.form.selec.value,
                last_update_date: serverTimestamp()
            });
            alert('succes');
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    const mapType = (type) => {
        if (type == "รายรับ"){
            return <Form.Select id='selec' aria-label="Default select example">
                        <option value='รายรับ'>รายรับ</option>
                        <option value='รายจ่าย'>รายจ่าย</option>
                   </Form.Select>;
        }else if (type == "รายจ่าย"){
            return <Form.Select id='selec' aria-label="Default select example">
                        <option value='รายจ่าย'>รายจ่าย</option>
                        <option value='รายรับ'>รายรับ</option>
                   </Form.Select>;
        }
    }
  return (
    <div>
      <Container>
            <Row className="justify-content-md-center p-5 text-center ">
              <Col xl="6" lg="6" md="9" sm="12" >
                <Row className='table_acounting'>
                  <h4>แก้ไขรายการ</h4>
                  <Form className='p-3'>
                    <Form.Group className='mb-3'>
                        {mapType(state.type)}
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <FormControl 
                            id='name_record'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <FormControl 
                            id='value'
                            type='number'
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </Form.Group>
                    <Button onClick={update_account} variant='primary'>ยืนยัน</Button>
                </Form>
                
                </Row>
              </Col>
            </Row>
          
        </Container>
    </div>
  )
}

export default updateAccount
