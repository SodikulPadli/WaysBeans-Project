import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import SignUpModal from '../auth/SignUpModal';
import { API } from '../../config/api';

const styles = {
  title: {
    marginTop: '20px',
    fontSize: '36px',
    fontWeight: '700',
    color: '#613D2B',
  },
  btnSignUp: {
    marginTop: '50px',
    width: '100%',
    height: '50px',
    backgroundColor: '#613D2B',
    fontSize: '18px',
    fontWeight: '500',
    border: 'none',
  },
  input: {
    height: '50px',
    marginTop: '30px',
    backgroundColor: '#BCBCBC40',
    border: '2px solid #BCBCBC',
  },
  text: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    marginLeft: '5px',
    textDecoration: 'none',
    color: 'black',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

function SignInModal(props) {
  const [signUpModal, setSignUpModal] = useState(false);
  const title = 'WaysBeans';
  document.title = title;
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/login', body, config);
      console.log(response.data.data.user);
      // Handling response here
      if (response?.status === 200) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data.user,
        });

        if (response.data.data.user.status === 'admin') {
          navigate('/product-admin');
        } else {
          navigate('/product');
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login Success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          {message && message}
          <Form.Group className="mb-3">
            <Form.Label style={styles.title}>Login</Form.Label>
            <Form.Control style={styles.input} type="email" placeholder="Email" id="email" name="email" value={email} onChange={handleChange} />
            <Form.Control style={styles.input} type="password" placeholder="Password" id="password" name="password" value={password} onChange={handleChange} />
            <Button type="submit" style={styles.btnSignUp}>
              Login
            </Button>
            <Col style={styles.text}>
              <p>Don't have an account ? Klik</p>
              <a onClick={props.trigger} style={styles.link}>
                Here
              </a>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <SignUpModal show={signUpModal} onHide={() => setSignUpModal(false)} />
    </Modal>
  );
}

export default SignInModal;
