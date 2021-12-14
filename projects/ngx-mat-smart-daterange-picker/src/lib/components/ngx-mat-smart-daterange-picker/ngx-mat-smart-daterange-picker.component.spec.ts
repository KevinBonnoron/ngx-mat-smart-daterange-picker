import { MockBuilder, MockRenderFactory, ngMocks } from 'ng-mocks';
import { NgxSmartDateRangePickerModule } from '../../ngx-mat-smart-daterange-picker.module';
import { NgxMatSmartDateRangePickerComponent } from './ngx-mat-smart-daterange-picker.component';

describe('NgxMatSmartDateRangePickerComponent', () => {
  const factory = MockRenderFactory(NgxMatSmartDateRangePickerComponent, ['value']);
  const initValues = {
    value: {
      from: new Date('2020-01-01T00:00:00Z'),
      to: new Date('2020-01-01T00:00:00Z')
    }
  };

  ngMocks.faster();

  beforeAll(() => MockBuilder(NgxMatSmartDateRangePickerComponent, NgxSmartDateRangePickerModule));
  beforeAll(() => factory.configureTestBed());

  it('should create', () => {
    const fixture = factory(initValues);
    expect(fixture).toBeDefined();
  });

  it('should have the expected render', () => {
    const fixture = factory(initValues);
    expect(fixture).toMatchSnapshot();
  });
});
