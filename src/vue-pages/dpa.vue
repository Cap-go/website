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
// const title = `${brand} | Data Processing Agreement`
// const description = 'Read our Data Processing Agreement'
// useHead({
//   title,
//   meta: [
//     { name: 'title', hid: 'title', content: title },
//     { name: 'og:title', hid: 'og:title', content: title },
//     { name: 'description', hid: 'description', content: description },
//     { name: 'og:description', hid: 'og:description', content: description },
//     { name: 'description', hid: 'description', content: 'Data Processing Agreement' },
//     { name: 'robots', content: 'noindex, nofollow' },
//   ],
// })
</script>

<template>
  <div class="prose prose-sm m-auto text-left px-3">
    <h1>Data Processing Agreement</h1>
    <p>Last updated: September 20, 2023</p>
    <h2>Definitions</h2>
    <ul>
      <li>In the course of providing the Capgo service to user pursuant to the agreement, Capgo may process visitor data on behalf of user.</li>
      <li>
        In this Data Processing Agreement (“DPA”), “Data Protection Legislation” means the General Data Protection Regulation (Regulation (EU) 2016/279), and all other applicable
        laws relating to processing of visitor data and privacy that may exist in any relevant jurisdiction.
      </li>
      <li>“data controller”, “data processor”, “data subject”, “personal data” and “processing” shall be interpreted in accordance with applicable Data Protection Legislation.</li>
      <li>
        The parties agree that user is the data controller and that Capgo is its data processor in relation to visitor data that is processed in the course of providing the
        service.
      </li>
    </ul>
    <h2>Privacy and security of your visitor data</h2>
    <p>
      We take many measures to protect and secure your data through backups, redundancies, and encryption. When you use our service to measure your website stats, Capgo will
      collect information about your visitors.
    </p>
    <p>
      You entrust us with your site data and we take that trust to heart. You agree that Capgo may process your data as described in our data policy and for no other purpose. We do
      our best to deserve that trust by being open about who we are, how we work, and keeping an open door to your feedback.
    </p>
    <p>
      You own all right, title, and interest to your website data. We obtain no rights from you to your website data. We do not collect and analyze personal information from web
      users and use these behavioral insights to sell advertisements. When using Capgo, you 100% own and control all of your website data. We don’t sell or share your site data to
      any third-parties, and we don’t abuse your visitor’s privacy.
    </p>
    <p>
      The purpose of Capgo is updates the Capacitor, this can still be done without tracking, collecting or storing any personal data or personally identifiable information (PII),
      without using cookies and while respecting the privacy of your website visitors.
    </p>
    <p>
      By using Capgo, all the site measurement is carried out absolutely anonymously. We minimize data collection in general. We measure only the most essential data points and
      nothing else. All the metrics we do collect fit on one single page.
    </p>
    <p>
      We do not attempt to generate a device-persistent identifier because they are considered personal data under GDPR. We do not use cookies, browser cache nor the local storage.
      We do not store, retrieve nor extract anything from visitor’s devices. The data we process cannot be used to identify any single individual.
    </p>
    <p>
      The group of data subjects affected by the processing of their data under this agreement includes end-users of the controller’s websites which make use of the service
      provided by the processor.
    </p>
    <p>
      You can find more information about our processing of your visitor data and what types/categories of data we collect on your behalf in our publicly available
      <a href="https://www.apple.com/legal/privacy/en-ww/" rel="external nofollow noopener" target="_blank"> data policy</a>.
    </p>
    <h2>Organizational and technical security measures</h2>
    <p>
      For encryption, we use https in transit and the hashing process at rest. Our hashing process is much stronger than encryption. Encryption implies that there’s a key that can
      decrypt and reveal the raw data. In our database the raw IP address and User Agent are rendered completely inaccessible to anyone, including ourselves. In addition to this,
      we use strict firewall rules and private encrypted networking. We keep offsite backups with replication including strong bcrypt passwords.
    </p>
    <p>
      Capgo is fully open source software which means that our source code is available and accessible on GitHub so anyone can check it out and audit it. You can read it, inspect
      it and review it to understand how it works and to ensure it keeps the data private and secure. This gives you and everyone else full transparency on how we handle the
      website traffic data.
    </p>
    <p>
      With more than 500+ GitHub stars, there are a lot of eyes on our code and it is this transparency and openness that means that open source products can be more trustworthy
      than proprietary and closed source products. Our software is updated several times per week and on our GitHub page we also have a way for people to report any security
      vulnerabilities.
    </p>
    <h2>Processor’s obligations with respect to the controller</h2>
    <ul>
      <li>
        Capgo will process visitor data only in accordance with instructions from customer through the settings of the service, i.e. (a) to operate, maintain and support the
        infrastructure used to provide the service; (b) to comply with customer’s instructions and processing instructions in their use, management and administration of the
        service; (c) as otherwise instructed through settings of the service. Capgo will only process visitor data in accordance with the agreement.
      </li>
      <li>
        Capgo shall notify customer without undue delay if, in Capgo’s opinion, an instruction for the processing of visitor data given by customer infringes applicable Data
        Protection Legislation.
      </li>
      <li>Capgo shall guarantee the confidentiality of visitor data processed hereunder.</li>
      <li>
        We as humans can access your data to help you with support requests you make and to maintain and safeguard Capgo to ensure the security of your data and the service as a
        whole. Capgo shall ensure that all Capgo personnel required to access the visitor data are trained in GDPR and data privacy, informed of the confidential nature of the data
        and comply with the obligations sets out in this agreement.
      </li>
      <li>
        Capgo shall implement and maintain appropriate technical and organisational security measures designed to protect the visitor data against unauthorised or unlawful
        processing and against accidental loss, destruction, damage, theft, alteration or disclosure. These measures shall be appropriate to the harm which might result from any
        unauthorised or unlawful processing, accidental loss, destruction, damage or theft of the visitor data and having regard to the nature of the visitor data which is to be
        protected.
      </li>
      <li>
        We do work with sub-processors. With each vendor, we assess their commitment to privacy and we sign a data processing agreement with them that include the
        controller-processor Standard Contractual Clauses. Any such subcontractors will be permitted to process data only to deliver the services Capgo has retained them to
        provide, and they shall be prohibited from using data for any other purpose. Capgo shall notify the controller when modifying the list of subprocessors using our in-app
        notifications, email and/or blog. The controller is able to legitimately object and may terminate the agreement.
      </li>
      <li>
        If Capgo becomes aware of any accidental, unauthorised or unlawful security breach, destruction, loss, alteration, or disclosure of the personal data that is processed by
        Capgo in the course of providing the service, it shall without undue delay (not later than 48 hours after having become aware of it), notify customer by email and provide
        customer with a description of the incident as well as periodic updates to information about the incident, including its impact on customer content. Capgo shall
        additionally take action to investigate the incident and reasonably prevent or mitigate the effects of the incident.
      </li>
      <li>
        Capgo shall not on its own authority rectify, erase or restrict the processing of visitor data that is being processed on behalf of the controller (unless this is required
        by law or the Processor Terms of Service), but shall only do so on documented instructions from the controller and in accordance to the data retention rules associated to
        the controller subscription plan.
      </li>
      <li>
        Capgo shall assist the controller in complying with the obligations concerning the security of personal data. Plausible will also provide assistance to the controller for
        DPIAs. Where a data subject asserts their rights as a data subject, this request will be forwarded to the controller without delay.
      </li>
    </ul>
    <h2>Customer undertakings and Capgo assistance</h2>
    <ul>
      <li>Customer warrants that it has all necessary rights to provide to Capgo the visitor data for processing in connection with the provision of the Capgo Services.</li>
      <li>Customer shall comply at all times with Data Protection Legislations in respect of all visitor data it provided to Capgo pursuant to the Agreement.</li>
      <li>Customer understands, as a controller, that it is responsible (as between customer and Capgo) for:</li>
      <ol>
        <li>
          determining the lawfulness of any processing, performing any required data protection impact assessments, and accounting to regulators and individuals, as may be needed;
        </li>
        <li>providing relevant privacy notices to data subjects as may be required in your jurisdiction;</li>
        <li>implementing your own appropriate technical and organizational measures to ensure and demonstrate processing in accord with this DPA;</li>
        <li>notifying any relevant regulators or authorities of any incident as may be required by law in your jurisdiction.</li>
      </ol>
    </ul>
    <h2>Liability and Indemnity</h2>
    <ul>
      <li>
        Each party indemnifies the other and holds them harmless against all claims, actions, third party claims, losses, damages and expenses incurred by the indemnified party and
        arising directly or indirectly out of or in connection with a breach of this DPA.
      </li>
    </ul>
    <h2>Are customers required to sign the Capgo DPA?</h2>
    <p>
      In order to use our products and services, you need to accept our DPA. By using our product you are agreeing to our terms of service, and you are automatically accepting our
      DPA and do not need to sign a separate document. We provide the same privacy rights and protection to all customers.
    </p>
    <h2>Can a customer share the Capgo DPA with its customers?</h2>
    <p>
      Yes. The DPA is a publicly available document and customers who wish to share it with their customers to confirm our security measures and other terms may feel free to do so.
    </p>
    <h2>Do customers need to notify anyone upon accepting our DPA?</h2>
    <p>No. You are not required to notify us or any third party upon accepting our DPA though, as mentioned above, you are free to do so.</p>
    <h2>Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, You can contact us:</p>
    <ul>
      <li>
        By visiting this page on the website: <a :href="`${domain}/#support`" rel="external nofollow noopener" target="_blank">{{ domain }}/#support</a>
      </li>
    </ul>
  </div>
</template>
