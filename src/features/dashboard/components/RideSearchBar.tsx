type RideSearchBarProps = {
  destination: string;
  timeFilter: string;
  passengers: number;
};

export function RideSearchBar({
  destination,
  timeFilter,
  passengers,
}: RideSearchBarProps) {
  return (
    <section className="ride-search-card">
      <div className="ride-destination-field">
        <span className="ride-destination-icon" aria-hidden="true">
          <span className="ride-destination-icon-top" />
          <span className="ride-destination-icon-bottom" />
        </span>
        <span className="ride-destination-text">{destination}</span>
      </div>

      <div className="ride-filter-row">
        <button type="button" className="ride-filter-chip ride-filter-chip-active">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v4l2 2" />
          </svg>
          {timeFilter}
        </button>

        <button type="button" className="ride-filter-chip">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="8" r="3.5" />
            <path d="M6 19c1.2-2.2 3.4-3.5 6-3.5s4.8 1.3 6 3.5" />
          </svg>
          {passengers} {passengers === 1 ? "Pasajero" : "Pasajeros"}
        </button>

        <button type="button" className="ride-filter-chip">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          Filtros
        </button>
      </div>
    </section>
  );
}
