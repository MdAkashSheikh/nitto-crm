import axios from "axios";
import { URL } from "./SourceDataService";

export const FolloUpService = {
   
    async postFollow(zone, dataSource, employee, name, address, phone, email, whatsapp, followUpDate, details ) {
        const data = {
            zone,
            dataSource,
            employee,
            name,
            address,
            phone, 
            email,
            whatsapp,
            followUpDate,
            details,
        }
        await axios.post(`${URL}/post-follow`, data);
    },

    async editFollow(zone, dataSource, employee, name, address, phone, email, whatsapp, followUpDate, details, _id ) {
        const data = {
            zone, dataSource, employee, name, address, phone, email, whatsapp, followUpDate, details
        }
        await axios.post(`${URL}/edit-follow-up/` + _id, data);
    },
}