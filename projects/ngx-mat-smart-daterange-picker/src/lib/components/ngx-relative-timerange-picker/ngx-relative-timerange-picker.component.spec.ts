import { MockBuilder, MockRenderFactory, ngMocks } from 'ng-mocks';
import { NgxSmartDateRangePickerModule } from '../../ngx-mat-smart-daterange-picker.module';
import { NgxRelativeTimeRangePickerComponent } from './ngx-relative-timerange-picker.component';

describe('NgxRelativeTimeRangePickerComponent', () => {
  const factory = MockRenderFactory(NgxRelativeTimeRangePickerComponent);

  ngMocks.faster();

  beforeAll(() => MockBuilder(NgxRelativeTimeRangePickerComponent, NgxSmartDateRangePickerModule));
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
