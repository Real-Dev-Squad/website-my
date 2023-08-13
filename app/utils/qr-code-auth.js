import { toastNotificationTimeoutOptions } from '../constants/toast-notification';
import { FETCH_AUTH_STATUS, FETCH_DEVICE_INFO } from '../constants/url';

export const getAuthStatus = async (authStatus) => {
  const response = await fetch(`${FETCH_AUTH_STATUS}${authStatus}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  return response;
};

export const getDeviceInfo = async (verifyAuth) => {
  try {
    const response = await fetch(FETCH_DEVICE_INFO, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      await verifyAuth();
    } else {
      this.toast.error(
        'Please scan the QR code to continue',
        'Not verified',
        toastNotificationTimeoutOptions
      );
    }
  } catch (error) {
    this.toast.error('error');
  }
};
