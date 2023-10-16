import { from, of } from 'rxjs';
import { IEvents } from '../types';

export const flattenEventValues = (events: Error | IEvents[]) => {
  if (events instanceof Error) return of(events);

  return from(events);
};
