interface CompanyLogoProps {
  letter: string;
}

export default function CompanyLogo({ letter }: CompanyLogoProps) {
  return (
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        background: "linear-gradient(135deg, #222, #555)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {letter}
    </div>
  );
}
