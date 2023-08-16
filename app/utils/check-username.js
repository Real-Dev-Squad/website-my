import ENV from 'website-my/config/environment';

const BASE_URL = ENV.BASE_API_URL;

async function checkUserName(userName) {
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

async function generateUsername(firstname, lastname, dev) {
  try {
    const lowerCaseFirstname = firstname.toLowerCase();
    const lowerCaseLastname = lastname.toLowerCase();
    const response = await fetch(
      `${BASE_URL}/users/username?firstname=${lowerCaseFirstname}&lastname=${lowerCaseLastname}&dev=${dev}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    const data = await response.json();
    return data.username;
  } catch (error) {
    console.error('Error : ', error);
  }
}

export { checkUserName, generateUsername };
