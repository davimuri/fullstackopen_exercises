import React from 'react';

const PersonForm = ({ onSubmit, name, onChangeName, number, onChangeNumber }) => (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={number} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
)
  
export default PersonForm;
