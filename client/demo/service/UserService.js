import axios from "axios";
import { URL } from "./SourceDataService";

export const UserService = {
    async getAllUser() {
        const response = await axios.get(`${URL}/all-user`)
        return response;
    },

    async toggleUser(isPermission, id) {
        await axios.post(`${URL}/toggle-user/` + id, { isPermission })
    },

    async deleteUser(id) {
        await axios.delete(`${URL}/delete-user` + id);
    }
}