import ENV from 'website-my/config/environment';

const BASE_URL = ENV.BASE_API_URL;

export default async function checkUserName(firstname, lastname) {
  try {
    const sanitizedFirstname = firstname.toLowerCase();
    const sanitizedLastname = lastname.toLowerCase();
    const response = await fetch(
      `${BASE_URL}/users/username?firstname=${sanitizedFirstname}&lastname=${sanitizedLastname}&dev=true`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      return data;
    } else if (response.status === 401) {
      console.error('401');
      // this.toast.error(
      //   'Please login to continue.',
      //   '',
      //   toastNotificationTimeoutOptions
      // );
    }
  } catch (err) {
    console.error('40111111111111', err);

    // this.toast.error('Something went wrong!', 'error!', TOAST_OPTIONS);
  }
}
