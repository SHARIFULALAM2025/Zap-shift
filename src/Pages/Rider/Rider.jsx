import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useForm, useWatch } from 'react-hook-form'
 import useAxios from '../../Authentication/Auth/useAxios'
import { AuthContext } from '../../Authentication/Auth/AuthContext'
import Swal from 'sweetalert2'

const Rider = () => {
  const { user } = useContext(AuthContext)
  const [region, setRegion] = useState([])
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
   const axiosSecure = useAxios()
  const { register, control, handleSubmit,reset } = useForm()
  const regionData = region.map((item) => item.region)
  const newRegion = [...new Set(regionData)]
  const yourRegion = useWatch({ control, name: 'yourRegion' })
  console.log(newRegion)
  const regionArea = (regionAll) => {
    if (!regionAll) return []
    const regionDistract = region.filter((item) => item.region === regionAll)
    const distracts = regionDistract.map((item) => item.district)
    return distracts
  }
    const handelRiderApplication = (data) => {
        console.log(data);
        axiosSecure.post('/rider/data', data)
            .then(res => {
            if (res.data.insertedId) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Your work has been saved',
                  showConfirmButton: false,
                  timer: 1500,
                })
                reset()
            }
        })


}
  return (
    <div>
      <div className="">
        <h1 className="text-2xl font-bold">Be a Rider</h1>
        <p className="text-base font-bold">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div className="border border-b-2"></div>
      </div>
      <form
        onSubmit={handleSubmit(handelRiderApplication)}
        className="space-y-5"
      >
        <div className="grid grid-cols-2 place-content-center items-center gap-5">
          <div className="">
            <h1 className="font-bold text-2xl">Tell us about yourself</h1>

            <div className="">
              <label className="label">Your Name:</label>
              <input
                defaultValue={user?.displayName}
                {...register('yourName')}
                type="text"
                className="input w-full text-black"
                placeholder="Enter your  Name"
              />
            </div>
            <div className="">
              <label className="label">Your Region</label>
              <select
                {...register('yourRegion')}
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
            <div className="">
              <label className="label">Your District</label>
              <select
                {...register('yourDistrict')}
                defaultValue="select"
                className="select w-full text-black"
              >
                <option disabled={true}>select</option>
                {regionArea(yourRegion).map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="">
              <label className="label">Tell Us About Yourself:</label>
              <input
                {...register('AboutYourself')}
                type="text"
                className="input w-full text-black"
                placeholder="Tell Us About Yourself"
              />
            </div>
            <div className="">
              <label htmlFor="">Driving License Number :</label>
              <br></br>
              <input
                {...register('drivingLicense', { valueAsNumber: true })}
                type="number"
                className="input w-full text-black"
                placeholder=" enter your Driving License Number"
              />
            </div>
            <div className="">
              <label htmlFor="">Phone Number:</label>
              <br></br>
              <input
                {...register('phoneNumber', { valueAsNumber: true })}
                type="number"
                className="input w-full text-black"
                placeholder="Phone Number"
              />
            </div>
            <div className="">
              <label htmlFor="">NID No:</label>
              <br></br>
              <input
                {...register('nidNumber', { valueAsNumber: true })}
                type="number"
                className="input w-full text-black"
                placeholder="NID No ...."
              />
            </div>

            <div className="">
              <label className="label">Your Email</label>
              <input
                defaultValue={user?.email}
                readOnly
                {...register('yourEmail')}
                type="email"
                className="input w-full text-black"
              />
            </div>
            <div className="">
              <label className="label">Bike Registration Number:</label>
              <input
                {...register('BikeRegistrationNumber', { valueAsNumber: true })}
                type="number"
                className="input w-full text-black"
                placeholder="Bike Registration Number"
              />
            </div>
            <div className="">
              <label className="label">Bike Brand Model and Year:</label>
              <input
                {...register('BikeBrandModel')}
                type="text"
                className="input w-full text-black"
                placeholder="Bike Brand Model and Year"
              />
            </div>
            <div className="">
              <input
                type="submit"
                value="Submit"
                className="btn  w-full mt-2  btn-success py-3"
              ></input>
            </div>
          </div>
          <div className="">
            <figure>
              <img
                src="https://i.ibb.co.com/cSrsYgqm/14694900-courier-motorbike-delivery-package-1.png"
                alt=""
              />
            </figure>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Rider
