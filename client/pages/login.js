import { useState } from 'react';
import Head from 'next/head';
import { useMutation } from '@apollo/client';

import { LOGIN_MUTATION } from '../graphql/mutations';

const LogInPage = () => {
  const [login, { data, loading }] = useMutation(LOGIN_MUTATION); // login mutation
  const [error, setError] = useState(null); // error state

  // form submitted
  const handleLogIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new window.FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    form.reset(); // reset the form after submit

    login({ variables: { email, password } }).catch((error) => {
      setError(error.graphQLErrors[0]); // set the error state with graphql errors
      console.log('ERR: ', error);
    });
  };

  return (
    <div>
      <Head>
        <title>SoundQ</title>
      </Head>
      <div style={{ padding: '1rem' }}>
        <strong>Log In</strong>
        <form onSubmit={handleLogIn}>
          <div>
            <input type="email" name="email" />
          </div>
          <div>
            <input type="password" name="password" />
          </div>
          <div>
            <button disabled={loading}>Submit</button>
          </div>
        </form>
        {data && (
          <div>
            <div>{data.login.email}</div>
            <div>
              {data.login.first_name} {data.login.last_name}
            </div>
          </div>
        )}
        {error && <strong>{error.message}</strong>}
      </div>
    </div>
  );
};

export default LogInPage;
