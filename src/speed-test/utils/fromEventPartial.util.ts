import { fromEvent } from 'rxjs';
import { Stream } from 'stream';

export const partialFromEvent = (eventName: string) => (readable: Stream) =>
  fromEvent(readable, eventName);
