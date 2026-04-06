import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import { useState } from "react";
import { useActor } from "../../hooks/useActor";

interface VerificationScreenProps {
  onSuccess: () => void;
}

export function VerificationScreen({ onSuccess }: VerificationScreenProps) {
  const { actor } = useActor();
  const [username, setUsername] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [keyError, setKeyError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateUsername(value: string): string {
    if (!value.trim()) return "Username required";
    if (!value.startsWith("@")) return "Invalid username format";
    return "";
  }

  function validateAdminKey(value: string): string {
    if (!value.trim()) return "Admin key required";
    return "";
  }

  function handleUsernameChange(value: string) {
    setUsername(value);
    setUsernameError(validateUsername(value));
    setGeneralError("");
  }

  function handleKeyChange(value: string) {
    setAdminKey(value);
    setKeyError(validateAdminKey(value));
    setGeneralError("");
  }

  const isFormValid =
    !validateUsername(username) && !validateAdminKey(adminKey);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const uErr = validateUsername(username);
    const kErr = validateAdminKey(adminKey);
    setUsernameError(uErr);
    setKeyError(kErr);

    if (uErr || kErr) return;

    setIsSubmitting(true);
    setGeneralError("");

    try {
      if (!actor) {
        throw new Error("Connection error. Please try again.");
      }

      const result = await actor.submitVerification(username, adminKey);

      if ("ok" in result) {
        onSuccess();
      } else if ("err" in result) {
        setGeneralError(result.err || "Verification failed. Please try again.");
      }
    } catch (err) {
      setGeneralError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="screen-enter">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-4">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-[0.2em] text-white uppercase">
          Admin Verification
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Enter your credentials to proceed
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Telegram Username */}
        <div className="space-y-2" data-ocid="verification.panel">
          <label
            htmlFor="telegram-username"
            className="block text-xs font-semibold uppercase tracking-widest text-[#888]"
          >
            Telegram Username
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <User className="w-4 h-4 text-[#555]" />
            </div>
            <input
              id="telegram-username"
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              placeholder="@username"
              autoComplete="off"
              spellCheck={false}
              className={`admin-input w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#1a1a1a] border text-white placeholder-[#555] text-sm transition-all duration-200 focus:outline-none focus:bg-[#1f1f1f] ${
                usernameError
                  ? "border-[#ff4444]/70 focus:border-[#ff4444]"
                  : "border-[#333] focus:border-white"
              }`}
              aria-describedby={usernameError ? "username-error" : undefined}
              data-ocid="verification.input"
            />
          </div>
          {usernameError && (
            <p
              id="username-error"
              className="text-xs text-[#ff4444] flex items-center gap-1.5"
              role="alert"
              data-ocid="verification.error_state"
            >
              <span>⚠</span> {usernameError}
            </p>
          )}
        </div>

        {/* Admin Key */}
        <div className="space-y-2">
          <label
            htmlFor="admin-key"
            className="block text-xs font-semibold uppercase tracking-widest text-[#888]"
          >
            Admin Key
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Lock className="w-4 h-4 text-[#555]" />
            </div>
            <input
              id="admin-key"
              type={showKey ? "text" : "password"}
              value={adminKey}
              onChange={(e) => handleKeyChange(e.target.value)}
              placeholder="Enter admin key"
              autoComplete="current-password"
              className={`admin-input w-full pl-11 pr-12 py-3.5 rounded-xl bg-[#1a1a1a] border text-white placeholder-[#555] text-sm transition-all duration-200 focus:outline-none focus:bg-[#1f1f1f] ${
                keyError
                  ? "border-[#ff4444]/70 focus:border-[#ff4444]"
                  : "border-[#333] focus:border-white"
              }`}
              aria-describedby={keyError ? "key-error" : undefined}
              data-ocid="verification.input"
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#999] transition-colors duration-200"
              aria-label={showKey ? "Hide admin key" : "Show admin key"}
            >
              {showKey ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {keyError && (
            <p
              id="key-error"
              className="text-xs text-[#ff4444] flex items-center gap-1.5"
              role="alert"
              data-ocid="verification.error_state"
            >
              <span>⚠</span> {keyError}
            </p>
          )}
        </div>

        {/* General error */}
        {generalError && (
          <div
            className="flex items-center gap-2 rounded-xl border border-[#ff4444]/30 bg-[#ff4444]/5 px-4 py-3 text-sm text-[#ff6666]"
            role="alert"
            data-ocid="verification.error_state"
          >
            <span className="flex-shrink-0">⚠</span>
            <span>{generalError}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-white text-black hover:bg-[#e5e5e5] active:scale-[0.98] flex items-center justify-center gap-2"
          data-ocid="verification.submit_button"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 spinner" />
              <span>Verifying...</span>
            </>
          ) : (
            "Verify Access"
          )}
        </button>
      </form>
    </div>
  );
}
