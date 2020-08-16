import React, { useState } from 'react';

interface Input {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}

export const Register = () => {
  const [input, setInput] = useState<Input | null>({ email: '', password: '', first_name: '', last_name: '' });

  const handleInputChange = (e: any) => {
    e.persist();
    setInput((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <div>
      <strong>register</strong>
      <form onSubmit={(e) => handleRegister(e)}>
        <div>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={input?.first_name}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={input?.last_name}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email ID"
            value={input?.email}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={input?.password}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};
