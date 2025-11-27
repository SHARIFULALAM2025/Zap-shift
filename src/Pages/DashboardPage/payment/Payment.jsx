import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../../Authentication/Auth/useAxios';

const Payment = () => {
    const { id } = useParams()
    const axiosSecure=useAxios()
    const {isLoading,data:parcel } = useQuery({
        queryKey: ['parcels', id],
        queryFn: async () => {
            const res = await axiosSecure.get(
              `/unique/parcel/${id}`
            )
            return res.data;
        }
    })
    if (isLoading) {
        return (
          <div className="absolute flex justify-center items-center">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        )
  }
  const handelPayment = async() => {

    const paymentInfo = {
      cost: parcel.cost,
      senderEmail: parcel.senderEmail,
      id: parcel._id,
      parcelName: parcel.parcelName,
    }
    const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
    console.log(res.data);
    window.location.href = res.data.url;

  }
    return (
      <div>
        <h1 className="">
          the parcel ${parcel.cost} and the parcel name {parcel.parcelName}
        </h1>
        <button onClick={handelPayment} className="btn btn-primary">
          pay
        </button>
      </div>
    )
};

export default Payment;