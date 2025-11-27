import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react';
const AccordionPage = () => {
    const [faq,setFaq]=useState([])
    useEffect(() => {
        fetch('http://localhost:5000/home/faq/question')
            .then(result => result.json())
            .then(data => {
           setFaq(data)

        })

    },[])
    return (
      <div className='md:mt-24'>
        <div className="text-center space-y-3 md:mb-12">
          <h1 className="text-4xl font-bold">
            Frequently Asked Question (FAQ)
          </h1>
          <p className="text-xs font-medium">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>
        {faq.map((item) => (
          <Accordion key={item._id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" className="">
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="">{item.description}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    )
};

export default AccordionPage;