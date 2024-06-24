import axios from "axios";
import { URL } from "./SourceDataService";

export const ContactService = {
    async postContact(name, details) {
        const data = {
            name,
            details
        }
        await axios.post(`${URL}/post-contact`, data)
    },

    async editContact(name, details, id) {
        const data = {
            name,
            details,
        }
        await axios.post(`${URL}/edit-contact/` + id, data)
    },

    async getContact() {
        const response = await axios.get(`${URL}/get-contact`)
        return response;
    },

    async deleteContact(id) {
        await axios.delete(`${URL}/delete-contact/` + id)
    },

    async toggleContact(is_active, id) {
        await axios.post(`${URL}/toggle-contact/` + id, { is_active } )
    }
 }