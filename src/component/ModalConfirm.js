import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";


const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;

    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete);
        // dấu (+) trường hợp trả về string thì sẽ convert về number
        if (res && +res.statusCode === 204) {
            toast.success('Xóa thành công');
            //đóng modal
            handleClose();
            //cập nhật lại list user
            handleDeleteUserFromModal(dataUserDelete);
        } else {
            toast.error('Xóa thất bại');
        }
        console.log('res', res);
    }
    return (
        <>

            <Modal show={show} onHide={handleClose} backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        Bạn có chắc chắn muốn xóa người dùng <b>{dataUserDelete.email}</b>?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ModalConfirm;