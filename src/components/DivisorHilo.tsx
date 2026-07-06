export default function DivisorHilo() {
  const cuentas = [
    "#C1613B",
    "#D9A441",
    "#7C9885",
    "#9C4A2A",
    "#EFE1CC",
    "#C1613B",
    "#7C9885",
    "#D9A441",
  ];

  return (
    <div
      aria-hidden="true"
      className="mx-auto flex max-w-md items-center justify-center gap-3 py-2"
    >
      <svg width="100%" height="24" viewBox="0 0 400 24" className="max-w-md">
        <path
          d="M0 12 Q 25 0, 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12 T 350 12 T 400 12"
          fill="none"
          stroke="#EFE1CC"
          strokeWidth="2"
        />
        {cuentas.map((color, i) => (
          <circle
            key={i}
            cx={25 + i * 50}
            cy={12}
            r={i % 2 === 0 ? 7 : 5}
            fill={color}
          />
        ))}
      </svg>
    </div>
  );
}
