import axios from "./customize-axios";


const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}
const postCreateUser = (name, job) => {
    return axios.post("/api/users", { name, job })
}
const putUpdateUser = (dataUserEdit) => {
    return axios.put(`/api/users/${dataUserEdit.id}`, { name: dataUserEdit.first_name, job: dataUserEdit.last_name })
}
export { fetchAllUser, postCreateUser, putUpdateUser };