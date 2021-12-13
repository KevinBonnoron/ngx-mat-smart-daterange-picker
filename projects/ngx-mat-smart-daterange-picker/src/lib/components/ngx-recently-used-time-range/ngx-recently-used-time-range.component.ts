import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import { DateRange, Queue } from '../../types';
import { formatDateRange } from '../../utils';

@Component({
  selector: 'ngx-recently-used-time-range',
  templateUrl: './ngx-recently-used-time-range.component.html',
  styleUrls: ['./ngx-recently-used-time-range.component.scss']
})
export class NgxRecentlyUsedTimeRangeComponent {
  @Input()
  dateRanges!: Queue<DateRange>;

  @Output()
  readonly selectionChange = new EventEmitter<DateRange>();

  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  onSelectionChanged(dateRange: DateRange): void {
    this.selectionChange.emit(dateRange);
  }

  formatDateRange(dateRange: DateRange): string {
    return formatDateRange(dateRange, this.locale);
  }
}
