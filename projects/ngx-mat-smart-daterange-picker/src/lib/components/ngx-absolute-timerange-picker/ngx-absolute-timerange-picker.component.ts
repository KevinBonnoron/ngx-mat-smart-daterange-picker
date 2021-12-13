import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DateRange } from '../../types';
import { convertStringToDate, RELATIVE_TIME_REGEX } from '../../utils';

export interface AbsoluteTimeRange {
  from: string;
  to: string;
}

@Component({
  selector: 'ngx-absolute-timerange-picker',
  templateUrl: './ngx-absolute-timerange-picker.component.html'
})
export class NgxAbsoluteTimeRangePickerComponent implements OnChanges {
  readonly formGroup: FormGroup;

  @Input()
  value!: DateRange;

  @Input()
  min?: Date;

  @Input()
  max?: Date;

  @Output()
  readonly valueChanged = new EventEmitter<DateRange>();

  pickerVisible = true;

  constructor(private readonly formBuilder: FormBuilder, @Inject(LOCALE_ID) private readonly locale: string) {
    this.formGroup = this.formBuilder.group({
      from: ['', [Validators.required, periodValidator()]],
      to: ['', [Validators.required, periodValidator()]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      const { from, to } = changes['value'].currentValue ?? {};

      if (from) {
        this.formGroup.patchValue(
          {
            from: formatDate(from, 'yyyy-MM-dd HH:mm:ss', this.locale),
            to: formatDate(to, 'yyyy-MM-dd HH:mm:ss', this.locale)
          },
          { emitEvent: false }
        );
      }
    }

    if (changes['min'] || changes['max']) {
      this.formGroup
        .get('from')
        ?.setValidators(Validators.compose([Validators.required, periodValidator({ min: this.min, max: this.max })]));
      this.formGroup
        .get('to')
        ?.setValidators(Validators.compose([Validators.required, periodValidator({ min: this.min, max: this.max })]));
    }
  }

  applyTimeRange(absoluteTimeRange: AbsoluteTimeRange): void {
    this.valueChanged.emit({
      from: convertStringToDate(absoluteTimeRange.from, 'from'),
      to: convertStringToDate(absoluteTimeRange.to, 'to')
    });
  }
}

const periodValidator = ({
  min = new Date(0),
  max = new Date(3000, 0, 0, 0, 0, 0)
}: { min?: Date; max?: Date } = {}): ValidatorFn => {
  return control => {
    if (!control.value) {
      return null;
    }

    if (control.value.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}(T[0-9]{2}:[0-9]{2}:[0-9]{2})?/g)) {
      const date = new Date(new Date(control.value).setHours(0, 0, 0, 0));
      return !isNaN(date.getTime()) && date >= min && date <= max ? null : { period: 'notValid' };
    }

    const matches = control.value.match(RELATIVE_TIME_REGEX) ?? [];
    if (matches[0] === control.value) {
      return null;
    }

    return { period: 'notValid' };
  };
};
