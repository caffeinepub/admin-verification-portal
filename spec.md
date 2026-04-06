# Admin Verification Portal

## Current State
The backend has `submitVerification` which validates the admin key and stores submissions on-chain. It has a placeholder `_sendEmail` function that calls EmailJS with hardcoded placeholder IDs -- no real email is sent.

## Requested Changes (Diff)

### Add
- Real email notification on successful verification using Caffeine's built-in email HTTP outcall to send all verification details (Telegram username, timestamp) to rahilshafi90k@gmail.com.

### Modify
- Replace the EmailJS placeholder `_sendEmail` in `main.mo` with a call to Caffeine's email service endpoint, sending a formatted message with the submitted username and timestamp.

### Remove
- EmailJS API call and placeholder credentials from the backend.

## Implementation Plan
1. Update `src/backend/main.mo`: replace the `_sendEmail` function to call Caffeine's email HTTP outcall with the verified submission details (Telegram username, timestamp) to rahilshafi90k@gmail.com.
