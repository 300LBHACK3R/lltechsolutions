export const servicePathways = [
  {
    id: "rental",
    title: "Trailer rental",
    heading: "Rent it. Tow it yourself.",
    description:
      "Choose an enclosed, dump or flatdeck / dovetail trailer. You collect it, tow it and return it as arranged.",
    steps: [
      "Choose your trailer and dates",
      "Confirm your towing setup",
      "Collect, use and return",
    ],
    action: "Request a rental",
  },
  {
    id: "delivery",
    title: "Trailer delivery & collection",
    heading: "Have the trailer delivered.",
    description:
      "Trail & Co brings the empty rental trailer to your location. You load and use it; we collect it later as arranged.",
    steps: [
      "Tell us where you need it",
      "You load and use the trailer",
      "Arrange collection with Trail & Co",
    ],
    action: "Request trailer delivery",
  },
  {
    id: "transport",
    title: "Pickup, transport & delivery",
    heading: "You load it. We haul it.",
    description:
      "You prepare and load your cargo. Trail & Co transports the loaded trailer from your pickup point to the agreed destination.",
    steps: [
      "Share your load and route",
      "You prepare and load the cargo",
      "Trail & Co handles the transport",
    ],
    action: "Request load transport",
  },
] as const;

export type ServiceType = (typeof servicePathways)[number]["id"];

export function parseServiceType(value: unknown): ServiceType | "" {
  return servicePathways.find((service) => service.id === value)?.id ?? "";
}

export function getServiceLabel(value: unknown): string {
  return servicePathways.find((service) => service.id === value)?.title ?? "";
}

export function serviceInquiryHref(service: ServiceType, trailer?: string): string {
  const params = new URLSearchParams({ service });
  if (trailer) params.set("trailer", trailer);
  return `/contact?${params.toString()}#inquiry`;
}

export const serviceAvailabilityNote =
  "Delivery, collection and transport depend on load, weight, location, access, schedule and destination. Confirm the arrangements and quote with Trail & Co before booking. Loading labour is not included.";
