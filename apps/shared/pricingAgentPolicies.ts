/** Plain-text billing policies aligned with the public pricing page FAQ. English source for agents. */
export const PRICING_AGENT_POLICY_MARKDOWN = `## Billing and limits

### Monthly active users (MAU)

We'll send you email notifications when you reach 50%, 70%, 90%, and 100% of your MAU limit. Once you hit the limit, your updates will be blocked until the end of your billing cycle. To continue serving updates, you can upgrade to a higher plan or purchase credits to cover the additional usage.

### Bandwidth and storage

At bandwidth or storage limits, Capgo emails you at 50%, 70%, 90%, and 100%. Update downloads or new bundle uploads pause until the billing cycle resets, you upgrade, or you purchase credits. Apps keep running their current version.

### Storage billing

Storage is billed in GB-hours (GBh, 1 GiB stored for 1 hour): each bundle counts its size for every hour it stays stored. A plan includes its storage in GiB times the hours in the billing cycle (20 GiB is 14,400 GBh in a 30-day cycle). Deleting a bundle stops its billing from that moment; the hours it was already stored stay billed, so deleting bundles after reaching the storage limit does not lift it before the cycle ends. Storage overage is priced per GiB-month, which is 720 GBh in a 30-day cycle.

### Plan changes

You can upgrade or downgrade your plan at any time. Upgrades take effect immediately. Downgrades apply at the end of your current billing cycle so you keep the limits you already paid for.

### Refunds

Except when required by law, paid subscription fees are non-refundable. Certain refund requests may be considered on a case-by-case basis at Capgo's sole discretion. Contact support if you believe you qualify.

### Encryption

Bundles are checksum-verified. End-to-end encryption with your own key is available per app. Encrypted bundle contents are not readable by Capgo without your key material.
`
