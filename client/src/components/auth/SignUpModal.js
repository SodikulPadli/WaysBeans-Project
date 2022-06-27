import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import SignInModal from '../auth/SignInModal';
// Import useMutation from react-query here ...
import { useMutation } from 'react-query';

// Get API config here ...
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

function SignUpModal(props) {
  const title = 'WaysBeans';
  document.title = title;
  const [signInModal, setSignInModal] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { fullName, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create function for handle insert data process
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
      const response = await API.post('/register', body, config);
      // Handling response here
      const alert = (
        <Alert variant="success" className="py-1">
          Register Success
        </Alert>
      );
      setMessage(alert);
      setForm({
        fullName: '',
        email: '',
        password: '',
      });
      console.log(response.data.data);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      setForm({
        fullName: '',
        email: '',
        password: '',
      });
      console.log(error);
    }
  });
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          {message && message}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={styles.title}>Register</Form.Label>
            <Form.Control style={styles.input} type="text" placeholder="Name" name="fullName" value={fullName} onChange={handleChange} />
            <Form.Control style={styles.input} type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />
            <Form.Control style={styles.input} type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
            <Button style={styles.btnSignUp} type="submit">
              Register
            </Button>
            <Col style={styles.text}>
              <p>Already have an account ? Klik</p>
              <a onClick={props.trigger} style={styles.link}>
                Here
              </a>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <SignInModal show={signInModal} onHide={() => setSignInModal(false)} />
    </Modal>
  );
}

export default SignUpModal;
