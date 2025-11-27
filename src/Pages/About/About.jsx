import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';

const About = () => {
  const [tab, setTab] = useState([])
  const [value, setValue] = useState(0)
    useEffect(() => {
        fetch('http://localhost:5000/about/tab')
            .then(result => result.json())
            .then(data => {
            setTab(data)

        })

    }, [])


      const handleChange = (event, newValue) => {
        setValue(newValue)
  }
  const CustomTabPanel = ({index, children, value}) => {
    return <div>{value === index && <Box sx={{ p: 2 }}>{children}</Box>}</div>
  }

    return (
      <div>
        <div className="">
          <h1 className="text-5xl font-bold">About Us</h1>
          <p className="text-sx font-normal">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>
        <div className="">
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                maxWidth: { xs: 320, sm: 480 },
                bgcolor: 'background.paper',
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {tab.map((item) => (
                  <Tab label={item.tab} key={item._id} />
                ))}
              </Tabs>
            </Box>

            {tab.map((item, index) => (
              <CustomTabPanel key={item._id} value={value} index={index}>
                {item.description}
              </CustomTabPanel>
            ))}
          </Box>
        </div>
      </div>
    )
};

export default About;