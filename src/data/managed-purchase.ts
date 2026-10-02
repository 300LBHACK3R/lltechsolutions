/** Versioned customer consent and field limits shared by checkout and validation. */
export const managedTermsVersion = "2026-10-02";

export const managedFieldLimits = {
  name: 100,
  email: 254,
  phone: 40,
  businessName: 120,
  location: 160,
  website: 300,
  services: 500,
  message: 1500,
} as const;
