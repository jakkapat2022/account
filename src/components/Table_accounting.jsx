import React ,{ useState ,useEffect } from 'react'
import ReactLoading from 'react-loading'
import { Table , Button  , Modal , 
        Form , Col , 
        Row , Navbar, Container } from 'react-bootstrap'
import { useUserAuth } from './context/UserAuthContext';
import { db } from './firebase';
import { collection, getDocs ,deleteDoc ,doc ,where ,query, orderBy, limit, startAfter ,startAt} from 'firebase/firestore';
import { Link } from 'react-router-dom';

let pigi_state = 0;
let limit_table = 10;
let pageState = 1;

function Table_accounting() {

    const { user } = useUserAuth();
    const [data, setData] = useState([]);
    const [sumval, setSum] = useState([]);
    const date_selected_month = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน',
                           'พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม',
                           'กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
    const date_selected_year = ['2567','2568','2569',
                           '2570'];
    const [state , setState] = useState(0);
    const [doc_data ,setDocdata] = useState([]);
    const [current , setCurrent] = useState('');
    const [show, setShow] = useState(false);
    const [seach_state, setSeach_state] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selected_date , setSelected_date] = useState('');


    const handleClose = () => {
      setCurrent(null);
      setShow(false)
    };
    const handleShow = (e) => {
      setShow(true)
      setCurrent(e.target.value)
    };


    async function getTable_accounting() {
       try {
          const citiesCol = query(collection(db,`record_id${user?.uid}`),orderBy('date'), limit(limit_table));
          const citySnapshot = await getDocs(citiesCol);
          const cityList = citySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));
          setData(cityList)
          pigi_state = citySnapshot.docs.length;
          console.log(data)
       } catch (error) {
        console.log('error',error);
       } finally {
         
       }

      }
    
    const getall_accounting = async () => {

      try {
        if(seach_state){
          //console.log(selected_date)
          const citiesCol = query(collection(db,`record_id${user?.uid}`),where("date_month_year", "==", selected_date ));
          const citySnapshot = await getDocs(citiesCol);
          const sum = citySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));
          setSum(sum)
          setDocdata(citySnapshot)
        }else{
          const citiesCol = query(collection(db,`record_id${user?.uid}`),orderBy('date'));
          const citySnapshot = await getDocs(citiesCol);
          const sum = citySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));
          setSum(sum)
          setDocdata(citySnapshot)
        }
      } catch (error) {
          console.log(error)
      } finally {
          setLoading(false)
      }
        
    }
    
    async function getTable_accounting_with_date(e) {
      //console.log(`${e.target.form.select1.value} ${e.target.form.select2.value}`)
      
      try {
        console.log(limit_table)
        setLoading(true)
        setSelected_date(`${e.target.form.select1.value} ${e.target.form.select2.value}`)
        const citiesCol = query(collection(db,`record_id${user?.uid}`), limit(limit_table),where("date_month_year", "==", selected_date ));
        const querySnapshot = await getDocs(citiesCol);
        const cityList = querySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));
      //const date_data = citySnapshot.docs.map((doc) => ({...doc.data().test,id:doc.id}));
        setData(cityList)
        pigi_state = querySnapshot.docs.length;
        console.log(data)
      } catch (error) {
        console.log('err',error)
      } finally {
        setSeach_state(true);
        setLoading(false)
      }
      
      
      //console.log(date_data)
    }

    

    //next table data
    const next_data = async () => {
      if(pigi_state >= doc_data.docs.length){
        return console.log('no more')
      }

      try {
        //setLoading(false)
        if(seach_state){
          console.log(pigi_state-1)
          const citiesCol = query(collection(db,`record_id${user?.uid}`),where("date_month_year", "==", selected_date ), startAfter(doc_data.docs[pigi_state-1]), limit(limit_table));
          const citySnapshot = await getDocs(citiesCol);
          const cityList = citySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));
          setData(cityList);
          pigi_state += limit_table;
          pageState += 1;
          console.log(data)
        }else{
          const citiesCol = query(collection(db,`record_id${user?.uid}`),orderBy('date'), startAfter(doc_data.docs[pigi_state-1]), limit(limit_table));
          const citySnapshot = await getDocs(citiesCol);
          const cityList = citySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));
          setData(cityList);
          pigi_state += limit_table;
          pageState += 1;
          console.log(data)
        }
      } catch (error) {
          console.log(error)
      } finally {
        //setLoading(false);
      }
        
        
        //console.log(doc_data.docs)
    }

    

    const prev_data = async () => {
      console.log(pageState)
        if(pageState <= 1){
          return console.log('no prev')
        }
        if(seach_state){
          pigi_state -= limit_table;
          console.log(pigi_state-limit_table)
          const citiesCol = query(collection(db,`record_id${user?.uid}`), 
                              startAt(doc_data.docs[pigi_state-limit_table]), 
                              limit(limit_table),
                              where("date_month_year", "==", selected_date ));
          const citySnapshot = await getDocs(citiesCol);
          const cityList = citySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));
          setData(cityList);
          console.log(data)
          
          pageState -= 1;
        }else{
          pigi_state -= limit_table;
          const citiesCol = query(collection(db,`record_id${user?.uid}`),orderBy('date'), 
                              startAt(doc_data.docs[pigi_state-limit_table]), 
                              limit(limit_table));
          const citySnapshot = await getDocs(citiesCol);
          const cityList = citySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));
          setData(cityList);
          pageState -= 1;
          console.log(data)
        }
        
        
    }
    
    const del_data = async () => {
        try {
            await deleteDoc(doc(db ,`record_id${user?.uid}` , current));
            setState(state + 1);
            setShow(false);
            setCurrent(null);
        } catch (error) {
            console.log(error)
        }
        
    }

    const selected_map_month = date_selected_month.map((d,id) => (
      <option key={id} value={d}>{d}</option>
    ));

    const selected_map_year = date_selected_year.map((d,id) => (
      <option key={id} value={d}>{d}</option>
    ));

    const sum_count = () => {
      
    }

    let balance_revenue = 0;
    let balance_expenese = 0;
    let balance = 0;
    
    
    for(let i = 0; i <= sumval.length; i++){
      
      if(sumval[i]?.type == 'รายรับ'){
        balance_revenue += parseInt(sumval[i].value)
        balance += parseInt(sumval[i].value)
      }else if(sumval[i]?.type == 'รายจ่าย'){
        balance_expenese += parseInt(sumval[i].value)
        balance -= parseInt(sumval[i].value)
      }

    }

    //console.log(balance)


    useEffect(() => {
      getTable_accounting();
      getall_accounting();
    },[user.uid ,state, seach_state])

    //console.log(doc_data)
    //console.log('prev',pageState)
    //console.log("last", doc_data.docs[doc_data.docs.length-1]);
    //console.log("prev",doc_data.docs[doc_data.docs.length-doc_data.docs.length]);

    

  return (
    <div>
      <Navbar className="bg-body-secondary justify-content-end p-2 ">
        
        <Form >
          <Row className='pt-1 pb-1'>
            <Col xs="auto flex">
              <Form.Select size='sm' id='select1' aria-label="Default select example">
                                {selected_map_month}
              </Form.Select>
              <Form.Select size='sm' className='mr-2' id='select2' aria-label="Default select example">
                                {selected_map_year}
              </Form.Select>
              <Button size='sm' onClick={getTable_accounting_with_date}>ค้นหา</Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
      {loading ? 
      <Container className='d-flex justify-content-center'>
        <div className='m-5 d-flex align-items-center'>
        <ReactLoading  type='spin' color='black' height={25} width={25} />
        <span className='ml-3'>กำลังโหลด...</span>
        </div>
          
      </Container>
      
            : 
      <>
      <Table variant='secondary' className='text-center size-text table'>
            <thead>
            <tr>
            <th className='w-10 '>วันที่</th>
            <th className='w-60'>รายการ</th>
            <th className='w-20'>ประเภท</th>
            <th className='w-10'>จำนวน</th>
            <th className='w-20'>แก้ไข</th>
            </tr>
        </thead>
        <tbody>
          {data?.map((d,idx) => (
              <tr key={idx} >
                <th className='text-left'>{d.date}</th>
                <th>{d.name}</th>
                <th>{d.type}</th>
                <th className='text-right'>{d.value}</th>
                <th>
                    <div className='flex justify-content-around '>
                        <Link to="update" className='btn btn-warning mr-1 btn-sm text-white' state={data[idx]}>แก้ไข</Link>
                        <Button onClick={handleShow} value={d.id}  variant="danger" size='sm'>ลบ</Button>     
                    </div>        
                </th>  
              </tr>
            ))}
            
              <tr>
                <th></th>
                <th>รายรับรวม</th>
                <th></th>
                <th className='text-right'>{balance_revenue}</th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th>รายจ่ายรวม</th>
                <th></th>
                <th className='text-right'>{balance_expenese}</th>
                <th></th>
              </tr>
              <tr>
                <th></th>
                <th>คงเหลือ</th>
                <th></th>
                <th className='text-right'>{balance}</th>
                <th></th>
              </tr>
        </tbody>
        </Table>
        </> }
        
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ลบรายการ</Modal.Title>
        </Modal.Header>
        <Modal.Body>คุณต้องการลบรายการนี้หรือไม่!!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={del_data}>
            ตกลง
          </Button>
        </Modal.Footer>
      </Modal>
        <Form>
          <Row className=' justify-content-center mb-2'>
            <Col xs="auto">
              {pageState > 1 ? <Button size='sm' className='rounded' onClick={prev_data}>prev</Button> : 
              <></>
              }
              
            </Col>
            <Col xs="auto">
              <h6 >หน้า {pageState}</h6>
            </Col>
            <Col xs="auto">
              {pigi_state <= doc_data?.docs?.length ? <Button size='sm' className='rounded' onClick={next_data}>Next</Button> : 
              <></>}
              
            </Col>
          </Row>
        </Form>
    </div>
  )
}

export default Table_accounting
