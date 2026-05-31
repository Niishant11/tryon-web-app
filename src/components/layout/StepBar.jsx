export default function StepBar({ current }) {
  const steps = [
    { num: 1, label: "Select Items" },
    { num: 2, label: "Upload Photo" },
    { num: 3, label: "Your Look" },
  ];

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "var(--space-8)",
      position: "relative"
    }}>
      {/* Progress bar background */}
      <div style={{
        position: "absolute",
        top: "20px",
        left: 0,
        right: 0,
        height: "2px",
        backgroundColor: "var(--c-border)",
        zIndex: 0
      }} />

      {/* Progress bar fill */}
      <div style={{
        position: "absolute",
        top: "20px",
        left: 0,
        height: "2px",
        backgroundColor: "var(--c-ink)",
        width: `${((current - 1) / (steps.length - 1)) * 100}%`,
        transition: "width 0.3s ease",
        zIndex: 1
      }} />

      {/* Step indicators */}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", position: "relative", zIndex: 2 }}>
        {steps.map(step => (
          <div key={step.num} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: current >= step.num ? "var(--c-ink)" : "var(--c-surface)",
              border: `2px solid ${current >= step.num ? "var(--c-ink)" : "var(--c-border)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: current >= step.num ? "white" : "var(--c-text-muted)",
              fontWeight: "bold",
              marginBottom: "var(--space-2)",
              transition: "all 0.3s ease"
            }}>
              {current > step.num ? "✓" : step.num}
            </div>
            <div style={{
              fontSize: "var(--text-xs)",
              color: current >= step.num ? "var(--c-ink)" : "var(--c-text-muted)",
              fontWeight: current >= step.num ? 500 : 400,
              whiteSpace: "nowrap"
            }}>
              {step.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
