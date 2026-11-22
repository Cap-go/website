/**
 * Storage is billed in GB-hours: each bundle counts its size for every hour it stays stored.
 * A plan with N GiB of storage includes N x the hours in the billing cycle; the site shows a 30-day month.
 */
export const STORAGE_HOURS_PER_MONTH = 30 * 24

export function storageGbHoursPerMonth(storageGiB: number): number {
  return storageGiB * STORAGE_HOURS_PER_MONTH
}
