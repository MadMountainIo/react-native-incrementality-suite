import type { TrackEventParams, EventParams } from "./internal/types";

export function trackEvent(
  trackEventParams: TrackEventParams,
  eventParams : Array<EventParams>
): Promise<any> {
  const {
    appVersion,
    cookie,
    cookieType,
    dataCenter,
    hash,
    multiParamJSON,
    tagName,
    tagValue,
    trackOnlyUserEvents,
  } = trackEventParams;

  
  const creativeCDNURL = `https://${dataCenter}.creativecdn.com/tags?type=none&ckt=${cookieType}&ck=${cookie}&id=pr_${hash}_custom_${tagName}_${tagValue}&event_parameters=${multiParamJSON}&v=${appVersion}`
  const usersEventsURL = `https://users-events-lxvi645jpa-lm.a.run.app?type=none&ckt=${cookieType}&ck=${cookie}&id=pr_${hash}_custom_${tagName}_${tagValue}&event_parameters=${multiParamJSON}&v=${appVersion}`
  const trackEventURL = 'https://users-events-app-lxvi645jpa-lm.a.run.app';

  const creativeCDNRequest = new Promise((resolve, reject) => {
    if (!trackOnlyUserEvents) {
      return fetch(creativeCDNURL, {
        method: 'POST',
        body: JSON.stringify({})
      })
      .then(response => {
        return resolve(response);
      })
      .catch(error => {
        return reject(error);
      });
    }
    return reject();
  }).catch(() => {});

  const usersEventsRequest = new Promise((resolve, reject) => {
    return fetch(usersEventsURL, {
      method: 'POST',
      body: JSON.stringify({})
    })
    .then(response => {
      return resolve(response);
    })
    .catch(error => {
      return reject(error);
    });
  }).catch(() => {});

  const trackEventRequest = new Promise((resolve, reject) => {
    if (!eventParams || eventParams.length < 1) return resolve({});
    const body = {
      events: eventParams
    }
    return fetch(trackEventURL, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    })
    .then(response => {
      response.json().then(json => {
      });
      return resolve(response);
    })
    .catch(error => {
      return reject(error);
    });
  });

  return Promise.allSettled([creativeCDNRequest, usersEventsRequest, trackEventRequest])
}

export type IncrementalitySuiteTrackEventParams = TrackEventParams;
