import { Component, ViewChild } from '@angular/core';
import { DateRange, MatDatepickerContent, MatDateRangePicker } from '@angular/material/datepicker';

@Component({
  selector: 'ngx-mat-date-range-picker',
  template: '<mat-datepicker-content></mat-datepicker-content>'
})
export class NgxMatDateRangePicker<D> extends MatDateRangePicker<D> {
  @ViewChild(MatDatepickerContent, { static: true })
  readonly matDatepickerContent!: MatDatepickerContent<DateRange<D>, D>;

  override open(): void {
    if (this.opened || this.disabled) {
      return;
    }

    if (!this.datepickerInput) {
      throw Error('Attempted to open an MatDatepicker with no associated input.');
    }

    (this as any)._opened = true;
    this._forwardContentValues(this.matDatepickerContent);
    this.openedStream.emit();
  }
}
