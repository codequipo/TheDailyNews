import React from 'react';
import { MDBInput } from 'mdbreact';

const InputPage = () => {
  return (
    <div>
      {/* Material checked */}
      <MDBInput label="Filled-in unchecked" checked type="checkbox" id="checkbox2" />
    </div>
  )
}

export default InputPage;