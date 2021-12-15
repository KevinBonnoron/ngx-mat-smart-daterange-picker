# NgxMatSmartDateTimePicker

This library add a component to select a date range _à la_ Grafana. You can pick date with the picker, use pre-defined periods or select date manualy.

![screenshot](screenshot.png 'Example')

## Get started

Install the lib

```shell
npm install ngx-smart-daterange-picker
```

Then import the module somewhere in your application :

##### app.module.ts

```typescript
NgxSmartDateRangePickerModule.forRoot({
  lang: 'en-US' // available locales are en-GB, en-US, fr-BE, fr-CA, fr-FR
});
```

And use it in your component :

##### app.component.ts

```ts
start = new Date(2020, 0, 1);
today = new Date();

maxRange = 10; // limit selection range to 10 days (0 for unlimited)
```

##### app.component.html

```html
<ngx-mat-smart-daterange-picker [min]="start" [max]="today" [maxRange]="maxRange"> </ngx-mat-smart-daterange-picker>
```

## Options

You can define relative time range periods globally when importing module

##### app.module.ts

```typescript
const relativeTimeRanges: RelativeTimeRange[] = [
  { label: 'last5Minutes', from: 'now-5m', to: 'now' },
  { label: 'last15Minutes', from: 'now-15m', to: 'now' },
  { label: 'last30Minutes', from: 'now-30m', to: 'now' },
  { label: 'todaySoFar', from: 'now/d', to: 'now' }
];

NgxSmartDateRangePickerModule.forRoot({
  relativeTimeRanges,
  lang: 'en-US'
});
```

Or you can define it when using the component :

##### app.component.ts

```typescript
// Overload default configuration
readonly relativeTimeRanges: RelativeTimeRange[] = [
  { label: 'last5Minutes', from: 'now-5m', to: 'now' },
  { label: 'last15Minutes', from: 'now-15m', to: 'now' },
  { label: 'last30Minutes', from: 'now-30m', to: 'now' },
  { label: 'todaySoFar', from: 'now/d', to: 'now' }
];
```

#### app.component.html

```html
<ngx-mat-smart-daterange-picker
  [min]="start"
  [max]="today"
  [maxRange]="maxRange"
  [relativeTimeRanges]="relativeTimeRanges"
>
</ngx-mat-smart-daterange-picker>
```

## API

### NgxMatSmartDateRangePickerComponent

| Name                                             | Description                                                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| @Input() min: Date                               | Minimum date that can be selected in picker (default: undefined)                      |
| @Input() max: Date                               | Maximum date that can be selected in picker (default: undefined)                      |
| @Input() maxRange: number                        | Number of day that user can select in picker (default: 0)                             |
| @Input() recentlyUsedTimeRangeCount: number      | Number of date the component keep in the _recently used_ section (default: 4)         |
| @Input() relativeTimeRanges: RelativeTimeRange[] | Dates that can be shown in the _relative time range_ section (default: lot's of dates |
