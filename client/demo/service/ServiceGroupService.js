import axios from "axios";
import { URL } from "./SourceDataService";

export const ServiceGroupService = {
    async postService(service_id, service_name, base_price, completion_time) {
        const data = {
            service_id,
            service_name,
            base_price,
            completion_time
        }

        await axios.post(`${URL}/post-service`, data);
    },

    async editService(service_id, service_name, base_price, completion_time, id) {
        const data = {
            service_id,
            service_name,
            base_price,
            completion_time
        }

        await axios.post(`${URL}/edit-service/` + id, data);
    },

    async getService() {
        const response = await axios.get(`${URL}/get-service`);
        return response;
    },

    async deleteService(id) {
        console.log(id)
        await axios.delete(`${URL}/delete-service/` + id);
    },

    async toggleService(is_active, id) {
        await axios.post(`${URL}/toggle-service/` + id, is_active);
    }
}