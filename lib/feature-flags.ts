function flag(envVar: string): boolean {
  return process.env[envVar]?.trim() === "true";
}

export const FEATURES = {
  zeps: flag("FEATURE_ZEPS"),
  compliance: flag("FEATURE_COMPLIANCE"),
  insurance: flag("FEATURE_INSURANCE"),
  locations: flag("FEATURE_LOCATIONS"),
  partsCatalog: flag("FEATURE_PARTS_CATALOG"),
} as const;

export type FeatureKey = keyof typeof FEATURES;
