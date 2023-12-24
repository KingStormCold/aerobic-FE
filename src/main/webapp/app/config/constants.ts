export const AUTHORITIES = [
  'ADMIN'
]

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error',
};

export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';

export const REX = {
  email: /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
  number: /^[0-9\b]+$/
}

export const validNumber = new RegExp(
  '^\\d+$'
);


export const CONSTANT = Object.freeze({

  SERVER_PATH: Object.freeze({
    DOMAIN: process.env.SERVER_API_URL ? process.env.SERVER_API_URL : 'http://localhost:8000',
  }),
  ROLES: {
    CATEGORY: 'ADMIN_CATEGORY',
    USER: 'ADMIN_USER',
    COURSE: 'ADMIN_COURSE',
    SUBJECT: 'ADMIN_SUBJECT',
    VIDEO: 'ADMIN_VIDEO',
  }
})
