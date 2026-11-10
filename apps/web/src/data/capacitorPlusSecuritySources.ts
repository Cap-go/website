export type CapacitorPlusSecurityAuditFinding = {
  severity: string
  title: string
  sourceHref: string
}

/** Documented CLI audit findings in Capacitor+ (status of fixes varies; see repo). */
export const capacitorPlusCliAuditFindings: CapacitorPlusSecurityAuditFinding[] = [
  {
    severity: 'HIGH',
    title: 'Arbitrary command execution via hook scripts',
    sourceHref: 'https://github.com/Cap-go/capacitor-plus/blob/plus/SECURITY_AUDIT_CLI.md#finding-1-arbitrary-command-execution-via-hook-scripts-high',
  },
  {
    severity: 'HIGH',
    title: 'Path traversal in Cordova plugin asset copying',
    sourceHref: 'https://github.com/Cap-go/capacitor-plus/blob/plus/SECURITY_AUDIT_CLI.md#finding-2-path-traversal-in-cordova-plugin-asset-copying-high',
  },
  {
    severity: 'MEDIUM',
    title: 'XML injection in generated config files',
    sourceHref: 'https://github.com/Cap-go/capacitor-plus/blob/plus/SECURITY_AUDIT_CLI.md#finding-3-xml-injection-in-generated-config-files-medium',
  },
  {
    severity: 'MEDIUM',
    title: 'Unvalidated platform path configuration enables arbitrary directory operations',
    sourceHref:
      'https://github.com/Cap-go/capacitor-plus/blob/plus/SECURITY_AUDIT_CLI.md#finding-4-unvalidated-platform-path-configuration-enables-arbitrary-directory-operations-medium',
  },
  {
    severity: 'MEDIUM',
    title: 'Symlink following in web asset copy',
    sourceHref: 'https://github.com/Cap-go/capacitor-plus/blob/plus/SECURITY_AUDIT_CLI.md#finding-5-symlink-following-in-web-asset-copy-medium',
  },
  {
    severity: 'LOW-MEDIUM',
    title: 'Gradle flavor injection in build arguments',
    sourceHref: 'https://github.com/Cap-go/capacitor-plus/blob/plus/SECURITY_AUDIT_CLI.md#finding-6-gradle-flavor-injection-in-build-arguments-low-medium',
  },
]

export const capacitorPlusResourceLinks = {
  repo: 'https://github.com/Cap-go/capacitor-plus/',
  readme: 'https://github.com/Cap-go/capacitor-plus/blob/plus/README.md',
  securityAudit: 'https://github.com/Cap-go/capacitor-plus/blob/plus/SECURITY_AUDIT_CLI.md',
  gettingStarted: '/docs/plugins/capacitor-plus/getting-started/',
  bugBounty: '/bug-bounty/',
  securityPolicy: '/security/',
  capgoAdvisories: 'https://github.com/Cap-go/capgo/security/advisories',
} as const
