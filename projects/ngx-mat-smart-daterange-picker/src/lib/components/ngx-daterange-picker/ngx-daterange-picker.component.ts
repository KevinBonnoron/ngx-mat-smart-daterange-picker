import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDatepickerInputEvent,
  MatDateSelectionModel,
  MatRangeDateSelectionModel,
  MAT_DATE_RANGE_SELECTION_STRATEGY
} from '@angular/material/datepicker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, filter } from 'rxjs/operators';
import { DateRange } from '../../types';
import { isDateRangeEquals } from '../../utils/date-range.utils';
import { CustomRangeSelectionStrategy } from './custom-range.selection-strategy';

@Component({
  selector: 'ngx-daterange-picker',
  templateUrl: './ngx-daterange-picker.component.html',
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: CustomRangeSelectionStrategy
    },
    {
      provide: MatDateSelectionModel,
      useClass: MatRangeDateSelectionModel
    }
  ]
})
@UntilDestroy()
export class NgxDateRangePickerComponent implements OnInit, OnChanges {
  @Input()
  value!: DateRange;

  @Input()
  min?: Date;

  @Input()
  max?: Date;

  @Input()
  maxRange = 0;

  @Output()
  readonly valueChange = new EventEmitter<DateRange>();

  readonly formGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DATE_RANGE_SELECTION_STRATEGY)
    private readonly rangeSelectionStrategy: CustomRangeSelectionStrategy<any>
  ) {
    this.formGroup = this.formBuilder.group({
      from: [null, Validators.required],
      to: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(
        debounceTime(50),
        filter(() => this.formGroup.valid),
        filter(() => !isDateRangeEquals(this.value, this.formGroup.value)),
        untilDestroyed(this)
      )
      .subscribe(dateRange => this.valueChange.emit(dateRange));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      if (!isDateRangeEquals(this.value, this.formGroup.value)) {
        this.formGroup.patchValue(this.value, { emitEvent: false });
      }
    }

    if (changes['maxRange']) {
      this.rangeSelectionStrategy.maxRange = this.maxRange;
    }
  }

  onFromDateChange(): void {
    this.to.patchValue(undefined, { emitEvent: false });
  }

  onToDateChange(date: MatDatepickerInputEvent<any>): void {
    if (date.value !== null) {
      this.to.patchValue(new Date(date.value.setHours(23, 59, 59)), { emitEvent: false });
    } else {
      this.to.patchValue(null, { emitEvent: false });
    }
  }

  get from(): FormControl {
    return this.formGroup.get('from') as FormControl;
  }

  get to(): FormControl {
    return this.formGroup.get('to') as FormControl;
  }
}
