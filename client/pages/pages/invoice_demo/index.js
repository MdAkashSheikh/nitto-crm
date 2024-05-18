import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import AppConfig from '../../../layout/AppConfig';
import React, { useEffect, useState } from "react";
// import '../../../styles/invoice/invoice.scss'

export default function Invoice() {
   
    return (

        <div>
            
             <div className="watermark">
            <span id="watermark" style="display:none;">WATERMARK</span>
          </div>

            <div className="invoice-box">
            <div className="container">
              <div className="row">
                <div className="equalHWrap eqWrap top">
                  <div className="equalHW eq center logo-block">
                    <a href=""><img src="http://sequra.no/wp-content/uploads/2017/10/Sequra-Pure-logo.png" style="width:100%; max-width:55px;"/></a>
                  </div>
                  <div className="equalHW eq contact-info-block">
                    <span id="AccountEmail">support@advisory.as</span><br/>
                    <span id="AccountPhone">047 226 47 280</span>
                  </div>
                  <div className="equalHW eq title-block">
                    <h2 className="right no-padding" id="InvoiceSumExVat" style="margin:0px;">TEST-FAKTURA</h2>
                  </div>
                </div>
                <div className="row" style="margin-top:20px;">
                  <div className="equalHWrap eqWrap nomargin-nopadding to-block">
                    <div className="equalHW eq nomargin-nopadding title">
                      Til
                    </div>
                    <div className="equalHW eq nomargin-nopadding title from-block">
                      Fra
                    </div>
                    <div className="equalHW eq nomargin-nopadding title info-block">
                      Faktura Detaljer<span className="right">#<span id="InvoiceNumber">99993</span></span><br/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="equalHWrap eqWrap">
                      <div className="equalHW eq infoblock to-block">
                        <span id="CustomerName">9tsbaby DA</span><br/>
                        <span id="AccountProject">CustomerOrgNr</span><br/>
                        <span id="CustomerAddress">Ekraveien 14</span><br/>
                        <span id="CustomerPostalCode">2010</span>, <span id="CustomerCity">Strømmen</span><br/>
                        <span id="CustomerCountry">Norge</span><br/>
                        <span id="CustomerRef">CustomerRef</span><br/>
                        <span id="CustomerRef">CustomerProject</span>
                      </div>
                      <div className="equalHW eq infoblock from-block">
                        <span id="AccountName">Advisory AS</span><br/>
                        <span id="AccountProject">AccountOrgNr</span><br/>
                        <span id="AccountAddress">Suppeveien 14</span><br/>
                        <span id="AccountPostalCode">9238</span>, <span id="AccountCity">Oslo</span><br/>
                        <span id="AccountCountry">Norge</span><br/>
                        <span id="AccountRef">AccountRef</span><br/>
                        <span id="AccountProject">AccountProject</span><br/>
                      </div>
                      <div className="equalHW eq infoblock info-block">
                        <span id="">Utstedelsesdato:</span> <span className="right" id="CreatedDate">21. Januar 2017</span><br/>
                        <span id="">Forfallsdato</span>: <span className="right" id="DueDate">10.10.2017</span><br/>
                        <span id="">Kid</span>: <span className="right" id="KidNumber">0000374334</span><br/>
                        <span id="">Kontonummer:</span>: <span className="right" id="InvoiceBankAccount">1503 44 06941</span><br/>
                        <span id="">Iban</span>: <span className="right" id="InvoiceIban">DE89 3704 0044 0532 0130 00</span>
                      </div>
                    </div>
                  </div>
                  <table className="table">
                    <tr className="titles">
                      <th>Navn</th>
                      <th>Antall</th>
                      <th>Enhet</th>
                      <th>Enhetspris</th>
                      <th>Rabatt</th>
                      <th>MVA</th>
                      <th>Sum eks MVA</th>
                    </tr>
                    <tr className="item" id="ProductList">
                      <td id="Product"><span id="ProuductName">Medium Hosting<span></span></span></td>
                      <td><span id="ProductNumUnits">6<span></span></span></td>
                      <td><span id="ProductUnit">KG<span></span></span></td>
                      <td><span id="ProductUnitPrice">300kr</span></td>
                      <td><span id="ProductDiscount">Rabatt</span></td>
                      <td><span id="ProductTax">20%</span></td>
                      <td><span id="ProductCost">900 KR</span></td>
                    </tr>
                    <tr className="item">
                      <td><span id="ProuductName">Medium Hosting<span></span></span></td>
                      <td><span id="ProductNumUnits">6<span></span></span></td>
                      <td><span id="ProductUnit">KG<span></span></span></td>
                      <td><span id="ProductUnitPrice">300kr</span></td>
                      <td><span id="ProductDiscount">Rabatt</span></td>
                      <td><span id="ProductTax">20%</span></td>
                      <td><span id="ProductCost">900 KR</span></td>
                    </tr>
                    <tr className="item">
                      <td><span id="ProuductName">Medium Hosting<span></span></span></td>
                      <td><span id="ProductNumUnits">6<span></span></span></td>
                      <td><span id="ProductUnit">KG<span></span></span></td>
                      <td><span id="ProductUnitPrice">300kr</span></td>
                      <td><span id="ProductDiscount">Rabatt</span></td>
                      <td><span id="ProductTax">20</span>%</td>
                      <td><span id="ProductCost">900</span> <span id="InvoiceCurrency">KR</span></td>
                    </tr>
                    <tr className="item">
                      <td><span id="ProuductName">Soup<span></span></span></td>
                      <td><span id="ProductNumUnits">6 <span></span></span></td>
                      <td><span id="ProductUnit">Liter <span></span></span></td>
                      <td><span id="ProductUnitPrice">300kr</span></td>
                      <td><span id="ProductDiscount">90%</span></td>
                      <td><span id="ProductTax">20%</span></td>
                      <td><span id="ProductCost">900 KR</span></td>
                    </tr>
                  </table>
                </div>
                <div className="row">
                  <div className="equalHWrap eqWrap">
                    <div className="equalHW eq">
                      <table className="right">
                        <tr>
                          <td><span style="display:inline-block;margin-right:10px;"><strong>Total MVA:</strong></span></td>
                          <td><span id="InvoceTotalVat">202</span> <span id="InvoiceCurrency1">KR</span><br/></td>
                        </tr>
                        <tr>
                          <td><span style="display:inline-block;margin-right:10px;"><strong>Sum eks MVA:</strong></span></td>
                          <td><span id="InvoiceSumExVat">900</span> <span id="InvoiceCurrency2">KR</span></td>
                        </tr>
                        <tr>
                          <td><span style="display:inline-block;margin-right:10px;"><strong>Å betale:</strong></span></td>
                          <td><span id="ProductCost">1102</span> <span id="InvoiceCurrency3">KR</span></td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div className="center">
                    <a href="https://sequra.no" style="text-decoration:none;">Prøv gratis fakturerings program - rett i nettleseren <span style="border-bottom:1px solid #000;">Sequra</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            