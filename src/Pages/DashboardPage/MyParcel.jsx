import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../Authentication/Auth/AuthContext'
import useAxios from '../../Authentication/Auth/useAxios'
import { FiEdit } from 'react-icons/fi'

import { MdOutlinePreview } from 'react-icons/md'
import { BsFillTrash3Fill } from 'react-icons/bs'
import Swal from 'sweetalert2'


const MyParcel = () => {
  const { user } = useContext(AuthContext)
  const axiosSecure = useAxios()
  const { data: parcel = [], refetch } = useQuery({
    queryKey: ['myParcel', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/parcel?email=${user?.email}`)
      return res.data
    },
  })
  const handelDelete = (id) => {
    console.log(id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/myParcel/${id}`).then((res) => {
          console.log(res.data)
          if (res.data.deletedCount) {
            refetch()
            Swal.fire({
              title: 'Deleted!',
              text: 'Your parcel has been deleted.',
              icon: 'success',
            })
          }
        })
      }
    })
  }
  const handelClick = async(item) => {
    const paymentInfo = {
      cost: item.cost,
      parcelId: item._id,
      senderEmail: item.senderEmail,
      parcelName: item.parcelName,
    }
    const res = await axiosSecure.post(`/payment-checkout-session`, paymentInfo)
    console.log(res.data.url)
    window.location.assign(res.data.url)

  }
  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>cost</th>
              <th>payment </th>
              <th>Delivery status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcel.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.parcelName}</td>
                <td>{item.cost}</td>
                <td>
                  {item.payment_status === 'paid' ? (
                    <span className='px-3 py-2 bg-amber-300'>paid</span>
                  ) : (
                    <button
                      onClick={() => handelClick(item)}
                      className="btn btn-primary"
                    >
                      pay
                    </button>
                  )}
                </td>
                <td>{item.DeliveryStatus}</td>
                <td className="space-x-3">
                  <button className="btn btn-soft btn-accent">
                    <MdOutlinePreview></MdOutlinePreview>
                  </button>
                  <button className="btn btn-soft btn-accent">
                    <FiEdit></FiEdit>
                  </button>
                  <button
                    onClick={() => handelDelete(item._id)}
                    className="btn btn-soft btn-accent"
                  >
                    <BsFillTrash3Fill></BsFillTrash3Fill>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyParcel
