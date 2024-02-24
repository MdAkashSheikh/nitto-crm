import axios from "axios";
import { URL } from "./SourceDataService";

export const CustomerInformationService = {
    async postCustomerInfo(zone, name, address, phone, email, whatsapp ) {
        const data = {
            zone,
            name,
            address,
            phone, 
            email,
            whatsapp,
        }
        await axios.post(`${URL}/post-customer-info`, data);
    },

    async editCustomerInfo(zone, name, address, phone, email, whatsapp, _id) {
        const data = {
            zone,
            name,
            address,
            phone,
            email,
            whatsapp,
        }
        await axios.post(`${URL}/edit-customer-info/` + _id, data);
    },

    async getCustomerInfo(){
        const response = await axios.get(`${URL}/get-customer-info`);
        return response;
    },

    async deleteCustomerInfo(_id) {
        await axios.delete(`${URL}/delete-customer-info/` + _id);
    },

    async toggleCustomerInfo(is_active, _id) {
        await axios.post(`${URL}/toggle-customer-info/` + _id, { is_active });
    },

    async editManagerPanel(follows, _id) {
        await axios.post(`${URL}/edit-manager-panel/` + _id, { follows });
    },

    //Convert to Customer
    async postfCustomer(name, address, service, slot, team_member, team_lead, customerId) {
        console.log('Ok2222')
        const data = {
            name, address, service, slot, team_member, team_lead, customerId
        }
        await axios.post(`${URL}/post-fcustomer`, data);
    },
}