import axios from "axios";
import { URL } from "./SourceDataService";

export const CustomerInformationService = {
    async postCustomerInfo(zone, dataSource, name, address, phone, email, whatsapp ) {
        const data = {
            zone,
            dataSource,
            name,
            address,
            phone, 
            email,
            whatsapp,
        }
        await axios.post(`${URL}/post-customer-info`, data);
    },

    async editCustomerInfo(zone, dataSource, name, address, phone, email, whatsapp, detail, _id) {
        const data = {
            zone,
            dataSource,
            name,
            address,
            phone,
            email,
            whatsapp,
            detail,
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
        const data = {
            name, address, service, slot, team_member, team_lead, customerId
        }
        await axios.post(`${URL}/post-fcustomer/customer`, data);
    },

    async editfCustomer(address, service, slot, team_member, team_lead, _id) {
        const data = { 
            address, service, slot, team_member, team_lead
        }

        axios.post(`${URL}/edit-fcustomer/` + _id, data);
    },

    async getfCustomer() {
        const response = await axios.get(`${URL}/get-fcustomer`);
        return response;
    },

    async getfOneCustomer(id) {
        const response = await axios.get(`${URL}/get-onecutomer/` + id);
        return response;
    },

    async cancelDeal(cancel_cause, id) {
        axios.post(`${URL}/cancel-deal/` + id, { cancel_cause });
    }
}