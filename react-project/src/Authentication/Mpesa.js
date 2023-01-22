import { REACT_APP_consumerKey, REACT_APP_consumerSecret } from '../Keys';
import axios from 'axios';
const LipaNaMpesa = async (phone_number) => {
    const base64Encoded = btoa(`${REACT_APP_consumerKey}:${REACT_APP_consumerSecret}`);
    const headers = {
        'Authorization': `Basic ${base64Encoded}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Accept',
        'Access-Control-Allow-Method': '*',
        'status':200, 
        
    }

    const body = {
        "BusinessShortCode": 174379,
        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwMTIyMDgwMzMx",
        "Timestamp": "20230122080331",
        "TransactionType": "CustomerPayBillOnline",
        "Amount": 1,
        "PartyA": phone_number,
        "PartyB": 174379,
        "PhoneNumber": phone_number,
        "CallBackURL": "https://mydomain.com/path",
        "AccountReference": "Test",
        "TransactionDesc": "Test Payment"
    }

    try {
        await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", body, { headers }).then( response => {
            response.status =200;
        });
    } catch (error) {
        console.log(error);
        // return error.response.data;
    }
}
export {
    LipaNaMpesa
}
