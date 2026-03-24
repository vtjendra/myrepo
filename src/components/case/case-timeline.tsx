interface TimelineEvent {
  id: string;
  type: 'created' | 'sent' | 'response' | 'status_change';
  content: string;
  date: string;
  sender?: string;
}

interface CaseTimelineProps {
  events: TimelineEvent[];
}

export function CaseTimeline({ events }: CaseTimelineProps) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, idx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {idx !== events.length - 1 && (
                <span
                  className="absolute left-3 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white ${
                      event.type === 'response'
                        ? 'bg-blue-500'
                        : event.type === 'sent'
                          ? 'bg-green-500'
                          : 'bg-gray-400'
                    }`}
                  >
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-700">{event.content}</p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-400">
                    <time>{new Date(event.date).toLocaleString()}</time>
                    {event.sender && <span>by {event.sender}</span>}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
