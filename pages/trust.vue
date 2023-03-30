<script setup lang="ts">
const config = useRuntimeConfig()

const brand = config.brand
const title = `${brand} | Trust`
const description = 'Move forward with confidence. Capgo offer multiple levels of protection to keep your intellectual property and sensitive data secure.'
useHead({
  title,
  meta: [
    { name: 'title', hid: 'title', content: title },
    { name: 'og:title', hid: 'og:title', content: title },
    { name: 'description', hid: 'description', content: description },
    { name: 'og:description', hid: 'og:description', content: description },
    { name: 'description', hid: 'description', content: 'Privacy Policy' },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
})
</script>

<template>
  <div class="prose prose-sm m-auto text-left px-3">
    <h2 id="capgo-security-">
      Capgo Security.
    </h2>
    <p>Move forward with confidence. We offer multiple levels of protection to keep your intellectual property and sensitive data secure.</p>
    <h2 id="product-security">
      Product security
    </h2>
    <h3 id="source-code-protection">
      Source code protection
    </h3>
    <ul>
      <li>Source code is continuously scanned for vulnerabilities using Sink Inspector.</li>
    </ul>
    <h2 id="data-security">
      Data security
    </h2>
    <h3 id="encryption-communication">
      Encryption communication
    </h3>
    <ul>
      <li>All data traffic is encrypted via TLS and HTTPS.</li>
    </ul>
    <h3 id="source-code-encryption">
      Source code encryption
    </h3>
    <ul>
      <li>Source code is always encrypted in transit via TLS and HTTPS.</li>
    </ul>
    <h3 id="data-backup">
      Data backup
    </h3>
    <ul>
      <li>Capgo maintains a data backup policy that follows industry best practices.</li>
    </ul>
    <h2 id="network-security">
      Network security
    </h2>
    <h3 id="architecture">
      Architecture
    </h3>
    <ul>
      <li>Capgo’s architecture consists of multiple secure network layers.</li>
    </ul>
    <h2 id="application-security">
      Application security
    </h2>
    <h3 id="secure-coding">
      Secure coding
    </h3>
    <ul>
      <li>Any changes that make their way into production must first be reviewed and approved. Code refactoring must adhere to secure coding principles and industry best practices, such as those defined by OWASP.</li>
    </ul>
    <h3 id="site-reliability">
      Site reliability
    </h3>
    <ul>
      <li>Capgo use 100% serverless infrastructure, historically achieving 99.9% uptime. See <a href="https://status.capgo.app/en/">status here</a></li>
    </ul>
    <h3 id="application-penetration-testing">
      Application penetration testing
    </h3>
    <ul>
      <li>Capgo is regularly tested by third-party penetration testers to ensure the security of the application.</li>
    </ul>
    <h2 id="business-security">
      Business security
    </h2>
    <h3 id="background-checks">
      Background checks
    </h3>
    <ul>
      <li>Capgo don&#39;t have employees and will never, only one person, Martin Donadieu has access to production database. Freelancer  or open-source contributors are not allowed to have access to production database.</li>
    </ul>
    <h3 id="security-awareness">
      Security awareness
    </h3>
    <ul>
      <li>Capgo Founder take security awareness, best practice, and incident response training.</li>
    </ul>
    <h3 id="security-coding-education">
      Security coding education
    </h3>
    <ul>
      <li>Capgo by been 100% open-source, is leaded to improve security with the community.</li>
    </ul>
    <h3 id="partner-management">
      Partner management
    </h3>
    <ul>
      <li>
        Capgo requires all critical third-party vendors to achieve SOC 2 certification at the minimum, and verifies certifications annually.<ul>
          <li><a href="https://www.netlify.com/security/">Netlify SOC 2</a></li>
          <li><a href="https://supabase.com/security">Supabase SOC 2</a></li>
        </ul>
      </li>
    </ul>
    <h3 id="incident-response">
      Incident response
    </h3>
    <ul>
      <li>Capgo stands at the ready with a dedicated Incident Response Person.</li>
    </ul>
    <h3 id="incident-response-policy-plan">
      Incident response policy &amp; plan
    </h3>
    <ul>
      <li>An incident response policy is maintained and managed by a dedicated incident response Person at Capgo.</li>
    </ul>
    <h3 id="communication">
      Communication
    </h3>
    <ul>
      <li>In the event of system-wide issues, customers are notified by their email. Capgo&#39;s system status and network and security incidents are published at <a href="https://status.capgo.app/">https://status.capgo.app</a>.</li>
    </ul>
  </div>
</template>
