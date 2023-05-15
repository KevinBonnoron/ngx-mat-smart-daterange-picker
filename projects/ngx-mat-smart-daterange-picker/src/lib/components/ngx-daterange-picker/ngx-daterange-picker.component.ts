import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import {
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDateSelectionModel,
  MatDatepickerInputEvent,
  MatRangeDateSelectionModel
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
  private readonly formBuilder = inject(FormBuilder);
  private readonly rangeSelectionStrategy = inject(MAT_DATE_RANGE_SELECTION_STRATEGY);

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

  readonly formGroup: FormGroup = this.formBuilder.group({
    from: [null, Validators.required],
    to: [null, Validators.required]
  });

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
      (this.rangeSelectionStrategy as CustomRangeSelectionStrategy<any>).maxRange = this.maxRange;
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

  get from(): UntypedFormControl {
    return this.formGroup.get('from') as UntypedFormControl;
  }

  get to(): UntypedFormControl {
    return this.formGroup.get('to') as UntypedFormControl;
  }
}
