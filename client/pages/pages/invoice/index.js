import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import AppConfig from '../../../layout/AppConfig';
import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon,
    MDBTypography,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";

export default function Invoice(props) {

    console.log('PROPS',props)

    const CustomerData = [
        { name: 'Rahim Ahmed', address: 'Mirpur, Dhaka', service: 'Wasa Tank', slot: 'Morning', team_member: ['Akash', 'Karim'], team_lead: 'Karim', price: '4500'}
    ];

    const CustomerInfo = { name: 'Rahim Ahmed', address: 'Mirpur, Dhaka', service: 'Wasa Tank', slot: 'Morning', team_member: ['Akash', 'Karim'], team_lead: 'Firoz', price: '4500'}
    
    const vat = CustomerInfo.price * 0.15;


    const printFn = () => {
        window.print();
    }

    return (
        <MDBContainer className="py-5">
            <MDBCard className="p-4">
                <MDBCardBody>
                    <MDBContainer className="mb-2 mt-3">
                        <MDBRow className="d-flex align-items-baseline">
                        {/* <MDBCol xl="9">
                            <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                            Invoice  <strong>ID: #123-123</strong>
                            </p>
                        </MDBCol> */}
                        <MDBCol xl="9">
                            <img src={`/layout/images/logo.png`} className="ms-0 " width="350px" height={'70px'} alt='...' />
                            <p style={{ color: "#5d9fc5" }}>Water Tank and Pipeline Cleaning Solutions</p>
                        </MDBCol>
                        
                        <MDBCol xl="3" className="float-end">
                            <MDBBtn
                                 onClick={() => printFn()}
                                color="light"
                                ripple="dark"
                                className="text-capitalize border-0"
                            >
                            <MDBIcon fas icon="print" color="primary" className="me-1" />
                                Print
                            </MDBBtn>
                            <MDBBtn
                                color="light"
                                ripple="dark"
                                className="text-capitalize border-0 ms-2"
                            >
                            <MDBIcon
                                far
                                icon="file-pdf"
                                color="danger"
                                className="me-1"
                            />
                                Export
                            </MDBBtn>
                            <hr />
                        </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <MDBContainer>
                        <MDBCol md="12" className="text-center">
                        {/* <MDBIcon
                            fab
                            icon="mdb"
                            size="4x"
                            className="ms-0 "
                            style={{ color: "#5d9fc5" }}
                        /> */}
                        {/* <img src={`/layout/images/logo.png`} className="ms-0 " width="350px" height={'70px'} alt='...' /> */}
                        </MDBCol>
                    </MDBContainer>
                    <MDBRow>
                        <MDBCol xl="8">
                        <MDBTypography listUnStyled>
                            <li className="mt-6 text-muted">
                                <span style={{ color: "#5d9fc5" }}>Clean Battle</span>
                            </li>
                            <li className="text-muted">Uttara, Dhaka</li>
                            <li className="text-muted">State, Country</li>
                            <li className="text-muted">
                                <MDBIcon fas icon="phone-alt" /> +8801942000061
                            </li>
                            <li className="text-muted">CRM - {CustomerInfo.team_lead}</li>
                        </MDBTypography>
                        </MDBCol>
                        <MDBCol xl="4">
                        <p className="text-muted">Customer Info</p>
                        <MDBTypography listUnStyled>
                            <li className="text-muted">
                                {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} /> */}
                                <span className="fw-bold ms-1">{CustomerInfo.name}</span>
                            </li>
                            <li className="text-muted">
                                {/* <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} /> */}
                                <span className="fw-bold ms-1">{CustomerInfo.address}</span>
                            </li>
                            <li className="text-muted">
                                <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                                <span className="fw-bold ms-1">ID:</span>#123-456
                            </li>
                            <li className="text-muted">
                                <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                                <span className="fw-bold ms-1">Creation Date: </span>Jan 23,2024
                            </li>
                            {/* <li className="text-muted">
                                <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                                <span className="fw-bold ms-1">Status:</span>
                                <span className="badge bg-warning text-black fw-bold ms-1">
                                    Unpaid
                                </span>
                            </li> */}
                        </MDBTypography>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="my-2 mx-1 justify-content-center">
                        <MDBTable striped borderless>
                        <MDBTableHead
                            className="text-white"
                            style={{ backgroundColor: "#84B0CA" }}
                        >
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Description</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Amount</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                        {
                            // console.log(CustomerData)
                            CustomerData?.map((item, i) => (
                                <tr index={i}>
                                    <th scope="row">{i+1}</th>
                                    <td>{item.service}</td>
                                    <td>${item.price}</td>
                                <td>${item.price}</td>
                            </tr>
                            )) 
                        }
                           
                            {/* <tr>
                                <th scope="row">2</th>
                                <td>Concrite</td>
                                <td>1</td>
                                <td>$500</td>
                                <td>$500</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Reserve Tank</td>
                                <td>1</td>
                                <td>$300</td>
                                <td>$300</td>
                            </tr> */}
                        </MDBTableBody>
                        </MDBTable>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol xl="8">
                        <p className="ms-3">
                            Add additional notes and payment information
                        </p>
                        </MDBCol>
                        <MDBCol xl="3">
                        <MDBTypography listUnStyled>
                            <li className="text-muted ms-5">
                            <span class="text-black me-4">SubTotal</span>${CustomerInfo.price}
                            </li>
                            <li className="text-muted ms-5 mt-2">
                            <span class="text-black me-4">Tax(15%)</span>${vat}
                            </li>
                        </MDBTypography>
                        <p className="text-black float-start">
                            <span className="text-black me-3"> Total Amount</span>
                            <span style={{ fontSize: "25px" }}>${CustomerInfo.price - 0 + CustomerInfo.price * 0.15}</span>
                        </p>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol xl="10">
                            <p>Thank you for your purchase</p>
                        </MDBCol>
                        <MDBCol xl="2">
                            <MDBBtn
                                className="text-capitalize"
                                style={{ backgroundColor: "#60bdf3" }}
                            >
                                Pay Now
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

Invoice.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};