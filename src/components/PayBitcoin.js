import React from 'react';
import CopyClipboard from './CopyClipboard'
import imgBitcoin from '../img/pay_bc_512.png';

let PayBitcoin = () => { 
    return(<>
        <div className="d-flex flex-wrap justify-content-center mb-3">
        <CopyClipboard/>
      </div> 
      <div className="d-flex flex-wrap justify-content-center mb-3">
        <img className="bitcoin-img" src={imgBitcoin} alt="pay with bitcoin" />
      </div> 
    </>);
  };

export default PayBitcoin