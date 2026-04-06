export function SuccessScreen() {
  return (
    <div className="screen-enter text-center py-4">
      {/* Animated checkmark */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-white/10 bg-white/5 flex items-center justify-center success-icon">
            <svg
              aria-label="Access granted checkmark"
              className="w-10 h-10"
              viewBox="0 0 48 48"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
            >
              <title>Access granted</title>
              <circle cx="24" cy="24" r="20" className="opacity-20" />
              <polyline
                points="12,24 20,32 36,16"
                strokeDasharray="100"
                strokeDashoffset="0"
                style={{
                  animation:
                    "checkmarkDraw 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
                }}
              />
            </svg>
          </div>
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
        </div>
      </div>

      {/* Text */}
      <h1 className="text-2xl font-bold tracking-[0.2em] text-white uppercase mb-3">
        Access Granted
      </h1>
      <p className="text-[#aaa] text-sm leading-relaxed mb-6 max-w-xs mx-auto">
        Your admin verification was successful. You will be notified shortly.
      </p>

      {/* Status badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-[#888] mb-4">
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#00cc66]"
          style={{ animation: "successPulse 2s ease-in-out infinite" }}
        />
        Verification complete
      </div>

      {/* Note */}
      <p className="text-xs text-[#555] mt-2" data-ocid="success.panel">
        This window can now be closed.
      </p>
    </div>
  );
}
