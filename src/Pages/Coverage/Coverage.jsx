import React, { useEffect, useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
const Coverage = () => {
  const [center, setCenter] = useState([])
  console.log(center)
  const myRef = useRef(null)
  const position = [23.685, 90.3563]
  useEffect(() => {
    fetch('http://localhost:5000/home/center/data')
      .then((result) => result.json())
      .then((data) => {
        setCenter(data)
      })
  }, [])

  const handelSubmit = (e) => {
    e.preventDefault()
    const SearchValue = e.target.name.value
    const district = center.find((i) =>
      i.district.toLowerCase().includes(SearchValue.toLowerCase())
    )

    if (district) {
      const coord = [district.latitude, district.longitude]

      console.log(district, coord)
      myRef.current.flyTo(coord, 14)
    }
  }
  return (
    <div className="space-y-3">
      <div className="flex justify-center items-center">
        <form onSubmit={handelSubmit} className="flex items-center gap-5">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input name="name" type="search" required placeholder="Search" />
          </label>
          <button type="submit" className="btn bg-primary">
            submit
          </button>
        </form>
      </div>
      <div className="w-full h-[800px]">
        {center.length > 0 && (
          <MapContainer
            ref={myRef}
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            className="w-full h-[800px] "
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {center.map((item) => (
              <Marker position={[item.latitude, item.longitude]} key={item._id}>
                <Popup>
                  <strong>{item.district}</strong>
                  <br></br>service area:
                  <strong>{item.covered_area.join(', ')}</strong>
                  <br /> Easily customizable.
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  )
}

export default Coverage
