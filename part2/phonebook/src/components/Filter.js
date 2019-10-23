import React from 'react';

const Filter = ({ nameFilter, eventHandler }) => (
    <>
      filter shown with <input value={nameFilter} onChange={eventHandler} />
    </>
)

export default Filter;
