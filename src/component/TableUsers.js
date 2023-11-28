import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _, { debounce } from "lodash";
import "./TableUser.scss";

const TableUsers = () => {

    const [listUsers, setListUser] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState([]);
    const [dataUserDelete, setDataUserDelete] = useState([]);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");
    //khi có button search -> khi click sẽ cần lấy ra state của nó
    const [keyword, setKeyWord] = useState("");
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    }
    const handleUpdateTableUser = (user) => {
        setListUser([user, ...listUsers]);
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUser[index].first_name = user.first_name;
        setListUser(cloneListUser);
    }

    useEffect(() => {
        getUsers(2);
    }, [])


    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setTotalUsers(res.total);
            setListUser(res.data);
            setTotalPages(res.total_pages);
        }

    }

    const handlePageClick = (event) => {
        //dấu + ở đầu để convert string -> number
        getUsers(+event.selected + 1);
    }
    const handleEditUser = (user) => {
        if (user) {
            setDataUserEdit(user);
            setIsShowModalEdit(true);
        }
    }

    const handleDeteleUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    }
    const handleDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser = listUsers.filter(item => item.id !== user.id)
        setListUser(cloneListUser);
    }
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUser(cloneListUser);
    }
    //deboune set thời gian trả ra kết quả. ví dụ search gõ rồi 1 khoảng thời gian mới trả ra kết quả.
    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUser = _.cloneDeep(listUsers);
            cloneListUser = cloneListUser.filter(item => item.email.includes(term));
            setListUser(cloneListUser);
        } else {
            getUsers(1);
        }
        console.log(event.target.value);
    }, 500)
    return (
        <>
            <div className='my-3 add-new'>
                <span><b>List Users:</b></span>
                <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>Add new</button>
            </div>
            <div className='col-4 my-3'>
                <input
                    className='form-control'
                    placeholder='Search user by email'
                    // value={keyword}
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <Table bordered>
                <thead>
                    <tr>
                        <th>
                            <div className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort("desc", "id")}>

                                    </i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort("asc", "id")}>

                                    </i>
                                </span>
                            </div>
                        </th>
                        <th>Email</th>
                        <th>
                            <div className='sort-header'>
                                <span>First name</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort("desc", "first_name")}>

                                    </i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort("asc", "first_name")}>

                                    </i>
                                </span>
                            </div>
                        </th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => handleEditUser(item)}>Edit</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeteleUser(item)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />
            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTableUser={handleUpdateTableUser}
            />
            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    )
}

export default TableUsers;