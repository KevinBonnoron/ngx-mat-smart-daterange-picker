import { formatDate } from '@angular/common';
import { notNil } from '../filters';
import { DateRange } from '../types';

export const isDateRangeEquals = (first: DateRange, second: DateRange, compareFormat = 'yyyy-MM-dd HH:mm'): boolean =>
  notNil(first) === notNil(second) &&
  isDateEquals(first.from, second.from, compareFormat) &&
  isDateEquals(first.to, second.to, compareFormat);

export const isDateEquals = (first: Date, second: Date, compareFormat = 'yyyy-MM-dd HH:mm'): boolean =>
  notNil(first) === notNil(second) &&
  formatDate(first, compareFormat, 'en') === formatDate(second, compareFormat, 'en');

export const formatDateRange = (dateRange: DateRange, locale: string = 'fr'): string => {
  const { from, to } = dateRange;
  return `${formatDate(from, 'yyyy-MM-dd HH:mm:ss', locale)} - ${formatDate(to, 'yyyy-MM-dd HH:mm:ss', locale)}`;
};
