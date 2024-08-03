import React  from "react";

const SelectField = ({ label, name, placeholder, options, onChange}) => (
  <div className="form-control">
    {label && <label htmlFor="input-field label">{label}</label>}
    <select
      name={name}
      className="input input-bordered w-full"
      placeholder="category"
      onChange={onChange}
    >
        {options.map(option =>{
            return (
                <option key={option.value} value={option.value}>{option.label}</option>
            )
        })}
    </select>
  </div>
);

export default SelectField;