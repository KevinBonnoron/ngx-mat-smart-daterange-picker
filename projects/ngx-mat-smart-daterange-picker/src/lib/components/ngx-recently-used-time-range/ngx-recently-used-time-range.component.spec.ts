import { LOCALE_ID } from '@angular/core';
import { MockBuilder, MockRenderFactory, ngMocks } from 'ng-mocks';
import { NgxSmartDateRangePickerModule } from '../../ngx-mat-smart-daterange-picker.module';
import { Queue } from '../../types';
import { NgxRecentlyUsedTimeRangeComponent } from './ngx-recently-used-time-range.component';

describe('NgxRecentlyUsedTimeRangeComponent', () => {
  const factory = MockRenderFactory(NgxRecentlyUsedTimeRangeComponent, ['dateRanges']);
  const initValues = {
    dateRanges: new Queue(0)
  };

  ngMocks.faster();

  beforeAll(() => MockBuilder(NgxRecentlyUsedTimeRangeComponent, NgxSmartDateRangePickerModule).mock(LOCALE_ID, 'en'));
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
