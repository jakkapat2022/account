
import React , {useState} from 'react'
import { useNavigate , Link } from 'react-router-dom'
import { useUserAuth } from '../components/context/UserAuthContext';
import { Form , Alert , Button } from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useUserAuth();

    let navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        setError("");
        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    }
  return (
    <div className='row'>
        <div className="col-md-4 mx-auto">
        <h2 className='mt-6'>Login</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleLogin}>
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
                <Button variant='primary' type='submit'>ล็อกอิน</Button>
            </div>
        </Form>
        <div className="p-4 box mt-3 text-center">
            ยังไม่มีบัญชี <Link to='/register'>สมัครสมาชิก</Link>
        </div>
        </div>
    </div>
  )
}

export default Login
