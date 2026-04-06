import Time "mo:core/Time";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Outcall "http-outcalls/outcall";

actor {

  // ── Types ──────────────────────────────────────────────────────────────────

  type Submission = {
    username  : Text;
    timestamp : Int;
  };

  // ── State ──────────────────────────────────────────────────────────────────

  var submissions : [Submission] = [];

  // The admin key is validated server-side only.
  transient let ADMIN_KEY : Text = "Admin989989";

  // ── HTTP transform (required for outcalls) ─────────────────────────────────

  public query func transform(input : Outcall.TransformationInput) : async Outcall.TransformationOutput {
    Outcall.transform(input);
  };

  // ── Public API ─────────────────────────────────────────────────────────────

  /// Validate credentials, store the submission, and send a notification email.
  public func submitVerification(username : Text, adminKey : Text) : async { #ok : Text; #err : Text } {
    if (username.trimStart(#char ' ') == "") {
      return #err("Username is required.");
    };
    if (adminKey != ADMIN_KEY) {
      return #err("Invalid admin key.");
    };

    let entry : Submission = {
      username  = username;
      timestamp = Time.now();
    };
    submissions := submissions.concat([entry]);

    // Fire-and-forget email notification.
    ignore _sendEmail(username, entry.timestamp);

    #ok("Verification successful.");
  };

  /// Return all stored submissions.
  public query func getSubmissions() : async [Submission] {
    submissions;
  };

  // ── Private helpers ────────────────────────────────────────────────────────

  func _sendEmail(username : Text, ts : Int) : async () {
    let subject = "Admin Verification Alert";
    let body =
      "A new admin verification was completed.\n\n" #
      "Telegram Username: " # username # "\n" #
      "Timestamp (ns): " # ts.toText() # "\n\n" #
      "This is an automated notification from your Admin Verification Portal.";

    let payload =
      "{" #
        "\"to\": \"rahilshafi90k@gmail.com\"," #
        "\"subject\": \"" # subject # "\"," #
        "\"body\": \"" # body # "\"" #
      "}";

    try {
      ignore await Outcall.httpPostRequest(
        "https://api.caffeine.ai/v1/email/send",
        [{ name = "Content-Type"; value = "application/json" }],
        payload,
        transform,
      );
    } catch _ {};
  };
};
