import { ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRenderFactory, ngMocks } from 'ng-mocks';
import { NgxSmartDateRangePickerModule } from '../../ngx-mat-smart-daterange-picker.module';
import { NgxAbsoluteTimeRangePickerComponent } from './ngx-absolute-timerange-picker.component';

describe('NgxAbsoluteTimeRangePickerComponent', () => {
  const factory = MockRenderFactory(NgxAbsoluteTimeRangePickerComponent);

  ngMocks.faster();

  beforeAll(() =>
    MockBuilder(NgxAbsoluteTimeRangePickerComponent, NgxSmartDateRangePickerModule).keep(ReactiveFormsModule)
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
