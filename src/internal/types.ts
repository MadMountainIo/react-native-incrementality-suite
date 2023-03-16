export interface TrackEventParams {
    appVersion: string,
    cookie: string,
    cookieType: string,
    dataCenter: string,
    hash: string,
    multiParamJSON: string,
    tagName: string,
    tagValue: string | null,
    trackOnlyUserEvents?: boolean;
}

export interface EventParams {
  appId: string
  time: number
  advertisingId?: string
  idfv?: string
  customId?: string
  customIdType?: 'clevertap'
  eventName: string
  eventValue: string | number | boolean
  eventParams?: {
    name: string
    value: string | number | boolean
  }[]
  appVersion: string
}