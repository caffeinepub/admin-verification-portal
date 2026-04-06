import { AlertTriangle, ChevronDown, Shield } from "lucide-react";
import { useState } from "react";

interface AgreementScreenProps {
  onContinue: () => void;
}

export function AgreementScreen({ onContinue }: AgreementScreenProps) {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  function handleContinue() {
    if (!agreed) {
      setError("You must accept the policy to continue.");
      return;
    }
    setError("");
    onContinue();
  }

  function handleCheckboxChange(checked: boolean) {
    setAgreed(checked);
    if (checked) setError("");
  }

  return (
    <div className="screen-enter">
      {/* Title */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-4">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-[0.2em] text-white uppercase">
          Privacy Policy & Admin Rules
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Read and accept the terms to proceed
        </p>
      </div>

      {/* Scrollable content box */}
      <section
        className="scrollable-content rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] overflow-y-auto mb-6"
        style={{ maxHeight: "256px" }}
        aria-label="Policy content"
      >
        <div className="p-5 space-y-5">
          {/* Privacy Policy */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-white rounded-full" />
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                Privacy Policy
              </h2>
            </div>
            <ul className="space-y-2">
              {[
                "Only your Telegram username is collected.",
                "Data is used strictly for admin verification purposes.",
                "No data is shared with third parties.",
                "Data is not stored beyond necessary use.",
                "All data is protected and handled responsibly.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#555] mt-1 flex-shrink-0 text-xs">
                    ◆
                  </span>
                  <span className="text-[#aaa] text-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Divider */}
          <div className="border-t border-[#2a2a2a]" />

          {/* Admin Rules */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-[#ff4444] flex-shrink-0" />
              <h2 className="text-sm font-semibold text-[#ff6666] uppercase tracking-wider">
                Admin Rules
              </h2>
            </div>
            <ul className="space-y-2">
              {[
                "No adult / 18+ content",
                "No scams, fraud, or fake links",
                "No spam or flooding",
                "No abusive or toxic behavior",
                "No promotion without permission",
                "No fake giveaways",
                "No leaking private or sensitive data",
                "No misuse of admin privileges",
              ].map((rule) => (
                <li key={rule} className="flex items-start gap-2">
                  <span className="text-[#ff4444] mt-0.5 flex-shrink-0 text-xs">
                    ✕
                  </span>
                  <span className="text-[#ccc] text-sm">{rule}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Divider */}
          <div className="border-t border-[#2a2a2a]" />

          {/* Strict Warning */}
          <section>
            <div className="rounded-lg border border-[#ff4444]/30 bg-[#ff4444]/5 p-4">
              <p className="text-sm font-bold text-[#ff6666] text-center leading-relaxed">
                ⚠️ Breaking any rule = instant ban.
                <br />
                No warning system.
                <br />
                <span className="text-[#ff4444]">
                  Direct action will be taken.
                </span>
              </p>
            </div>
          </section>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center py-2">
          <ChevronDown className="w-4 h-4 text-[#444] animate-bounce" />
        </div>
      </section>

      {/* Checkbox */}
      <label
        className="flex items-start gap-3 cursor-pointer group mb-5"
        data-ocid="agreement.checkbox"
      >
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            className="sr-only"
            aria-label="I agree to the Privacy Policy & Admin Rules"
          />
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
              agreed
                ? "bg-white border-white"
                : "bg-transparent border-[#555] group-hover:border-[#888]"
            }`}
          >
            {agreed && (
              <svg
                aria-hidden="true"
                className="w-3 h-3 text-black"
                fill="none"
                viewBox="0 0 12 12"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <title>Checked</title>
                <polyline points="1.5,6 4.5,9 10.5,3" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-sm text-[#ccc] leading-relaxed group-hover:text-white transition-colors duration-200">
          I agree to the Privacy Policy & Admin Rules
        </span>
      </label>

      {/* Error */}
      {error && (
        <div
          className="flex items-center gap-2 mb-4 text-[#ff4444] text-sm"
          role="alert"
          data-ocid="agreement.error_state"
        >
          <span className="flex-shrink-0">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Continue button */}
      <button
        type="button"
        onClick={handleContinue}
        disabled={!agreed}
        className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-white text-black hover:bg-[#e5e5e5] active:scale-[0.98]"
        data-ocid="agreement.primary_button"
      >
        Continue
      </button>
    </div>
  );
}
