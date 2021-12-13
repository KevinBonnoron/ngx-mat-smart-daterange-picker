import { ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MockBuilder, MockRenderFactory, ngMocks } from 'ng-mocks';
import { NgxSmartDateRangePickerModule } from '../../ngx-mat-smart-daterange-picker.module';
import { NgxDateRangePickerComponent } from './ngx-daterange-picker.component';

describe('NgxDateRangePickerComponent', () => {
  const factory = MockRenderFactory(NgxDateRangePickerComponent);

  ngMocks.faster();

  beforeAll(() =>
    MockBuilder(NgxDateRangePickerComponent, NgxSmartDateRangePickerModule)
      .keep(ReactiveFormsModule)
      .mock(DateAdapter, NativeDateAdapter)
  );
  beforeAll(() => factory.configureTestBed());

  it('should create', () => {
    const fixture = factory();
    expect(fixture).toBeDefined();
  });

  it('should have the expected render', () => {
    const fixture = factory();
    expect(fixture).toMatchSnapshot();
  });
});
