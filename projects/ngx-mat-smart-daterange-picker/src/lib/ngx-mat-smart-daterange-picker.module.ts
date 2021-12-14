import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DEFAULT_LANGUAGE, TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxMatPopoverModule } from 'ngx-mat-popover';
import * as en from '../translate/messages.en.json';
import * as fr from '../translate/messages.fr.json';
import {
  NgxAbsoluteTimeRangePickerComponent,
  NgxDateRangePickerComponent,
  NgxMatDateRangePicker,
  NgxMatSmartDateRangePickerComponent,
  NgxRecentlyUsedTimeRangeComponent,
  NgxRelativeTimeRangePickerComponent
} from './components';
import { RELATIVE_TIME_RANGE_TOKEN } from './tokens';
import { RelativeTimeRange } from './types';

const defaultRelativeTimeRanges: RelativeTimeRange[] = [
  { label: 'last5Minutes', from: 'now-5m', to: 'now' },
  { label: 'last15Minutes', from: 'now-15m', to: 'now' },
  { label: 'last30Minutes', from: 'now-30m', to: 'now' },
  { label: 'last1Hour', from: 'now-1h', to: 'now' },
  { label: 'last3Hours', from: 'now-3h', to: 'now' },
  { label: 'last6Hours', from: 'now-6h', to: 'now' },
  { label: 'last12Hours', from: 'now-12h', to: 'now' },
  { label: 'last24Hours', from: 'now-24h', to: 'now' },
  { label: 'last2Days', from: 'now-2d', to: 'now' },
  { label: 'last7Days', from: 'now-7d', to: 'now' },
  { label: 'last30Days', from: 'now-30d', to: 'now' },
  { label: 'last90Days', from: 'now-90d', to: 'now' },
  { label: 'last6Months', from: 'now-6M', to: 'now' },
  { label: 'last1Year', from: 'now-1y', to: 'now' },
  { label: 'last2Years', from: 'now-2y', to: 'now' },
  { label: 'last5Years', from: 'now-5y', to: 'now' },
  { label: 'yesterday', from: 'now-1d/d', to: 'now-1d/d' },
  { label: 'dayBeforeYesterday', from: 'now-2d/d', to: 'now-2d/d' },
  { label: 'thisDayLastWeek', from: 'now-7d/d', to: 'now-7d/d' },
  { label: 'previousWeek', from: 'now-1w/w', to: 'now-1w/w' },
  { label: 'previousMonth', from: 'now-1M/M', to: 'now-1M/M' },
  { label: 'previousYear', from: 'now-1y/y', to: 'now-1y/y' },
  { label: 'today', from: 'now/d', to: 'now/d' },
  { label: 'todaySoFar', from: 'now/d', to: 'now' },
  { label: 'thisWeek', from: 'now/w', to: 'now/w' },
  { label: 'thisWeekSoFar', from: 'now/w', to: 'now' },
  { label: 'thisMonth', from: 'now/M', to: 'now/M' },
  { label: 'thisMonthSoFar', from: 'now/M', to: 'now' },
  { label: 'thisYear', from: 'now/y', to: 'now/y' },
  { label: 'thisYearSoFar', from: 'now/y', to: 'now' }
];

interface NgxSmartDateRangePickerModuleOptions {
  relativeTimeRanges?: RelativeTimeRange[];
  lang?: 'en-GB' | 'en-US' | 'fr-BE' | 'fr-CA' | 'fr-FR';
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PortalModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatListModule,
    MatTooltipModule,
    FlexLayoutModule,
    NgxMatPopoverModule,
    TranslateModule.forRoot()
  ],
  declarations: [
    NgxMatDateRangePicker,
    NgxMatSmartDateRangePickerComponent,
    NgxAbsoluteTimeRangePickerComponent,
    NgxRelativeTimeRangePickerComponent,
    NgxDateRangePickerComponent,
    NgxRecentlyUsedTimeRangeComponent
  ],
  exports: [NgxMatSmartDateRangePickerComponent]
})
export class NgxSmartDateRangePickerModule {
  constructor(private readonly translateService: TranslateService) {
    this.translateService.setTranslation('en-GB', en);
    this.translateService.setTranslation('en-US', en);
    this.translateService.setTranslation('fr-BE', fr);
    this.translateService.setTranslation('fr-CA', fr);
    this.translateService.setTranslation('fr-FR', fr);
  }

  static forRoot(
    options: NgxSmartDateRangePickerModuleOptions = {}
  ): ModuleWithProviders<NgxSmartDateRangePickerModule> {
    const { relativeTimeRanges = defaultRelativeTimeRanges, lang = 'en-US' } = options;
    return {
      ngModule: NgxSmartDateRangePickerModule,
      providers: [
        {
          provide: RELATIVE_TIME_RANGE_TOKEN,
          useValue: relativeTimeRanges
        },
        {
          provide: DEFAULT_LANGUAGE,
          useValue: lang
        }
      ]
    };
  }
}
