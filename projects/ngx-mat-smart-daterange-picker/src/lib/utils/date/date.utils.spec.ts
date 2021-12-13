import { convertRelativeStringToDate } from './date.utils';

describe('DateUtils', () => {
  it('should convert relative string to date', () => {
    const referenceDate = new Date(2020, 0, 1, 12, 0, 0, 0);

    // Seconds
    expect(convertRelativeStringToDate('now-1s', 'from', referenceDate)).toEqual(new Date(2020, 0, 1, 11, 59, 59, 0));
    expect(convertRelativeStringToDate('now-1s/d', 'from', referenceDate)).toEqual(new Date(2020, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1s/w', 'from', referenceDate)).toEqual(new Date(2019, 11, 30, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1s/M', 'from', referenceDate)).toEqual(new Date(2020, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1s/y', 'from', referenceDate)).toEqual(new Date(2020, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1s', 'to', referenceDate)).toEqual(new Date(2020, 0, 1, 11, 59, 59, 0));
    expect(convertRelativeStringToDate('now-1s/d', 'to', referenceDate)).toEqual(new Date(2020, 0, 1, 23, 59, 59, 999));
    expect(convertRelativeStringToDate('now-1s/w', 'to', referenceDate)).toEqual(new Date(2020, 0, 5, 23, 59, 59, 999));
    expect(convertRelativeStringToDate('now-1s/M', 'to', referenceDate)).toEqual(
      new Date(2020, 0, 31, 23, 59, 59, 999)
    );
    expect(convertRelativeStringToDate('now-1s/y', 'to', referenceDate)).toEqual(
      new Date(2020, 11, 31, 23, 59, 59, 999)
    );

    // Minutes
    expect(convertRelativeStringToDate('now-1m', 'from', referenceDate)).toEqual(new Date(2020, 0, 1, 11, 59, 0, 0));
    expect(convertRelativeStringToDate('now-1m/d', 'from', referenceDate)).toEqual(new Date(2020, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1m/w', 'from', referenceDate)).toEqual(new Date(2019, 11, 30, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1m/M', 'from', referenceDate)).toEqual(new Date(2020, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1m/y', 'from', referenceDate)).toEqual(new Date(2020, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1m', 'to', referenceDate)).toEqual(new Date(2020, 0, 1, 11, 59, 0, 0));
    expect(convertRelativeStringToDate('now-1m/d', 'to', referenceDate)).toEqual(new Date(2020, 0, 1, 23, 59, 59, 999));
    expect(convertRelativeStringToDate('now-1m/w', 'to', referenceDate)).toEqual(new Date(2020, 0, 5, 23, 59, 59, 999));
    expect(convertRelativeStringToDate('now-1m/M', 'to', referenceDate)).toEqual(
      new Date(2020, 0, 31, 23, 59, 59, 999)
    );
    expect(convertRelativeStringToDate('now-1m/y', 'to', referenceDate)).toEqual(
      new Date(2020, 11, 31, 23, 59, 59, 999)
    );

    // Hours
    expect(convertRelativeStringToDate('now-1h', 'from', referenceDate)).toEqual(new Date(2020, 0, 1, 11, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1h/d', 'from', referenceDate)).toEqual(new Date(2020, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1h/w', 'from', referenceDate)).toEqual(new Date(2019, 11, 30, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1h/M', 'from', referenceDate)).toEqual(new Date(2020, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1h/y', 'from', referenceDate)).toEqual(new Date(2020, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1h', 'to', referenceDate)).toEqual(new Date(2020, 0, 1, 11, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1h/d', 'to', referenceDate)).toEqual(new Date(2020, 0, 1, 23, 59, 59, 999));
    expect(convertRelativeStringToDate('now-1h/w', 'to', referenceDate)).toEqual(new Date(2020, 0, 5, 23, 59, 59, 999));
    expect(convertRelativeStringToDate('now-1h/M', 'to', referenceDate)).toEqual(
      new Date(2020, 0, 31, 23, 59, 59, 999)
    );
    expect(convertRelativeStringToDate('now-1h/y', 'to', referenceDate)).toEqual(
      new Date(2020, 11, 31, 23, 59, 59, 999)
    );

    // Days
    expect(convertRelativeStringToDate('now-1d', 'from', referenceDate)).toEqual(new Date(2019, 11, 31, 12, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1d/d', 'from', referenceDate)).toEqual(new Date(2019, 11, 31, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1d/w', 'from', referenceDate)).toEqual(new Date(2019, 11, 30, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1d/M', 'from', referenceDate)).toEqual(new Date(2019, 11, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1d/y', 'from', referenceDate)).toEqual(new Date(2019, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1d', 'to', referenceDate)).toEqual(new Date(2019, 11, 31, 12, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1d/d', 'to', referenceDate)).toEqual(
      new Date(2019, 11, 31, 23, 59, 59, 999)
    );
    expect(convertRelativeStringToDate('now-1d/w', 'to', referenceDate)).toEqual(new Date(2020, 0, 5, 23, 59, 59, 999));
    expect(convertRelativeStringToDate('now-1d/M', 'to', referenceDate)).toEqual(
      new Date(2019, 11, 31, 23, 59, 59, 999)
    );
    expect(convertRelativeStringToDate('now-1d/y', 'to', referenceDate)).toEqual(
      new Date(2019, 11, 31, 23, 59, 59, 999)
    );

    // Weeks
    expect(convertRelativeStringToDate('now-1w', 'from', referenceDate)).toEqual(new Date(2019, 11, 25, 12, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1w/d', 'from', referenceDate)).toEqual(new Date(2019, 11, 25, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1w/w', 'from', referenceDate)).toEqual(new Date(2019, 11, 23, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1w/M', 'from', referenceDate)).toEqual(new Date(2019, 11, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1w/y', 'from', referenceDate)).toEqual(new Date(2019, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1w', 'to', referenceDate)).toEqual(new Date(2019, 11, 25, 12, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1w/d', 'to', referenceDate)).toEqual(
      new Date(2019, 11, 25, 23, 59, 59, 999)
    );
    expect(convertRelativeStringToDate('now-1w/w', 'to', referenceDate)).toEqual(
      new Date(2019, 11, 29, 23, 59, 59, 999)
    );
    expect(convertRelativeStringToDate('now-1w/M', 'to', referenceDate)).toEqual(
      new Date(2019, 11, 31, 23, 59, 59, 999)
    );
    expect(convertRelativeStringToDate('now-1w/y', 'to', referenceDate)).toEqual(
      new Date(2019, 11, 31, 23, 59, 59, 999)
    );

    // Months
    expect(convertRelativeStringToDate('now-1M', 'from', referenceDate)).toEqual(new Date(2019, 11, 1, 12, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1M/d', 'from', referenceDate)).toEqual(new Date(2019, 11, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1M/w', 'from', referenceDate)).toEqual(new Date(2019, 10, 25, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1M/M', 'from', referenceDate)).toEqual(new Date(2019, 11, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1M/y', 'from', referenceDate)).toEqual(new Date(2019, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1M', 'to', referenceDate)).toEqual(new Date(2019, 11, 1, 12, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1M/d', 'to', referenceDate)).toEqual(
      new Date(2019, 11, 1, 23, 59, 59, 999)
    );
    expect(convertRelativeStringToDate('now-1M/w', 'to', referenceDate)).toEqual(
      new Date(2019, 11, 1, 23, 59, 59, 999)
    );
    expect(convertRelativeStringToDate('now-1M/M', 'to', referenceDate)).toEqual(
      new Date(2019, 11, 31, 23, 59, 59, 999)
    );
    expect(convertRelativeStringToDate('now-1M/y', 'to', referenceDate)).toEqual(
      new Date(2019, 11, 31, 23, 59, 59, 999)
    );

    // Years
    expect(convertRelativeStringToDate('now-1y', 'from', referenceDate)).toEqual(new Date(2019, 0, 1, 12, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1y/d', 'from', referenceDate)).toEqual(new Date(2019, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1y/w', 'from', referenceDate)).toEqual(new Date(2018, 11, 31, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1y/M', 'from', referenceDate)).toEqual(new Date(2019, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1y/y', 'from', referenceDate)).toEqual(new Date(2019, 0, 1, 0, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1y', 'to', referenceDate)).toEqual(new Date(2019, 0, 1, 12, 0, 0, 0));
    expect(convertRelativeStringToDate('now-1y/d', 'to', referenceDate)).toEqual(new Date(2019, 0, 1, 23, 59, 59, 999));
    expect(convertRelativeStringToDate('now-1y/w', 'to', referenceDate)).toEqual(new Date(2019, 0, 6, 23, 59, 59, 999));
    expect(convertRelativeStringToDate('now-1y/M', 'to', referenceDate)).toEqual(
      new Date(2019, 0, 31, 23, 59, 59, 999)
    );
    expect(convertRelativeStringToDate('now-1y/y', 'to', referenceDate)).toEqual(
      new Date(2019, 11, 31, 23, 59, 59, 999)
    );
  });
});
