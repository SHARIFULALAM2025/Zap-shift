import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../../../Authentication/Auth/useAxios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const axiosSecure=useAxios()
    const sessionId = searchParams.get('session_id')
    const [paymentInfo,setPaymentInfo]=useState({})
    console.log(sessionId)
    useEffect(() => {
      if (sessionId) {
          axiosSecure.patch(`payment-success?session_id=${sessionId}`)
              .then(res => {
                  setPaymentInfo({
                    transitionId: res.data.transitionId,
                    trackingId: res.data.trackingId,
                  })
              console.log(res.data);

          })
      }
    }, [sessionId, axiosSecure])

    return (
      <div>
        <h1 className="">payment successful</h1>
        <h1 className="">{paymentInfo.transitionId}</h1>
        <h1 className="">{paymentInfo.trackingId}</h1>
      </div>
    )
};

export default PaymentSuccess;