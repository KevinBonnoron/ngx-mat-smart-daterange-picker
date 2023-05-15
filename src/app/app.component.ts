import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { RelativeTimeRange } from 'ngx-mat-smart-daterange-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly formGroup: UntypedFormGroup;

  readonly start = new Date(2020, 0, 1);
  readonly today = new Date();

  // Overload default configuration
  readonly relativeTimeRanges: RelativeTimeRange[] = [
    { label: 'last5Minutes', from: 'now-5m', to: 'now' },
    { label: 'last15Minutes', from: 'now-15m', to: 'now' },
    { label: 'last30Minutes', from: 'now-30m', to: 'now' },
    { label: 'todaySoFar', from: 'now/d', to: 'now' }
  ];

  maxRange = 0;

  constructor(private readonly formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      dateRange: [null]
    });

    this.formGroup.get('dateRange')?.disable();
    this.formGroup.get('dateRange')?.valueChanges.subscribe(console.log);
  }
}
