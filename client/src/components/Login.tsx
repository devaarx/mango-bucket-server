import React, { useState } from 'react';

interface Input {
  email?: string;
  password?: string;
}

export const Login = () => {
  const [input, setInput] = useState<Input | null>({ email: '', password: '' });

  const handleInputChange = (e: any) => {
    e.persist();
    setInput((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleLogIn = (e: any) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <div>
      <strong>log in</strong>
      <form onSubmit={(e) => handleLogIn(e)}>
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
