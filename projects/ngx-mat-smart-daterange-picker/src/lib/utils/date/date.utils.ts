import { matchAll } from '../string.utils';

export const RELATIVE_TIME_REGEX = /^now(([\-+]{1})([0-9]+)([yMwdhms]{1}))?(\/[yMwd]{1})?$/g;
const DATE_REGEX = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/g;

type Target = 'from' | 'to';

const compute = (value1: number, sign: '+' | '-', value2: number): number => {
  switch (sign) {
    case '+':
      return value1 + value2;
    case '-':
      return value1 - value2;
  }
};

export const convertStringToDate = (value: string, target: Target): Date => {
  if (value.match(RELATIVE_TIME_REGEX)) {
    return convertRelativeStringToDate(value, target);
  }

  if (value.match(DATE_REGEX)) {
    if (target === 'from') {
      return new Date(Date.parse(`${value}T00:00:00`));
    } else {
      return new Date(Date.parse(`${value}T23:59:59`));
    }
  }

  return new Date(Date.parse(value));
};

/**
 *
 * @param value string
 * @param target from | to
 * @param now Date reference date to be taken (default now)
 * @returns
 */
export const convertRelativeStringToDate = (value: string | Date, target: Target, now = new Date()): Date => {
  if (value instanceof Date) {
    return value;
  }

  const date = new Date(now);
  const [matches] = matchAll(value, RELATIVE_TIME_REGEX) ?? [];
  if (matches) {
    const sign = matches[2] as '+' | '-';
    const operand = parseInt(matches[3]);
    switch (matches[4]) {
      case 'y':
        date.setFullYear(compute(date.getFullYear(), sign, operand));
        break;

      case 'M':
        date.setMonth(compute(date.getMonth(), sign, operand));
        break;

      case 'w':
        date.setDate(compute(date.getDate(), sign, operand * 7));
        break;

      case 'd':
        date.setDate(compute(date.getDate(), sign, operand));
        break;

      case 'h':
        date.setHours(compute(date.getHours(), sign, operand));
        break;

      case 'm':
        date.setMinutes(compute(date.getMinutes(), sign, operand));
        break;

      case 's':
        date.setSeconds(compute(date.getSeconds(), sign, operand));
        break;
    }

    switch (matches[5]) {
      case '/y':
        if (target === 'from') {
          date.setMonth(0, 1);
          date.setHours(0, 0, 0, 0);
        } else {
          date.setMonth(11, 31);
          date.setHours(23, 59, 59, 999);
        }
        break;

      case '/M':
        if (target === 'from') {
          date.setDate(1);
          date.setHours(0, 0, 0, 0);
        } else {
          date.setMonth(date.getMonth() + 1, 0);
          date.setHours(23, 59, 59, 999);
        }
        break;

      case '/w':
        const dayOfWeek = date.getDay() === 0 ? 6 : date.getDay() - 1;
        if (target === 'from') {
          date.setDate(date.getDate() - dayOfWeek);
          date.setHours(0, 0, 0, 0);
        } else {
          date.setDate(date.getDate() + (6 - dayOfWeek));
          date.setHours(23, 59, 59, 999);
        }
        break;

      case '/d':
        if (target === 'from') {
          date.setHours(0, 0, 0, 0);
        } else {
          date.setHours(23, 59, 59, 999);
        }
        break;
    }
  }

  return date;
};
