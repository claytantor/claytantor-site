import React from 'react';
import CopyClipboard from './CopyClipboard'
import imgBitcoin from '../img/pay_bc_512.png';
import imgCoinbase from '../img/pay_coinbase.png';

let PayBitcoin = () => { 
    return(<>
    
    <button class="button-coinbase" onClick={() => {
      window.open('https://commerce.coinbase.com/checkout/c86a2ce6-bfff-4806-bc10-ab0a5dc10153', '_blank')}}>Pay @claytantor With Crypto</button>

    </>);
  };

export default PayBitcoin