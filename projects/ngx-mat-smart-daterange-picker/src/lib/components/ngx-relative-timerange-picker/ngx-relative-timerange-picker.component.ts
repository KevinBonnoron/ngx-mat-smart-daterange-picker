import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { RELATIVE_TIME_RANGE_TOKEN } from '../../tokens';
import { DateRange, RelativeTimeRange } from '../../types';
import { convertRelativeStringToDate } from '../../utils';

@Component({
  selector: 'ngx-relative-timerange-picker',
  templateUrl: './ngx-relative-timerange-picker.component.html',
  styleUrls: ['./ngx-relative-timerange-picker.component.scss']
})
export class NgxRelativeTimeRangePickerComponent implements OnInit {
  @Input()
  relativeTimeRanges!: RelativeTimeRange[] | undefined;

  @Output()
  readonly selectionChange = new EventEmitter<DateRange>();

  constructor(
    @Inject(RELATIVE_TIME_RANGE_TOKEN)
    readonly defaultRelativeTimeRanges: RelativeTimeRange[]
  ) { }

  ngOnInit(): void {
    if (this.relativeTimeRanges === undefined) {
      this.relativeTimeRanges = this.defaultRelativeTimeRanges;
    }
  }

  onSelectionChanged(relativeTimeRange: RelativeTimeRange): void {
    this.selectionChange.emit({
      from: convertRelativeStringToDate(relativeTimeRange.from, 'from'),
      to: convertRelativeStringToDate(relativeTimeRange.to, 'to')
    });
  }
}
