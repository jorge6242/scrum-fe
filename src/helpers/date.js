import moment from 'moment';

export const validateRange = (start, end) => {
  if (moment(start) < moment(end)) {
    return true;
  }
  return false;
}