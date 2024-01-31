import React , { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { Form , Alert , Button } from 'react-bootstrap';
import { useUserAuth } from '../components/context/UserAuthContext'

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signUp } = useUserAuth();

    let navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            navigate("/");
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    };

  return(
    <div className='row'>
        <div className="col-md-4 mx-auto">
        <h2 className='mt-6'>Register</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control
                    type='email'
                    placeholder='example@gmail.com'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Control
                    type='password'
                    placeholder='********'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <div className='d-grid gap-2'>
                <Button variant='primary' type='submit'>สมัครสมาชิก</Button>
            </div>
        </Form>
        <div className="p-4 box mt-3 text-center">
            มีบัญชีเรียบร้อยแล้ว <Link to='/login'>ล็อกอิน</Link>
        </div>
        </div>
    </div>
  )
}

export default Register
