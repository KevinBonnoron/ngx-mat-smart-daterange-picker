type SingularTime = `${'Minute' | 'Hour' | 'Day' | 'Week' | 'Month' | 'Year'}`;
type PluralTime = `${SingularTime}s`;
type NumberSingularTime = `1${SingularTime}`;
type NumberPluralTime = `${number}${PluralTime}`;

type LastRelativeTimeRangeLabel = `last${NumberSingularTime | NumberPluralTime}`;
type PeriodTimeRangeLabel = `${'SoFar' | ''}`;
type TodayRelativeTimeRangeLabel = `today${PeriodTimeRangeLabel}`;
type DayRelativeTimeRangeLabel = `${
  | 'yesterday'
  | 'dayBeforeYesterday'
  | `thisDayLast${SingularTime}`
  | `previous${SingularTime}`}${PeriodTimeRangeLabel}`;
type ThisRelativeTimeRangeLabel = `this${SingularTime}${PeriodTimeRangeLabel}`;

type RelativeTimeRangeLabel = `${
  | LastRelativeTimeRangeLabel
  | TodayRelativeTimeRangeLabel
  | DayRelativeTimeRangeLabel
  | ThisRelativeTimeRangeLabel}`;
type SignedRelativeTime = `${'+' | '-'}${number}${'s' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y'}`;
type RangedRelativeTime = `/${'s' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y'}`;
type RelativeTime = `now${SignedRelativeTime | ''}${RangedRelativeTime | ''}`;

export interface RelativeTimeRange {
  label: RelativeTimeRangeLabel;
  from: RelativeTime;
  to: RelativeTime;
}
