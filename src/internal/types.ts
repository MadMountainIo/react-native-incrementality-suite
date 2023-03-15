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