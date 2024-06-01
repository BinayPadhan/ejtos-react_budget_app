import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Currency = () => {
    const {currency, handleCurrencyChange} = useContext(AppContext)

    const onChangeCurrency = (event) => {
        handleCurrencyChange(event.target.value);
    }

  return (
    <>
       
        <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Currency: {currency}</label>
                </div>
                  <select className="custom-select" id="inputGroupSelect01" value={currency} onChange={onChangeCurrency} >
                        <option value="$">$ Dollar</option>
                        <option value="£" >£ Pound</option>
                        <option value="€" >€ Euro</option>
                        <option value="₹" >₹ Rupee</option>
                  </select>
        
                
    </>
    
  )
}

export default Currency;