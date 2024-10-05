<script setup lang="ts">
import { useRuntimeConfig } from '@/config/app'
import { type Locales } from '@/services/locale'
import translations from '@/services/translations'

const props = defineProps<{
  locale: Locales
}>()
const config = useRuntimeConfig()
const domain = config.public.baseUrl
const brand = config.public.brand
// const title = `${brand} | Data Policy`
// const description = 'Read our Data Policy'
// useHead({
//   title,
//   meta: [
//     { name: 'title', hid: 'title', content: title },
//     { name: 'og:title', hid: 'og:title', content: title },
//     { name: 'description', hid: 'description', content: description },
//     { name: 'og:description', hid: 'og:description', content: description },
//     { name: 'description', hid: 'description', content: 'Data Policy' },
//     { name: 'robots', content: 'noindex, nofollow' },
//   ],
// })
</script>

<template>
  <div class="prose prose-sm m-auto px-3 text-left">
    <h1>Data Policy</h1>
    <p>Last updated: September 21, 2023</p>
    <p>
      A data policy contains a set of rules, principles, and guidelines that provide a framework for different areas of data management throughout the enterprise, including but not
      limited to data governance, data quality, and data architecture.
    </p>
    <h2>What we collect and what we use it for</h2>
    <p>
      We do not track people across their devices and across websites and apps that they visit. All the data is isolated to a single day, single website and single device only.
      There is no way to know whether the same person visits a site from more than one device or visits another website
    </p>
    <p>
      The goal of Capgo is to track overall trends in your website traffic, it is not to track individual visitors. We don’t use cookies, we don’t generate any persistent
      identifiers and we don’t collect or store any personal or identifiable data. All of the data is aggregated data only and it has no personal information.
    </p>
    <p>
      By using Capgo, all the site measurement is carried out absolutely anonymously. We measure only the most essential data points and nothing else. All the metrics we do collect
      fit on one single page.
    </p>
    <h2>How we count unique users without cookies</h2>
    <p>
      Counting unique visitors is an integral part of web analytics. Capgo attempts to strike a reasonable balance between de-duplicating pageviews and staying respectful of
      visitor privacy.
    </p>
    <p>
      We do not attempt to generate a device-persistent identifier because they are considered personal data under GDPR. We do not use cookies, browser cache nor the local storage.
      We do not store, retrieve nor extract anything from visitor’s devices.
    </p>
    <p>
      Every single HTTP request sends the IP address and the User-Agent to the server so that’s what we use. We generate a daily changing identifier using the visitor’s IP address
      and User-Agent.
    </p>
    <p>
      In our testing, using IP addresses to count visitors is remarkably accurate when compared to using a cookie. In some cases it might even be more accurate than using a cookie
      because some visitors block cookies altogether.
    </p>
    <p>
      We’re happy to provide information on how Capgo is built to help you comply with the different privacy regulations. We encourage you to discuss specific issues with your
      lawyer to help you decide whether our service allows you to fulfill the legal requirements that apply to you.
    </p>
    <h2>Data ownership of your web</h2>
    <p>
      When you use our service,Capgo will collect information about your visitors. You entrust us with your site data and we take that trust to heart. The privacy of your site data
      — and it is your data, not ours! — is a big deal to us.
    </p>
    <p>
      By using Capgo, you keep 100% ownership of your website data. Although when using our hosted service, your site analytics are stored on our server in the cloud, you remain
      completely in control of your site data and you fully own all of your data too.
    </p>
    <p>
      You own all right, title, and interest to your website data. We obtain no rights from you to your website data. We will never sell or share your site data to any
      third-parties.
    </p>
    <ul>
      <li>Your website data is not shared with advertising companies or any other companies in general.</li>
      <li>Your website data is not sent to any third-parties at all.</li>
      <li>Your website data is not mined and harvested for personal and behavioral trends.</li>
      <li>Your website data is not monetized.</li>
      <p>You can choose to delete your account and delete your site stats at any time. We provide simple no-questions-asked deletion links.</p>
      <p>
        All your stats will be permanently deleted immediately when you delete your Capgo account or when you delete your site stats. We cannot recover this information once it has
        been permanently deleted.
      </p>
      <h2>Why should I trust you?</h2>
      <p>
        <a :href="`${domain}/`" rel="external nofollow noopener" target="_blank">Capgo</a> is 100% open source . Our source code is available and accessible on GitHub so you can
        read it and review it to ensure our code does what we say.
      </p>
      <p>We are not a black box. Everything is in the open. Anyone can view, review and inspect the code we’re running to verify that we practice what we preach.</p>
      <p>
        This is essential in the market of privacy software. Corporations and proprietary software cannot always be trusted when data is in question. The only way to prove your
        trust is to allow experts to look into your code and verify that you’re actually doing what you’re saying you’re doing.
      </p>
    </ul>
    <h2>GDPR Privacy</h2>
    <h3>Legal Basis for Processing Personal Data under GDPR</h3>
    <p>We may process Personal Data under the following conditions:</p>
    <ul>
      <li><strong>Consent:</strong> You have given Your consent for processing Personal Data for one or more specific purposes.</li>
      <li>
        <strong>Performance of a contract:</strong> Provision of Personal Data is necessary for the performance of an agreement with You and/or for any pre-contractual obligations
        thereof.
      </li>
      <li><strong>Legal obligations:</strong> Processing Personal Data is necessary for compliance with a legal obligation to which the Company is subject.</li>
      <li><strong>Vital interests:</strong> Processing Personal Data is necessary in order to protect Your vital interests or of another natural person.</li>
      <li>
        <strong>Public interests:</strong> Processing Personal Data is related to a task that is carried out in the public interest or in the exercise of official authority vested
        in the Company.
      </li>
      <li><strong>Legitimate interests:</strong> Processing Personal Data is necessary for the purposes of the legitimate interests pursued by the Company.</li>
    </ul>
    <p>
      In any case, the Company will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a
      statutory or contractual requirement, or a requirement necessary to enter into a contract.
    </p>
    <h3>Your Rights under the GDPR</h3>
    <p>The Company undertakes to respect the confidentiality of Your Personal Data and to guarantee You can exercise Your rights.</p>
    <p>You have the right under this Privacy Policy, and by law if You are within the EU, to:</p>
    <ul>
      <li>
        <strong>Request access to Your Personal Data.</strong> The right to access, update or delete the information We have on You. Whenever made possible, you can access, update
        or request deletion of Your Personal Data directly within Your account settings section. If you are unable to perform these actions yourself, please contact Us to assist
        You. This also enables You to receive a copy of the Personal Data We hold about You.
      </li>
      <li>
        <strong>Request correction of the Personal Data that We hold about You.</strong> You have the right to have any incomplete or inaccurate information We hold about You
        corrected.
      </li>
      <li>
        <strong>Object to processing of Your Personal Data.</strong> This right exists where We are relying on a legitimate interest as the legal basis for Our processing and there
        is something about Your particular situation, which makes You want to object to our processing of Your Personal Data on this ground. You also have the right to object where
        We are processing Your Personal Data for direct marketing purposes.
      </li>
      <li>
        <strong>Request erasure of Your Personal Data.</strong> You have the right to ask Us to delete or remove Personal Data when there is no good reason for Us to continue
        processing it.
      </li>
      <li>
        <strong>Request the transfer of Your Personal Data.</strong> We will provide to You, or to a third-party You have chosen, Your Personal Data in a structured, commonly used,
        machine-readable format. Please note that this right only applies to automated information which You initially provided consent for Us to use or where We used the
        information to perform a contract with You.
      </li>
      <li>
        <strong>Withdraw Your consent.</strong> You have the right to withdraw Your consent on using your Personal Data. If You withdraw Your consent, We may not be able to provide
        You with access to certain specific functionalities of the Service.
      </li>
    </ul>
    <h3>Exercising of Your GDPR Data Protection Rights</h3>
    <p>
      You may exercise Your rights of access, rectification, cancellation and opposition by contacting Us. Please note that we may ask You to verify Your identity before responding
      to such requests. If You make a request, We will try our best to respond to You as soon as possible.
    </p>
    <p>
      You have the right to complain to a Data Protection Authority about Our collection and use of Your Personal Data. For more information, if You are in the European Economic
      Area (EEA), please contact Your local data protection authority in the EEA.
    </p>
    <h2>CCPA Privacy</h2>
    <p>
      This privacy notice section for California residents supplements the information contained in Our Privacy Policy and it applies solely to all visitors, users, and others who
      reside in the State of California.
    </p>
    <h3>Categories of Personal Information Collected</h3>
    <p>
      We collect information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a
      particular Consumer or Device. The following is a list of categories of personal information which we may collect or may have been collected from California residents within
      the last twelve (12) months.
    </p>
    <p>
      Please note that the categories and examples provided in the list below are those defined in the CCPA. This does not mean that all examples of that category of personal
      information were in fact collected by Us, but reflects our good faith belief to the best of our knowledge that some of that information from the applicable category may be
      and may have been collected. For example, certain categories of personal information would only be collected if You provided such personal information directly to Us.
    </p>
    <ul>
      <li>
        <p><strong>Category A: Identifiers.</strong></p>
        <p>
          Examples: A real name, alias, postal address, unique personal identifier, online identifier, Internet Protocol address, email address, account name, driver's license
          number, passport number, or other similar identifiers.
        </p>
        <p>Collected: Yes.</p>
      </li>
      <li>
        <p><strong>Category B: Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e)).</strong></p>
        <p>
          Examples: A name, signature, Social Security number, physical characteristics or description, address, telephone number, passport number, driver's license or state
          identification card number, insurance policy number, education, employment, employment history, bank account number, credit card number, debit card number, or any other
          financial information, medical information, or health insurance information. Some personal information included in this category may overlap with other categories.
        </p>
        <p>Collected: Yes.</p>
      </li>
      <li>
        <p><strong>Category C: Protected classification characteristics under California or federal law.</strong></p>
        <p>
          Examples: Age (40 years or older), race, color, ancestry, national origin, citizenship, religion or creed, marital status, medical condition, physical or mental
          disability, sex (including gender, gender identity, gender expression, pregnancy or childbirth and related medical conditions), sexual orientation, veteran or military
          status, genetic information (including familial genetic information).
        </p>
        <p>Collected: No.</p>
      </li>
      <li>
        <p><strong>Category D: Commercial information.</strong></p>
        <p>Examples: Records and history of products or services purchased or considered.</p>
        <p>Collected: Yes.</p>
      </li>
      <li>
        <p><strong>Category E: Biometric information.</strong></p>
        <p>
          Examples: Genetic, physiological, behavioral, and biological characteristics, or activity patterns used to extract a template or other identifier or identifying
          information, such as, fingerprints, faceprints, and voiceprints, iris or retina scans, keystroke, gait, or other physical patterns, and sleep, health, or exercise data.
        </p>
        <p>Collected: No.</p>
      </li>
      <li>
        <p><strong>Category F: Internet or other similar network activity.</strong></p>
        <p>Examples: Interaction with our Service or advertisement.</p>
        <p>Collected: Yes.</p>
      </li>
      <li>
        <p><strong>Category G: Geolocation data.</strong></p>
        <p>Examples: Approximate physical location.</p>
        <p>Collected: No.</p>
      </li>
      <li>
        <p><strong>Category H: Sensory data.</strong></p>
        <p>Examples: Audio, electronic, visual, thermal, olfactory, or similar information.</p>
        <p>Collected: No.</p>
      </li>
      <li>
        <p><strong>Category I: Professional or employment-related information.</strong></p>
        <p>Examples: Current or past job history or performance evaluations.</p>
        <p>Collected: No.</p>
      </li>
      <li>
        <p><strong>Category J: Non-public education information (per the Family Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R. Part 99)).</strong></p>
        <p>
          Examples: Education records directly related to a student maintained by an educational institution or party acting on its behalf, such as grades, transcripts, class
          lists, student schedules, student identification codes, student financial information, or student disciplinary records.
        </p>
        <p>Collected: No.</p>
      </li>
      <li>
        <p><strong>Category K: Inferences drawn from other personal information.</strong></p>
        <p>
          Examples: Profile reflecting a person's preferences, characteristics, psychological trends, predispositions, behavior, attitudes, intelligence, abilities, and aptitudes.
        </p>
        <p>Collected: No.</p>
      </li>
    </ul>
    <p>Under CCPA, personal information does not include:</p>
    <ul>
      <li>Publicly available information from government records</li>
      <li>Deidentified or aggregated consumer information</li>
      <li>
        Information excluded from the CCPA's scope, such as:
        <ul>
          <li>
            Health or medical information covered by the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and the California Confidentiality of Medical
            Information Act (CMIA) or clinical trial data
          </li>
          <li>
            Personal Information covered by certain sector-specific privacy laws, including the Fair Credit Reporting Act (FRCA), the Gramm-Leach-Bliley Act (GLBA) or California
            Financial Information Privacy Act (FIPA), and the Driver's Privacy Protection Act of 1994
          </li>
        </ul>
      </li>
    </ul>
    <h3>Sources of Personal Information</h3>
    <p>We obtain the categories of personal information listed above from the following categories of sources:</p>
    <ul>
      <li>
        <strong>Directly from You</strong>. For example, from the forms You complete on our Service, preferences You express or provide through our Service, or from Your purchases
        on our Service.
      </li>
      <li><strong>Indirectly from You</strong>. For example, from observing Your activity on our Service.</li>
      <li><strong>Automatically from You</strong>. For example, through cookies We or our Service Providers set on Your Device as You navigate through our Service.</li>
      <li>
        <strong>From Service Providers</strong>. For example, third-party vendors for payment processing, or other third-party vendors that We use to provide the Service to You.
      </li>
    </ul>
    <h3>Use of Personal Information for Business Purposes or Commercial Purposes</h3>
    <p>
      We may use or disclose personal information We collect for &quot;business purposes&quot; or &quot;commercial purposes&quot; (as defined under the CCPA), which may include the
      following examples:
    </p>
    <ul>
      <li>To operate our Service and provide You with our Service.</li>
      <li>To provide You with support and to respond to Your inquiries, including to investigate and address Your concerns and monitor and improve our Service.</li>
      <li>
        To fulfill or meet the reason You provided the information. For example, if You share Your contact information to ask a question about our Service, We will use that
        personal information to respond to Your inquiry. If You provide Your personal information to purchase a product or service, We will use that information to process Your
        payment and facilitate delivery.
      </li>
      <li>To respond to law enforcement requests and as required by applicable law, court order, or governmental regulations.</li>
      <li>As described to You when collecting Your personal information or as otherwise set forth in the CCPA.</li>
      <li>For internal administrative and auditing purposes.</li>
      <li>
        To detect security incidents and protect against malicious, deceptive, fraudulent or illegal activity, including, when necessary, to prosecute those responsible for such
        activities.
      </li>
    </ul>
    <p>
      Please note that the examples provided above are illustrative and not intended to be exhaustive. For more details on how we use this information, please refer to the
      &quot;Use of Your Personal Data&quot; section.
    </p>
    <p>
      If We decide to collect additional categories of personal information or use the personal information We collected for materially different, unrelated, or incompatible
      purposes We will update this Privacy Policy.
    </p>
    <h3>Disclosure of Personal Information for Business Purposes or Commercial Purposes</h3>
    <p>
      We may use or disclose and may have used or disclosed in the last twelve (12) months the following categories of personal information for business or commercial purposes:
    </p>
    <ul>
      <li>Category A: Identifiers</li>
      <li>Category B: Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e))</li>
      <li>Category D: Commercial information</li>
      <li>Category F: Internet or other similar network activity</li>
    </ul>
    <p>
      Please note that the categories listed above are those defined in the CCPA. This does not mean that all examples of that category of personal information were in fact
      disclosed, but reflects our good faith belief to the best of our knowledge that some of that information from the applicable category may be and may have been disclosed.
    </p>
    <p>
      When We disclose personal information for a business purpose or a commercial purpose, We enter a contract that describes the purpose and requires the recipient to both keep
      that personal information confidential and not use it for any purpose except performing the contract.
    </p>
    <h3>Sale of Personal Information</h3>
    <p>
      As defined in the CCPA, &quot;sell&quot; and &quot;sale&quot; mean selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise
      communicating orally, in writing, or by electronic or other means, a consumer's personal information by the business to a third party for valuable consideration. This means
      that We may have received some kind of benefit in return for sharing personal information, but not necessarily a monetary benefit.
    </p>
    <p>
      Please note that the categories listed below are those defined in the CCPA. This does not mean that all examples of that category of personal information were in fact sold,
      but reflects our good faith belief to the best of our knowledge that some of that information from the applicable category may be and may have been shared for value in
      return.
    </p>
    <p>We may sell and may have sold in the last twelve (12) months the following categories of personal information:</p>
    <ul>
      <li>Category A: Identifiers</li>
      <li>Category B: Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e))</li>
      <li>Category D: Commercial information</li>
      <li>Category F: Internet or other similar network activity</li>
    </ul>
    <h3>Share of Personal Information</h3>
    <p>We may share Your personal information identified in the above categories with the following categories of third parties:</p>
    <ul>
      <li>Service Providers</li>
      <li>Payment processors</li>
      <li>Our affiliates</li>
      <li>Our business partners</li>
      <li>Third party vendors to whom You or Your agents authorize Us to disclose Your personal information in connection with products or services We provide to You</li>
    </ul>
    <h3>Sale of Personal Information of Minors Under 16 Years of Age</h3>
    <p>
      We do not knowingly collect personal information from minors under the age of 16 through our Service, although certain third party websites that we link to may do so. These
      third-party websites have their own terms of use and privacy policies and we encourage parents and legal guardians to monitor their children's Internet usage and instruct
      their children to never provide information on other websites without their permission.
    </p>
    <p>
      We do not sell the personal information of Consumers We actually know are less than 16 years of age, unless We receive affirmative authorization (the &quot;right to
      opt-in&quot;) from either the Consumer who is between 13 and 16 years of age, or the parent or guardian of a Consumer less than 13 years of age. Consumers who opt-in to the
      sale of personal information may opt-out of future sales at any time. To exercise the right to opt-out, You (or Your authorized representative) may submit a request to Us by
      contacting Us.
    </p>
    <p>
      If You have reason to believe that a child under the age of 13 (or 16) has provided Us with personal information, please contact Us with sufficient detail to enable Us to
      delete that information.
    </p>
    <h3>Your Rights under the CCPA</h3>
    <p>The CCPA provides California residents with specific rights regarding their personal information. If You are a resident of California, You have the following rights:</p>
    <ul>
      <li>
        <strong>The right to notice.</strong> You have the right to be notified which categories of Personal Data are being collected and the purposes for which the Personal Data
        is being used.
      </li>
      <li>
        <strong>The right to request.</strong> Under CCPA, You have the right to request that We disclose information to You about Our collection, use, sale, disclosure for
        business purposes and share of personal information. Once We receive and confirm Your request, We will disclose to You:
        <ul>
          <li>The categories of personal information We collected about You</li>
          <li>The categories of sources for the personal information We collected about You</li>
          <li>Our business or commercial purpose for collecting or selling that personal information</li>
          <li>The categories of third parties with whom We share that personal information</li>
          <li>The specific pieces of personal information We collected about You</li>
          <li>
            If we sold Your personal information or disclosed Your personal information for a business purpose, We will disclose to You:
            <ul>
              <li>The categories of personal information categories sold</li>
              <li>The categories of personal information categories disclosed</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <strong>The right to say no to the sale of Personal Data (opt-out).</strong> You have the right to direct Us to not sell Your personal information. To submit an opt-out
        request please contact Us.
      </li>
      <li>
        <strong>The right to delete Personal Data.</strong> You have the right to request the deletion of Your Personal Data, subject to certain exceptions. Once We receive and
        confirm Your request, We will delete (and direct Our Service Providers to delete) Your personal information from our records, unless an exception applies. We may deny Your
        deletion request if retaining the information is necessary for Us or Our Service Providers to:
        <ul>
          <li>
            Complete the transaction for which We collected the personal information, provide a good or service that You requested, take actions reasonably anticipated within the
            context of our ongoing business relationship with You, or otherwise perform our contract with You.
          </li>
          <li>Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, or prosecute those responsible for such activities.</li>
          <li>Debug products to identify and repair errors that impair existing intended functionality.</li>
          <li>Exercise free speech, ensure the right of another consumer to exercise their free speech rights, or exercise another right provided for by law.</li>
          <li>Comply with the California Electronic Communications Privacy Act (Cal. Penal Code § 1546 et. seq.).</li>
          <li>
            Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws,
            when the information's deletion may likely render impossible or seriously impair the research's achievement, if You previously provided informed consent.
          </li>
          <li>Enable solely internal uses that are reasonably aligned with consumer expectations based on Your relationship with Us.</li>
          <li>Comply with a legal obligation.</li>
          <li>Make other internal and lawful uses of that information that are compatible with the context in which You provided it.</li>
        </ul>
      </li>
      <li>
        <strong>The right not to be discriminated against.</strong> You have the right not to be discriminated against for exercising any of Your consumer's rights, including by:
        <ul>
          <li>Denying goods or services to You</li>
          <li>Charging different prices or rates for goods or services, including the use of discounts or other benefits or imposing penalties</li>
          <li>Providing a different level or quality of goods or services to You</li>
          <li>Suggesting that You will receive a different price or rate for goods or services or a different level or quality of goods or services</li>
        </ul>
      </li>
    </ul>
    <h3>Exercising Your CCPA Data Protection Rights</h3>
    <p>In order to exercise any of Your rights under the CCPA, and if You are a California resident, You can contact Us:</p>
    <ul>
      <li>
        By visiting this page on our website: <a :href="`${domain}/#support`" rel="external nofollow noopener" target="_blank">{{ domain }}/#support</a>
      </li>
    </ul>
    <p>
      Only You, or a person registered with the California Secretary of State that You authorize to act on Your behalf, may make a verifiable request related to Your personal
      information.
    </p>
    <p>Your request to Us must:</p>
    <ul>
      <li>Provide sufficient information that allows Us to reasonably verify You are the person about whom We collected personal information or an authorized representative</li>
      <li>Describe Your request with sufficient detail that allows Us to properly understand, evaluate, and respond to it</li>
    </ul>
    <p>We cannot respond to Your request or provide You with the required information if We cannot:</p>
    <ul>
      <li>Verify Your identity or authority to make the request</li>
      <li>And confirm that the personal information relates to You</li>
    </ul>
    <p>
      We will disclose and deliver the required information free of charge within 45 days of receiving Your verifiable request. The time period to provide the required information
      may be extended once by an additional 45 days when reasonably necessary and with prior notice.
    </p>
    <p>Any disclosures We provide will only cover the 12-month period preceding the verifiable request's receipt.</p>
    <p>
      For data portability requests, We will select a format to provide Your personal information that is readily usable and should allow You to transmit the information from one
      entity to another entity without hindrance.
    </p>
  </div>
</template>
