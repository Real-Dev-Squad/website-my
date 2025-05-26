import ENV from 'website-my/config/environment';

export const GITHUB_URL = 'https://github.com/Real-Dev-Squad/website-my';
export const RDS_MAIN_URL = 'http://realdevsquad.com/';
export const RDS_WELCOME_URL = 'https://welcome.realdevsquad.com/';
export const RDS_EVENTS_URL = 'http://realdevsquad.com/events.html';
export const RDS_MEMBERS_URL = 'https://members.realdevsquad.com/';
export const RDS_CRYPTO_URL = 'https://crypto.realdevsquad.com/';
export const RDS_STATUS_URL = 'https://status.realdevsquad.com/';
export const MAIN_SITE_URL = 'https://realdevsquad.com/';
export const GOTO_URL = 'https://realdevsquad.com/goto';
export const AUTH_URL =
  'https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97';
export const FETCH_AUTH_STATUS = `${ENV.BASE_API_URL}/auth/qr-code-auth/authorization_status/`;
export const FETCH_DEVICE_INFO = `${ENV.BASE_API_URL}/auth/device`;

export const MAIN_SITE_PREFIX = ENV.MAIN_SITE_URL;
export const REDIRECT_URLS = {
  // TODO: remove dev=true after it being removed from main site
  // @Tejasgp: is taking care of this under a doc
  profile: `${MAIN_SITE_PREFIX}/profile?dev=true`,
  index: `${MAIN_SITE_PREFIX}/status`,
  notifications: `${MAIN_SITE_PREFIX}/notifications?dev=true`,
  identity: `${MAIN_SITE_PREFIX}/identity?dev=true`,
  mobile: `${MAIN_SITE_PREFIX}/mobile?dev=true`,
  'new-signup': `${MAIN_SITE_PREFIX}/new-signup?dev=true`,
  discord: `${MAIN_SITE_PREFIX}/discord?dev=true`,
  // TODO: add link for the '/tasks` pas as well but on status site
  // rishi should be doing this
  // ticket link:
};
