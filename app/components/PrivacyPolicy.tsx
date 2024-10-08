import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="text-slate-400 space-y-6">
      <h1 className="h1 mb-4">Privacy Policy for TestOpenAPI</h1>
      <p>Last updated: 24-02-2024</p>
      <p>
        At TestOpenApi, accessible from https://testopenapi.com, one of our main
        priorities is the privacy of our users. This Privacy Policy document
        contains types of information that is collected and recorded by
        TestOpenAPI and how we use it.
      </p>
      <p>
        If you have additional questions or require more information about our
        Privacy Policy, do not hesitate to{" "}
        <Link legacyBehavior href="/support/contact">
          <a className="text-blue-500 hover:underline">contact us</a>
        </Link>
        .
      </p>
      <h2 className="h2 mb-4">Consent</h2>
      <p>
        By using our website, you hereby consent to our Privacy Policy and agree
        to its terms.
      </p>
      <h2 className="h2 mb-4">Information We Collect</h2>
      <p>
        The personal information that you are asked to provide, and the reasons
        why you are asked to provide it, will be made clear to you at the point
        we ask you to provide your personal information.
      </p>
      <p>
        If you contact us directly, we may receive additional information about
        you such as your name, email address, phone number, the contents of the
        message and/or attachments you may send us, and any other information
        you may choose to provide.
      </p>
      <p>
        When you register for an Account, we may ask for your contact
        information, including items such as name, company name, address, email
        address, and telephone number.
      </p>
      <h2 className="h2 mb-4">How We Use Your Information</h2>
      <p>We use the information we collect in various ways, including to:</p>
      <ul>
        <li>Provide, operate, and maintain our website</li>
        <li>Improve, personalize, and expand our website</li>
        <li>Understand and analyze how you use our website</li>
        <li>Develop new products, services, features, and functionality</li>
        <li>
          Communicate with you, either directly or through one of our partners,
          including for customer service, to provide you with updates and other
          information relating to the website, and for marketing and promotional
          purposes
        </li>
        <li>Send you emails</li>
        <li>Find and prevent fraud</li>
      </ul>
      <h2 className="h2 mb-4">Cookies and Web Beacons</h2>
      <p>
        Like any other website, TestOpenAPI uses cookies. These cookies are used
        to store information including visitors preferences, and the pages on
        the website that the visitor accessed or visited. The information is
        used to optimize the users experience by customizing our web page
        content based on visitors browser type and/or other information.
      </p>
      <h2 className="h2 mb-4">Third Party Privacy Policies</h2>
      <p>
        TestOpenAPIs Privacy Policy does not apply to other advertisers or
        websites. Thus, we are advising you to consult the respective Privacy
        Policies of these third-party ad servers for more detailed information.
        It may include their practices and instructions about how to opt-out of
        certain options.
      </p>
      <h2 className="h2 mb-4">GDPR Data Protection Rights</h2>
      <p>
        We would like to make sure you are fully aware of all of your data
        protection rights. Every user is entitled to the following:
      </p>
      <ul>
        <li>
          The right to access – You have the right to request copies of your
          personal data.
        </li>
        <li>
          The right to rectification – You have the right to request that we
          correct any information you believe is inaccurate. You also have the
          right to request that we complete the information you believe is
          incomplete.
        </li>
        <li>
          The right to erasure – You have the right to request that we erase
          your personal data, under certain conditions.
        </li>
        <li>
          The right to restrict processing – You have the right to request that
          we restrict the processing of your personal data, under certain
          conditions.
        </li>
        <li>
          The right to object to processing – You have the right to object to
          our processing of your personal data, under certain conditions.
        </li>
        <li>
          The right to data portability – You have the right to request that we
          transfer the data that we have collected to another organization, or
          directly to you, under certain conditions.
        </li>
      </ul>
      <p>
        If you make a request, we have one month to respond to you. If you would
        like to exercise any of these rights, please contact us.
      </p>
    </div>
  );
}
