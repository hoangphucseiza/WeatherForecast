import React, {useEffect, useState} from 'react'
import BodyLeft from './BodyLeft'
import BodyRight from './BodyRight'
import axios from 'axios'
import VerifyModal from './VerifyModal'
import { apiURL } from '../utils/apiURL'
const Body = () => {
  const emailToken = window.location.pathname.split('=')[1]
  const [verified, setVerified] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if(emailToken){
      axios.post(`${apiURL}/verify?emailToken=${emailToken}`)
      .then(res => {
        setMessage(res.data.message)
        setVerified(true)     
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [])
  return (
    <div className='Body'>
      <BodyLeft/>
      <BodyRight/>
      {verified && <VerifyModal message={message} setVerified={setVerified}/>}
    </div>
  )
}

export default Body
