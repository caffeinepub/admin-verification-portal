import { useRef, useState } from "react";
import { AgreementScreen } from "./components/admin/AgreementScreen";
import { SuccessScreen } from "./components/admin/SuccessScreen";
import { VerificationScreen } from "./components/admin/VerificationScreen";

type Screen = "agreement" | "verification" | "success";

export default function App() {
  const [screen, setScreen] = useState<Screen>("agreement");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function navigateTo(next: Screen) {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Add exit class
    if (containerRef.current) {
      containerRef.current.classList.remove("screen-enter");
      containerRef.current.classList.add("screen-exit");
    }

    setTimeout(() => {
      setScreen(next);
      setIsTransitioning(false);

      if (containerRef.current) {
        containerRef.current.classList.remove("screen-exit");
      }
    }, 300);
  }

  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center justify-center p-4"
      style={{ background: "#000" }}
    >
      {/* Card */}
      <div
        className="admin-card w-full max-w-md rounded-2xl border border-[#333] p-8"
        style={{ background: "#111" }}
        data-ocid="app.card"
      >
        <div ref={containerRef} className="screen-enter">
          {screen === "agreement" && (
            <AgreementScreen onContinue={() => navigateTo("verification")} />
          )}
          {screen === "verification" && (
            <VerificationScreen onSuccess={() => navigateTo("success")} />
          )}
          {screen === "success" && <SuccessScreen />}
        </div>
      </div>
    </div>
  );
}
