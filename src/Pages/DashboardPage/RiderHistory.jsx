import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxios from '../../Authentication/Auth/useAxios'
import { FaTrash, FaUserCheck } from 'react-icons/fa'
import { IoPersonRemoveSharp } from 'react-icons/io5'
import Swal from 'sweetalert2'

const RiderHistory = () => {
  const axiosSecure = useAxios()
  const { data: rider = [], refetch } = useQuery({
    queryKey: ['rider', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/data/rider')
      console.log(res.data)

      return res.data
    },
  })
//delete rider
  const { mutateAsync: DeleteRider } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/remove/${id}`)
      return res.data
    },
    onSuccess: () => {
      refetch()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'rider has been delete',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })
  const updateStatus = (item, status) => {
    const update = { status: status, email: item.yourEmail }
    axiosSecure.patch(`/riders/${item._id}`, update).then((res) => {
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your request has been approved',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    })
  }
  const handelApprove = (item) => {
    updateStatus(item, 'approve')
  }
  const handelRejection = (item) => {
    updateStatus(item, 'rejected')
  }
  const handelRemove = (item) => {
    DeleteRider(item._id)
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>sl</th>
              <th>Name</th>
              <th>email</th>
              <th>status</th>
              <th>nid</th>
              <th>driving license</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {rider.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.yourName}</td>
                <td>{item.yourEmail}</td>
                <td>
                  {item.status && typeof item.status === 'object'
                    ? item.status.status
                    : item.status}
                </td>
                <td>{item.nidNumber}</td>
                <td>{item.drivingLicense}</td>
                <td className="space-x-3">
                  <button onClick={() => handelApprove(item)} className="btn ">
                    <FaUserCheck></FaUserCheck>
                  </button>
                  <button
                    onClick={() => handelRejection(item)}
                    className="btn "
                  >
                    <IoPersonRemoveSharp></IoPersonRemoveSharp>
                  </button>
                  <button onClick={() => handelRemove(item)} className="btn ">
                    <FaTrash></FaTrash>
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

export default RiderHistory
