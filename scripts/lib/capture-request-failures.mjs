// Chromium can cancel a HEAD transfer after the successful headers arrive.
// A HEAD response has no body. This exception requires that actual response;
// it never excuses missing resources, failed GETs, or an unconfirmed request.
export function isCompletedHeadTransfer({ method, resourceType, errorText, status }) {
  return (
    method === "HEAD" &&
    resourceType === "fetch" &&
    errorText === "net::ERR_ABORTED" &&
    Number.isInteger(status) &&
    status >= 200 &&
    status < 300
  );
}
