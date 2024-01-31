import React,{ useState } from 'react'
import { db } from '../components/firebase'
import { serverTimestamp, addDoc , collection} from 'firebase/firestore'
import { Form , Alert , Button, FormControl , Container ,Row ,Col} from 'react-bootstrap';
import { useUserAuth } from '../components/context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Expenese() {
    const { user } = useUserAuth();
    const [name , setName] = useState("");
    const [value , setValue] = useState(0);
    const [date , setDate] = useState(new Date());
    let navigate = useNavigate();

    const handleDate = (d) => {
        setDate(d)
        
    }

    const handleSubmit = async () =>{
        if(value <= 0){
            return alert('กรุณาใส่จำนวนเงิน');
        }
        if(date == ""){
            return alert('กรุณาใส่วันที่');
        }
        try {
            const docRef = await addDoc(collection(db, `record_id${user?.uid}`), {
                name: name,
                value: value,
                type: "รายจ่าย",
                date: date.toLocaleDateString('th-TH'),
                date_isos:date.toISOString(),
                date_month_year: date.toLocaleString('default', { month: 'long' ,year: 'numeric' }),
                server_date: serverTimestamp(),
              });
            alert(`บันทึกรายรับของ ${user?.email} สำเร็จ`);
            console.log("Success Document written with ID: ");
            navigate("/");
        } catch (error) {
            alert(error);
            console.log('error',error);
        }
    }
  return (
    <div>
        <Container>
            <Row className="justify-content-md-center p-5 text-center ">
              <Col xl="6" lg="6" md="9" sm="12" >
                <Row className='table_acounting'>
                  <h4>บันทึกรายจ่าย</h4>
                  <Form className='p-3'>
                    <Form.Group className='mb-3'>
                        <FormControl 
                            id='name_record'
                            type='text'
                            placeholder='รายจ่าย....'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <FormControl 
                            id='value'
                            type='number'
                            placeholder='จำนวนเงิน....'
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <div className="input-group mb-3">
                            <DatePicker 
                             className='form-control' 
                             dateFormat={'dd-MM-yyyy'}
                             maxDate={new Date()}
                             selected={date} 
                             onChange={handleDate}/>
                        </div>
                    </Form.Group>
                    <Button variant='primary' onClick={handleSubmit}>บันทึก</Button>
                </Form>
                
                </Row>
              </Col>
            </Row>
          
        </Container>
    </div>
  )
}

export default Expenese
