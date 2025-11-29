import { useContext } from 'react'
import { AuthContext } from '../../../Authentication/Auth/AuthContext'
import { useQuery } from '@tanstack/react-query'

import useAxios from '../../../Authentication/Auth/useAxios'

const PaymentHistory = () => {
  const { user } = useContext(AuthContext)
  const axiosSecure = useAxios()
  const { data:history=[] } = useQuery({
    queryKey: ['history', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/history?email=${user.email}`
      )
      return res.data
    },
  })

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>sl</th>
              <th>parcelName</th>
              <th>parcelId</th>
              <th>transitionId</th>
              <th>paymentStatus</th>
              <th>paid time</th>
              <th>amount</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.parcelName}</td>
                <td>{item.parcelId}</td>
                <td>{item.transitionId}</td>
                <td>{item.paymentStatus}</td>
                <td>{item.paidAt}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentHistory
