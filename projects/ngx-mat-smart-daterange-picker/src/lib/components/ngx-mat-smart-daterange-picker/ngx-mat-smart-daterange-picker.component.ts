import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NgxMatPopoverComponent } from 'ngx-mat-popover';
import { Subject } from 'rxjs';
import { DateRange, Queue, RelativeTimeRange, UniqueQueue } from '../../types';
import { formatDateRange, isDateRangeEquals } from '../../utils';

@Component({
  selector: 'ngx-mat-smart-daterange-picker',
  templateUrl: './ngx-mat-smart-daterange-picker.component.html',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: NgxMatSmartDateRangePickerComponent
    }
  ],
  exportAs: 'ngxSmartDateRangePicker'
})
export class NgxMatSmartDateRangePickerComponent
  implements OnInit, OnDestroy, MatFormFieldControl<DateRange>, ControlValueAccessor
{
  static nextId = 0;

  @ViewChild(NgxMatPopoverComponent, { static: true })
  readonly ngxMatPopover!: NgxMatPopoverComponent;

  @Input()
  min?: Date;

  @Input()
  max?: Date;

  @Input()
  maxRange = 0;

  @Input()
  recentlyUsedTimeRangeCount = 5;

  @Input()
  relativeTimeRanges: RelativeTimeRange[] | undefined = undefined;

  @HostBinding()
  id = `mat-smart-datetime-picker-${NgxMatSmartDateRangePickerComponent.nextId++}`;
  stateChanges = new Subject<void>();
  private _value!: DateRange;
  private _placeholder: string = '';
  private _focused: boolean = false;
  private _required: boolean = false;
  private _disabled = false;
  private onChange: (_: any) => void = () => {};
  private onTouched = () => {};
  controlType = 'mat-smart-datetime-picker';
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  recentlyUsedTimeRanges!: Queue<DateRange>;

  constructor(
    @Optional() @Self() public readonly ngControl: NgControl,
    private readonly _elementRef: ElementRef,
    @Inject(LOCALE_ID) private readonly locale: string
  ) {
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.recentlyUsedTimeRanges = new UniqueQueue<DateRange>(this.recentlyUsedTimeRangeCount, isDateRangeEquals);
    if (this.value) {
      this.recentlyUsedTimeRanges.push(this.value);
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  dateRangePickerChange(dateRange: DateRange): void {
    this.value = dateRange;
  }

  absoluteTimeRangeChange(dateRange: DateRange): void {
    this.ngxMatPopover.close();
    this.value = dateRange;
  }

  recentlyUsedTimeRangeChange(dateRange: DateRange): void {
    this.ngxMatPopover.close();
    this.value = dateRange;
  }

  relativeTimeRangeChange(dateRange: DateRange): void {
    this.ngxMatPopover.close();
    this.value = dateRange;
  }

  writeValue(value: DateRange): void {
    this._value = value;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDescribedByIds(ids: string[]): void {
    const controlElement = this._elementRef.nativeElement.querySelector('button')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent): void {
    // Nothing to do
  }

  onFocusIn(event: FocusEvent) {
    if (!this._focused) {
      this._focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this._focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  get timeRangeLabel() {
    if (this.value) {
      return formatDateRange(this.value, this.locale);
    }

    return '';
  }

  @Input()
  get value(): DateRange {
    return this._value;
  }

  set value(value: DateRange) {
    if (value?.from && value?.to && JSON.stringify(value) !== JSON.stringify(this._value)) {
      this.recentlyUsedTimeRanges?.push(value);

      this._value = value;
      this.stateChanges.next();
      this.onChange(value);
    }
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(placeholder) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  get empty(): boolean {
    return this.value === null;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat(): boolean {
    return this._focused || !this.empty;
  }

  @Input()
  get required() {
    return this._required;
  }

  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    // TODO
    // this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.ngControl?.invalid ?? false;
  }

  get focused(): boolean {
    return this._focused;
  }
}
