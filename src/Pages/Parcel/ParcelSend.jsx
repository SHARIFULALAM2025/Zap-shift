import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import Swal from 'sweetalert2'
import useAxios from '../../Authentication/Auth/useAxios'
import { useContext } from 'react'
import { AuthContext } from '../../Authentication/Auth/AuthContext'

const ParcelSend = () => {
  const {user}=useContext(AuthContext)
  const [region, setRegion] = useState([])
 const axiosSecure = useAxios()
  useEffect(() => {

    fetch('http://localhost:5000/home/center/data')
      .then((result) => result.json())
      .then((data) => {
        setRegion(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const { register, control, handleSubmit } = useForm()
  const handelParcel = (data) => {
    const isDocument = data.parcelType === 'Document'
    const isSameDistrict = data.senderDistrict === data.receiveDistrict
    const parcelWeight = parseFloat(data.parcelPrice)
    let cost = 0
    if (isDocument) {
      cost = isSameDistrict ? 60 : 87
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150
      } else {
        const minCharge = isSameDistrict ? 110 : 150
        const extraWeight = parcelWeight - 3
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40
        cost = minCharge + extraCharge
      }
    }
    console.log('cost :', cost);
    data.cost=cost

      Swal.fire({
        title: 'agree with the cost ?',
        text: `you will be charged ${cost} taka`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, take it!',
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.post('/send/parcel/data', data)

            .then(res => {
            console.log(res.data);

          })
        }
      })

  }
  const regionData = region.map((item) => item.region)
  const newRegion = [...new Set(regionData)]
  const sendRegister = useWatch({ control, name: 'sendRegister' })
  const receiveHouse = useWatch({ control, name: 'receiveHouse' })
  console.log(newRegion)
  const regionArea = (regionAll) => {
    if (!regionAll) return []
    const regionDistract = region.filter((item) => item.region === regionAll)
    const distracts = regionDistract.map((item) => item.district)
    return distracts
  }

  return (
    <div>
      <div className="">
        {' '}
        <h1 className="text-2xl font-bold">send a parcel</h1>
        <div className="border border-b-2"></div>
      </div>
      <form onSubmit={handleSubmit(handelParcel)} className="space-y-5">
        <div className="">
          <h1 className="">Enter your parcel details</h1>
          <div className="flex gap-7">
            <div className="">
              <label>
                <input
                  {...register('parcelType')}
                  value="Document"
                  type="radio"
                  defaultChecked
                />
                Document
              </label>
            </div>
            <div className="">
              <label>
                <input
                  {...register('parcelType')}
                  value="Non-Document"
                  type="radio"
                />
                Non-Document
              </label>
            </div>
          </div>
          <div className="grid gap-5 grid-cols-2 items-center ">
            <div className="">
              <label className="label">parcel Name:</label>
              <input
                {...register('parcelName')}
                type="text"
                className="input w-full text-black"
                placeholder="Enter your Property Name"
              />
            </div>
            <div className="">
              <label className="label">parcel weight(kg)</label>
              <input
                type="number"
                {...register('parcelPrice', { valueAsNumber: true })}
                className="input w-full text-black"
              />
            </div>
          </div>
          <div className="border border-b-2 mt-2"></div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <h1 className="font-bold text-2xl">Sender Details</h1>
            <div className="grid gap-5 grid-cols-2 items-center ">
              <div className="">
                <label className="label">Sender Name:</label>
                <input
                defaultValue={user?.displayName}
                  {...register('senderName')}
                  type="text"
                  className="input w-full text-black"
                  placeholder="Enter your Sender Name"
                />
              </div>
              <div className="">
                <label className="label">Sender Pickup Wire house</label>
                <select
                  {...register('sendRegister')}
                  defaultValue="select"
                  className="select w-full text-black"
                >
                  <option disabled={true}>select</option>
                  {newRegion.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-5 grid-cols-2 items-center ">
              <div className="">
                <label className="label">Address:</label>
                <input
                  {...register('senderAddress')}
                  type="text"
                  className="input w-full text-black"
                  placeholder="enter your Address"
                />
              </div>
              <div className="">
                <label htmlFor="">Sender Contact No:</label>
                <br></br>
                <input
                  {...register('senderNumber')}
                  type="number"
                  className="input w-full text-black"
                  placeholder=" enter your contact name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="">
                <label className="label">Your Region</label>
                <select
                  {...register('senderDistrict')}
                  defaultValue="select"
                  className="select w-full text-black"
                >
                  <option disabled={true}>select</option>
                  {regionArea(sendRegister).map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <label className="label">sender email</label>
                <input
                  defaultValue={user?.email}
                readOnly
                  {...register('senderEmail')}
                  type="email"
                  className="input w-full text-black"
                />
              </div>
            </div>

            <div className="">
              <label htmlFor="">Description:</label>
              <br></br>
              <textarea
                {...register('senderDescription')}
                id=""
                className="w-full border bg-white rounded-lg text-black"
                rows={4}
                placeholder="enter your property description ......"
              ></textarea>
            </div>
          </div>
          <div className="">
            <div className="">
              <h1 className="font-bold text-2xl">Receiver Details</h1>
              <div className="grid gap-5 grid-cols-2 items-center ">
                <div className="">
                  <label className="label">Receiver Name:</label>
                  <input
                    {...register('receiverName')}
                    type="text"
                    className="input w-full text-black"
                    placeholder="Enter your Sender Name"
                  />
                </div>
                <div className="">
                  <label className="label">Receiver Pickup Wire house</label>
                  <select
                    {...register('receiveHouse')}
                    defaultValue="select"
                    className="select w-full text-black"
                  >
                    <option disabled={true}>select</option>
                    {newRegion.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-5 grid-cols-2 items-center ">
                <div className="">
                  <label className="label">Address:</label>
                  <input
                    {...register('receiverAddress')}
                    type="text"
                    className="input w-full text-black"
                    placeholder="enter your Address"
                  />
                </div>
                <div className="">
                  <label htmlFor="">Receiver Contact No:</label>
                  <br></br>
                  <input
                    {...register('receiverNumber')}
                    type="number"
                    className="input w-full text-black"
                    placeholder=" enter your contact name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="">
                  <label className="label">Your Region</label>
                  <select
                    {...register('receiveDistrict')}
                    defaultValue="select"
                    className="select w-full text-black"
                  >
                    <option disabled={true}>select</option>
                    {regionArea(receiveHouse).map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <label className="label">Receiver email</label>
                  <input
                    {...register('receiverEmail')}
                    type="email"
                    className="input w-full text-black"
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="">Receiver Description:</label>
                <br></br>
                <textarea
                  {...register('receiverDescription')}
                  className="w-full border bg-white rounded-lg text-black"
                  rows={4}
                  placeholder="enter your property description ......"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="grid place-content-center">
          {' '}
          <input
            type="submit"
            value="Add Property"
            className="btn  px-6 btn-success py-3"
          ></input>
        </div>
      </form>
    </div>
  )
}

export default ParcelSend
