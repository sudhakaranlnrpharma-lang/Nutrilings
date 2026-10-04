type Props = { className?: string; tagline?: boolean };

function Leaf() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="absolute -top-[0.72em] left-1/2 h-[0.86em] w-[0.86em] -translate-x-[0.92em]"
    >
      <path
        d="M21 3c0 8.5-4.6 13.4-11.6 13.9-1.3.1-2.4-.1-3.3-.5C6.4 11.6 11.7 6.4 21 3Z"
        fill="#2F6B33"
      />
      <path
        d="M21 3C13.4 6.2 8.6 11.4 6.1 16.4"
        stroke="#143015"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M3.4 21.4c1.4-3.2 3-5.3 5.2-7.1"
        stroke="#2F6B33"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function Grain() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="absolute -top-[0.62em] left-1/2 h-[0.78em] w-[0.78em] -translate-x-[0.4em]"
    >
      <path
        d="M12 2.6c3.4 2 5.4 5.3 5.4 9.1 0 4.2-2.5 7.7-5.4 9.9-2.9-2.2-5.4-5.7-5.4-9.9 0-3.8 2-7.1 5.4-9.1Z"
        fill="#C8951F"
      />
      <path
        d="M12 4.4v14.8"
        stroke="#8a5f11"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ className = "", tagline = true }: Props) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span
        className="relative inline-block whitespace-nowrap"
        style={{
          fontFamily: '"Nunito", "Archivo", sans-serif',
          fontWeight: 900,
          letterSpacing: "-0.02em",
          fontSize: "1em",
        }}
      >
        <span className="text-[#2E6B1E]">
          Nutr
          <span className="relative inline-block">
            ı
            <Leaf />
          </span>
        </span>
        <span className="text-[#E2610A]">
          l
          <span className="relative inline-block">
            ı
            <Grain />
          </span>
          ngs
        </span>
        <svg
          viewBox="0 0 300 22"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute -bottom-[0.34em] left-[6%] h-[0.34em] w-[88%]"
        >
          <defs>
            <linearGradient id="nutrilings-swoosh" x1="0" x2="1">
              <stop offset="0" stopColor="#2E6B1E" />
              <stop offset="0.55" stopColor="#8FA32B" />
              <stop offset="1" stopColor="#C8951F" />
            </linearGradient>
          </defs>
          <path
            d="M2 16C60 4 150 1 298 6"
            stroke="url(#nutrilings-swoosh)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {tagline && (
        <span className="mt-[0.62em] flex items-center gap-[0.7em] text-[#2E6B1E]">
          <span className="h-px w-[1.6em] bg-[#2E6B1E]/50" />
          <span
            className="whitespace-nowrap"
            style={{
              fontSize: "0.29em",
              fontWeight: 700,
              letterSpacing: "0.2em",
            }}
          >
            OUR TRADITION, YOUR HEALTH
          </span>
          <span className="h-px w-[1.6em] bg-[#2E6B1E]/50" />
        </span>
      )}
    </span>
  );
}
