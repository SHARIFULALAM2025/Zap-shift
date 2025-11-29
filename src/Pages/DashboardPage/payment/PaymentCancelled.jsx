import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
      <div>
        <h1 className=""> your payment is cancelled please try again</h1>
        <Link to="/dashboard/myParcel" className="btn btn-primary">
          <button className="btn btn-primary"> try again</button>
        </Link>
      </div>
    )
};

export default PaymentCancelled;