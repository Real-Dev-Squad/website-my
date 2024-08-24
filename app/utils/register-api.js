import ENV from 'website-my/config/environment';
const { BASE_API_URL } = ENV;
const registerUser = (user) =>
  fetch(`${BASE_API_URL}/users/self`, {
    method: 'PATCH',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

const newRegisterUser = async (signupDetails, roles) => {
  const getResponse = await fetch(`${BASE_API_URL}/users/self`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const userData = await getResponse.json();

  const res = await registerUser({
    ...signupDetails,
    roles: {
      ...userData.roles,
      ...roles,
    },
  });

  return res;
};

export { registerUser, newRegisterUser };
