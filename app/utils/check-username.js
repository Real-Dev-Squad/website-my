import ENV from 'website-my/config/environment'; // remove this when new flow goes live

const BASE_URL = ENV.BASE_API_URL; // remove this when new flow goes live

export default async function checkUserName(userName) {
  if (!userName) {
    alert('username field cannot be empty');
  }
  try {
    const lowerCaseUsername = userName.toLowerCase();
    const response = await fetch(
      `${BASE_URL}/users/isUsernameAvailable/${lowerCaseUsername}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    const data = await response.json();
    const { isUsernameAvailable } = data;
    return isUsernameAvailable;
  } catch (error) {
    console.error('Error : ', error);
  }
}
