import axios from "axios";
import { URL } from "./SourceDataService";

export const TeamInfoService = {
    async postTeamInfo(name, father_name, mother_name, phone ) {
        const data = {
            name, father_name, mother_name, phone
        }

        await axios.post(`${URL}/post-team-info`, data);
    },

    async editTeamInfo(name, father_name, mother_name, phone, id) {
        const data = {
            name, father_name, mother_name, phone
        }

        await axios.post(`${URL}/edit-team-info/` + id, data);
    },

    async getTeamInfo() {
        const response = await axios.get(`${URL}/get-team-info`);
        return response;
    },

    async deleteTeamInfo(id) {
        await axios.delete(`${URL}/delete-team-info/` + id);
    },

    async toggleTeamInfo(is_active, id) {
        await axios.post(`${URL}/toggle-team-info/` + id, { is_active });
    }
}