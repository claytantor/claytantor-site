import React, {useState, useEffect} from 'react';
import {Modal, Button, Alert, Form, Spinner} from 'react-bootstrap';
import axios from 'axios';
import QRCode from "react-qr-code";
var request = require('request');


let InvoiceDetails = ({apiEndpoint, token, paymentHash, handleClose}) => {

  let [count, setCount] = useState(90000);
  let [invoice, setInvoice] = useState(null);
  let [error, setError] = useState(null);
 

  useEffect(() => {
    if(paymentHash){
      pollInvoice(paymentHash);
    }
  }, [paymentHash]);

  let pollInvoice = (payment_hash) => {  
    
    let url = `${apiEndpoint}/invoice_payment/by_payment_hash/${payment_hash}`;
    console.log("url", url);
    let headers = {
      "Authorization": `Bearer ${token}`
    };
    axios.get(url, { headers: headers })
    .then((response) => {
      console.log("response", response);
      setInvoice(response.data);
      if(response.data.status === "COMPLETED"){
        console.log("completed");      
      }else{
        console.log("pending");
        if(count>0){
          setTimeout(() => {
            setCount(count-=3000);
            pollInvoice(payment_hash);
          }, 3000);
        } else {
          console.log("timeout");
          setInvoice(null);
          handleClose();
        }

      }    
    })
    .catch((error) => {
      console.log("error", error);
      setError(error.message);
    });

  };

  return (
    <>
    
    {invoice ?
      <div className='flex'>
        <h5>Invoice Details</h5>
        <div className="flex flex-row justify-center">
            {invoice.status === "CREATED" && <div className="m-1 text-white">{invoice.status}</div>}
            {invoice.status === "PENDING" && <div className="m-1 text-white">{invoice.status}</div>}
            {invoice.status === "PAID" && <div className="m-1 text-white">{invoice.status}</div>}
            {invoice.status === "COMPLETED" && <div className="m-1 text-green">{invoice.status}</div>}   
        </div>
        <p>Amount: {invoice.amount} SATs</p>   
        {invoice.status !== "COMPLETED" && 
        <div>    
            <div className='bg-white p-3 text-center'><QRCode size={256} value={invoice.payment_request} /></div>
            <div className='text-break mb-2 text-xs'>Payment Request: <span className='text-blue text-mono'>{invoice.payment_request}</span></div>
            <div className='text-break mb-2 text-xs'>Payment Hash: <span className='text-blue text-mono'>{invoice.payment_hash}</span></div>
            <div>Time Remaining: {count} ms</div>
        </div>}
      </div>:
      <div><Spinner/></div>}
    </>
  );
};

let PaymentForm = ({amountSats, memo, handleCreateInvoice}) => {

  const [formState, setFormState] = useState({
    "amount_sats": amountSats,
    "memo":memo
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target
    const value = target.value
    const name = target.name

    setFormState((formState) => ({
      ...formState,
      [name]: value
    }));  
  };  


  return (
    <>

    <Form>
      <Form.Group className="mb-3" controlId="amount_sats">
        <Form.Label>Amount (SATs)</Form.Label>
        <Form.Control name="amount_sats" type="text" placeholder="Enter amount in SATs" onChange={(e)=>handleInputChange(e)}/>
        <Form.Text className="text-muted">
          Ony enter amounts in whole satoshis.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="memo">
        <Form.Label>Memo</Form.Label>
        <Form.Control name="memo" type="text" placeholder="Memo" onChange={(e)=>handleInputChange(e)}/>
        <Form.Text className="text-muted">
          If its important that I know why I have been paid and by who, put it here. Its totally secure and private.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" onClick={()=>handleCreateInvoice(formState)}>
        Create Payment Invoice
      </Button>
    </Form>

    </>
  );
};

let PayModalReact = ({}) => {

  

  // const apiEndpoint = "https://api.rapaygo.com/v1";
  // const apiKey = "aoaJRPBVQhF7ZiGJ";
  // const apiSecret = "GeC3k6YA5ij4hNET";

  // const apiEndpoint = "http://localhost:5020";
  // const apiKey = "Kg79W26P7ULfnv9V";
  // const apiSecret = "8hYvKicmeHiJGto8";


  const apiEndpoint = "https://devapi.rapaygo.com/v1";
  const apiKey = "mL6JGxNAUdurxhqK";
  const apiSecret = "K9PyoSQD7ZNcUmeB";


  
  // const [amount, setAmount] = useState(1000);
  const [show, setShow] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setInvoice(null);
    setShow(false);
  }


  let handleCreateInvoice = (formState) => {

    var data = JSON.stringify({
      "key": apiKey,
      "secret": apiSecret
    });
    
    var config = {
      method: 'post',
      url: `${apiEndpoint}/auth/key`,
      withCredentials: false,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    // var options = {
    //   'method': 'POST',
    //   'url': 'https://api.rapaygo.com/v1/auth/key',
    //   'headers': {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     "key": "aoaJRPBVQhF7ZiGJ",
    //     "secret": "GeC3k6YA5ij4hNET"
    //   })
    
    // };
    // request(options, function (error, response) {
    //   if (error) throw new Error(error);
    //   console.log(response.body);
    // });
    

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setToken(response.data.access_token);
      console.log("token", token);

      var data = JSON.stringify({
        "amount_sats": parseInt(formState.amount_sats),
        "memo": formState.memo
      });
      
      var config = {
        method: 'post',
        url: `${apiEndpoint}/invoice_payment/ln/invoice`,
        withCredentials: false,
        headers: { 
          'Authorization': response.data.access_token, 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setInvoice(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      
    })
    .catch(function (error) {
      console.log(error);
    });
     
    
  };


  return (
    <>
    <button className="button-coinbase" onClick={()=>setShow(true)}>Pay @claytantor with Bitcoin</button>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pay Clay in Satoshis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert className="payment" variant="danger">{error}</Alert>}
          {invoice ? <></>:<Alert className="payment" variant="info">           
            <p>You will need a wallet that can pay with Bitcoin on the Lightning Network. <a className="payment" href="https://www.walletofsatoshi.com/" target="_new">Wallet Of Satoshi</a> is a good option.</p>
            <p>SATs currency converter: <a className="payment" target="_new" href="https://crypto.com/price/satoshi">USD to SATs</a></p>                            
          </Alert>}

          {invoice ? 
          <InvoiceDetails apiEndpoint={apiEndpoint} token={token} paymentHash={invoice.payment_hash}/> :
          <PaymentForm amountSats={1000} memo={'payment for being awesome'} handleCreateInvoice={handleCreateInvoice} handleClose={handleClose}/>
          }
                    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
};



export default PayModalReact