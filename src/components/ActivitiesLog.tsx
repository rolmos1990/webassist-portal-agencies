import { format } from "date-fns";
import "../assets/scss/components/_activities-log.scss";


type Activity = { datetime: string; description: string };

export function ActivitiesLog({ activities }: { activities: Activity[] }) {
  // agrupar por fecha
  const grouped = activities.reduce<Record<string, Activity[]>>((acc, a) => {
    const key = format(new Date(a.datetime), "MMM dd, yyyy");
    (acc[key] ||= []).push(a);
    return acc;
  }, {});

  // fechas desc
  const dates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="activities-log position-relative">
      {/* rail vertical en el extremo izquierdo */}
      <div className="timeline-rail" aria-hidden />

      <div className="ps-5"> {/* contenido a la derecha del rail */}
        {dates.map((date) => (
          <section key={date} className="mb-4">
            <h6 className="fw-bold mb-3">{date}</h6>
            <ul className="list-unstyled m-0">
              {grouped[date]
                .sort((a, b) => +new Date(a.datetime) - +new Date(b.datetime))
                .map((act, i) => (
                  <li key={i} className="timeline-row mb-3">
                    <span className="timeline-dot bg-success" />
                    <div className="timeline-text">
                      <span className="time">
                        {format(new Date(act.datetime), "hh:mm a")}
                      </span>
                      <span className="badge bg-light text-dark fw-normal">
                        {act.description}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
