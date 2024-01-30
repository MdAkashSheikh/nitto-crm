import axios from "axios";
import { URL } from "./SourceDataService";

export const TankInfoService = {
    
    async postTank(name, details) {
        const data = {
            name, details
        }
        await axios.post(`${URL}/post-tank`, data);
    },

    async editTank(name, details, id) {
        const data = {
            name, details
        }
        await axios.post(`${URL}/edit-tank/` + id, data);
    },

    async getTank() {
        const response = await axios.get(`${URL}/get-tank`);
        return response;
    },

    async deleteTank(id) {
        await axios.delete(`${URL}/delete-tank/` + id);
    },

    async toggleTank(is_active, id) {
        await axios.post(`${URL}/toggle-tank/` + id, { is_active })
    }
}