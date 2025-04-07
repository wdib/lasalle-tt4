import React, { useState } from 'react';

function UserProfileForm () {
  const [ formData, setFormData ] = useState({
    name  : '',
    email : '',
  });

  const [ error, setError ] = useState( '' );

  const handleInputChange = ( event ) => {
    const
      target = event.target,
      name   = target.name,
      value  = target.value
    ;
    setFormData({
      ...formData,
      name : value,
    });
  };

  const isFormValid = () => {
    if ( ! formData.name || ! formData.email ) {
      setError( 'All fields are required' );
      return false;
    }

    setError( '' );
    return true;
  };

  const handleSubmit = ( event ) => {
    event.preventDefault();

  };

  return (
    <div>
      <h2>Update Your Profile</h2>
      {
        error &&
        <p style = { { color : 'red' } }>{ error }</p>
      }
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type     = "text"
            id       = "name"
            name     = "email"
            value    = { formData.name     }
            onChange = { handleInputChange }
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type     = "email"
            id       = "email"
            name     = "email"
            value    = { formData.email    }
            onChange = { handleInputChange }
          />
        </div>
        <button type="submit" disabled={ is_loading }>Update Profile</button>
      </form>
    </div>
  );
}

export default UserProfileForm;