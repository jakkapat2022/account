import React ,{ useState ,useEffect } from 'react'
import { Table , Navbar ,Button , Col ,Form ,Row } from 'react-bootstrap'
import { useUserAuth } from './context/UserAuthContext';
import { db } from './firebase';
import { collection, getDocs ,query ,where} from 'firebase/firestore';


function Table_revenue() {

    const { user } = useUserAuth();
    const [data_revnue, setData] = useState([]);
    const date_selected_month = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน',
                           'พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม',
                           'กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
    const date_selected_year = ['2567','2568','2569',
                           '2570'];

    async function getCities() {
        const citiesCol = query(collection(db,`record_id${user?.uid}`) ,where("type", "==", "รายรับ"));
        const querySnapshot = await getDocs(citiesCol);
        const cityList = querySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));
        setData(cityList);
        // /console.log(data_revnue)
      }
    
    async function getTable_revenue_with_date(e) {
      //console.log(`${e.target.form.revenue_select1.value} ${e.target.form.revenue_select2.value}`)
      
      const citiesCol = query(collection(db,`record_id${user?.uid}`) ,where("type", "==", "รายรับ") ,where("date_month_year", "==", `${e.target.form.revenue_select1.value} ${e.target.form.revenue_select2.value}` ));
      const querySnapshot = await getDocs(citiesCol);
      const cityList = querySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}));
      //const date_data = citySnapshot.docs.map((doc) => ({...doc.data().test,id:doc.id}));
      setData(cityList)
      
      //console.log(date_data)
    }

    const selected_map_month = date_selected_month.map((d,id) => (
      <option key={id} value={d}>{d}</option>
    ));

    const selected_map_year = date_selected_year.map((d,id) => (
      <option key={id} value={d}>{d}</option>
    ));

    let balance = 0;
  
    for(let i = 0; i <= data_revnue.length; i++){
      if(data_revnue[i]?.type == 'รายรับ'){
        balance += parseInt(data_revnue[i].value)
      }
    }

    useEffect(() => {
      getCities();
    },[user.uid])

    //console.log(data_revnue)
    

  return (
    <div>
      <Navbar className="bg-body-tertiary justify-content-end m-1">
        <Form>
          <Row>
            <Col xs="auto">
              <Form.Select size='sm' id='revenue_select1' aria-label="Default select example">
                                {selected_map_month}
              </Form.Select>
            </Col>
            <Col xs="auto">
              <Form.Select size='sm' id='revenue_select2' aria-label="Default select example">
                                {selected_map_year}
              </Form.Select>
            </Col>
            <Col xs="auto">
              <Button size='sm' variant='success' onClick={getTable_revenue_with_date}>ค้นหา</Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
        <Table responsive striped hover variant='success' className='text-center table'>
            <thead>
            <tr>
            <th className='w-20'>วันที่</th>
            <th className='w-50'>รายการ</th>
            <th className='w-10'>ประเภท</th>
            <th className='w-20'>จำนวนเงิน</th>
            </tr>
        </thead>
        <tbody>
            {data_revnue?.map((d,idx) => (
              <tr key={idx}>
                <th>{d.date}</th>
                <th>{d.name}</th>
                <th>{d.type}</th>
                <th>{d.value}</th>
              </tr>
            ))}
              <tr>
                <th></th>
                <th></th>
                <th>รวมเงิน</th>
                <th>{balance}</th>
              </tr>
        </tbody>
        </Table>
    </div>
  )
}

export default Table_revenue
