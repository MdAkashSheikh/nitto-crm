import axios from "axios";
import { URL } from "./SourceDataService";

export const PackageService = {
    async postPackage( service_name, pkg_details ) {
        const data = {
            service_name, pkg_details
        }
        await axios.post(`${URL}/post-package`, data);
    },

    async editPackage( service_name, pkg_details, id ) {
        const data = {
            service_name, pkg_details
        }
        await axios.post(`${URL}/edit-package/` + id, data);
    },

    async getPackage() {
        const response = await axios.get(`${URL}/get-package`);
        return response;
    },

    async deletePackage( id ) {
        await axios.delete(`${URL}/delete-package/` + id);
    },

    async togglePackage( is_active, id ) {
        await axios.post(`${URL}/toggle-package/` + id, { is_active });
    }
}