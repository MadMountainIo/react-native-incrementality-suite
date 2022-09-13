import type { TrackEventParams } from "./internal/types";

export function trackEvent({
  appVersion,
  cookie,
  cookieType,
  dataCenter,
  hash,
  multiParamJSON,
  tagName,
  tagValue,
}: TrackEventParams): void {
  const url = `https://${dataCenter}.creativecdn.com/tags?type=none&ckt=${cookieType}&ck=${cookie}&id=pr_${hash}_custom_${tagName}_${tagValue}&event_parameters=${multiParamJSON}&v=${appVersion}`

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({})
  })
}
