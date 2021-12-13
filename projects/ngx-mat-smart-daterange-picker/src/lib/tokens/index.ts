import { InjectionToken } from '@angular/core';
import { RelativeTimeRange } from '../types';

export const RELATIVE_TIME_RANGE_TOKEN = new InjectionToken<RelativeTimeRange[]>('relative time ranges');
