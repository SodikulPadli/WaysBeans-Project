import { Modal, Button } from 'react-bootstrap';

export default function DeleteData({ show, handleClose, setConfirmDelete }) {
  const handleDelete = () => {
    setConfirmDelete(true);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-dark">
        <div style={{ fontSize: '20px', fontWeight: '900', color: 'red', justifyContent: 'center' }}>Info Penting</div>
        <div style={{ fontSize: '16px', fontWeight: '500' }} className="mt-2">
          Mohon Maaf untuk sementara Fitur tidak dapat digunakan?
        </div>
        <div className="text-end mt-5">
          <Button onClick={handleClose} size="sm" className="btn-danger me-2" style={{ width: '135px' }}>
            Back
          </Button>
          {/* <Button onClick={handleClose} size="sm" className="btn-danger" style={{ width: '135px' }}>
            No
          </Button> */}
        </div>
      </Modal.Body>
    </Modal>
  );
}
