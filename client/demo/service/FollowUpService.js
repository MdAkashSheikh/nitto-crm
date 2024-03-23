import axios from "axios";
import { URL } from "./SourceDataService";

export const FolloUpService = {
    async postCategory(name, details) {
        const data = {
            name,
            details,
        }
        await axios.post(`${URL}/post-category`, data);
    },
    async postFollow(zone, dataSource, name, address, phone, email, whatsapp, details ) {
        const data = {
            zone,
            dataSource,
            name,
            address,
            phone, 
            email,
            whatsapp,
            details,
        }
        await axios.post(`${URL}/post-follow`, data);
    },

    async editFollow(zone, dataSource, name, address, phone, email, whatsapp, details, id ) {
        const data = {
            zone,
            dataSource,
            name,
            address,
            phone, 
            email,
            whatsapp,
            details,
        }
        await axios.post(`${URL}/edit-follow/` + id, data);
    },
}