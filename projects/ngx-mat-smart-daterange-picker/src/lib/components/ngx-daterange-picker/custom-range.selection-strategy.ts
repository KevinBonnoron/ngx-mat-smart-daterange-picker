import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange, MatDateRangeSelectionStrategy } from '@angular/material/datepicker';

@Injectable()
export class CustomRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  private _maxRange = 0;

  constructor(private readonly dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D, currentRange: DateRange<D>) {
    let { start, end } = currentRange;
    if (start === null || (start && end)) {
      start = date;
      end = null;
    } else if (end === null && date !== undefined) {
      const maxDate = this.dateAdapter.addCalendarDays(start, this._maxRange);
      const minDate = this.dateAdapter.addCalendarDays(start, -this._maxRange);
      if (date < start && (this._maxRange === 0 || date >= minDate)) {
        end = start;
        start = date;
      } else if (date >= start && (this._maxRange === 0 || date <= maxDate)) {
        end = date;
      } else {
        start = date;
      }
    }

    return new DateRange<D>(start, end);
  }

  createPreview(activeDate: D | null, currentRange: DateRange<D>): DateRange<D> {
    if (currentRange.start && !currentRange.end) {
      const maxDate = this.dateAdapter.addCalendarDays(currentRange.start, this._maxRange);
      const minDate = this.dateAdapter.addCalendarDays(currentRange.start, -this._maxRange);
      let rangeStart = null;
      let rangeEnd = null;

      if (activeDate !== null) {
        if (activeDate < currentRange.start) {
          rangeStart = this._maxRange !== 0 && activeDate < minDate ? minDate : activeDate;
          rangeEnd = currentRange.start;
        } else {
          rangeStart = currentRange.start;
          rangeEnd = this._maxRange !== 0 && activeDate > maxDate ? maxDate : activeDate;
        }
      }

      return new DateRange(rangeStart, rangeEnd);
    }

    return new DateRange<D>(null, null);
  }

  set maxRange(maxRange: number) {
    this._maxRange = maxRange;
  }
}
