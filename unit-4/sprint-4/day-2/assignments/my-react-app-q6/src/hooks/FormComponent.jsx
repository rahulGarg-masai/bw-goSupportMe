import React from 'react';
import useForm from './useForm';

function FormComponent() {
  const [values, handleChange] = useForm({ name: '', email: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormComponent;