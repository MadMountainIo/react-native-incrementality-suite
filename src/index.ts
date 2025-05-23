interface RequestEvent {
  appId: string;
  time: number;
  advertisingId?: string;
  idfv?: string;
  customId?: {
    type: string;
    value: string;
  };
  eventName: string;
  eventValue?: string | number | boolean | null;
  eventParams?: EventParam[];
  appVersion?: string;
}

interface RequestBody {
  events: RequestEvent[];
}

export interface EventParam {
  name: string;
  value: string | number | boolean | null | undefined;
}

export type Event = Omit<RequestEvent, 'time'>;

export function createEvent(data: Event): RequestEvent {
  return {
    ...data,
    time: new Date().getTime(),
  };
}

/**
 * Send events to Incrementality Suite backend
 */
export function trackEvents(events: RequestEvent[]): Promise<Response> {
  const apiUrl = 'https://europe-central2-incrementality-suite.cloudfunctions.net/users-events-apps'
  const body: RequestBody = {
    events,
  };

  return fetch(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  });
}
