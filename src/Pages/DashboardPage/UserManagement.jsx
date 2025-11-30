import React from 'react'
import useAxios from '../../Authentication/Auth/useAxios'
import { useQuery } from '@tanstack/react-query'
import { MdAdminPanelSettings } from 'react-icons/md'
import { IoPersonRemoveSharp } from 'react-icons/io5'
import Swal from 'sweetalert2'

const UserManagement = () => {
  const axiosSecure = useAxios()
  const {refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/data`)
      return res.data
    },
  })
  const handelMakeUser = (item) => {
    const userInfo = {
      role: 'admin',
    }
    axiosSecure.patch(`/person/${item._id}`, userInfo).then((res) => {
        if (res.data.modifiedCount) {
            console.log(res.data);

          refetch()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'your request has been accept',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    })
  }
    const handelRemove = (item) => {
        const userInfo = {
        role:"user"
        }
        axiosSecure.patch(`/person/${item._id}`, userInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                refetch()
                 Swal.fire({
                   position: 'top-end',
                   icon: 'success',
                   title: 'remove admin',
                   showConfirmButton: false,
                   timer: 1500,
                 })
            }
        })
}
  return (
    <div>
      <h1 className="">user management{users.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>sl</th>
              <th>Name</th>
              <th>email</th>
              <th>role</th>
              <th>admin action</th>
              <th>other action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <h1 className="font-bold">{item.displayName}</h1>
                    </div>
                  </div>
                </td>
                <td>{item.yourEmail}</td>
                <td>{item.role}</td>
                <td>
                  {item.role === 'admin' ? (
                    <button onClick={()=>handelRemove(item)} className="btn bg-red-300">
                      <IoPersonRemoveSharp></IoPersonRemoveSharp>
                    </button>
                  ) : (
                    <button
                      onClick={() => handelMakeUser(item)}
                      className="btn bg-green-500"
                    >
                      {' '}
                      <MdAdminPanelSettings></MdAdminPanelSettings>
                    </button>
                  )}
                </td>
                <th>action</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement
