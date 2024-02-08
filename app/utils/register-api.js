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

const newRegisterUser = async (signupDetail, roles) => {
 const res = await registerUser({
    ...signupDetail,
    roles: {
      ...roles,
    },
  });
  return res;
};

export { registerUser, newRegisterUser };
