import React from "react";
import AccordionBasic from "@/app/components/accordion-basic";

const faqs = [
  {
    title: "How do I use TestOpenAPI?",
    content:
      "You can use TestOpenAPI by signing up on our website and uploading a OpenAPI specification. You will receive within seconds a set of Jest tests that you can use to test your API endpoints.",
  },
  {
    title: "Is TestOpenAPI free to use?",
    content:
      "Currently TestOpenAPI is in beta and is free to use. We may introduce a pricing model in the future, but we will always offer a free tier for small projects and open-source initiatives.",
  },
  {
    title: "What is the purpose of this application?",
    content:
      "Our application automates the process of generating Jest tests from your OpenAPI specification, ensuring that your API endpoints are tested efficiently and effectively according to your defined parameters and responses. This helps you to maintain the quality and reliability of your API.",
  },
  {
    title: "How do I provide my OpenAPI specification to the application?",
    content:
      "You can upload your OpenAPI specification through our user interface or provide a URL where your specification is hosted. Our application will then parse your specification and use it to generate the Jest tests.",
  },
  {
    title: "What version of OpenAPI does this application support?",
    content:
      "The application supports OpenAPI 3.0 and newer versions. If you have a specification in an older version, please convert it to at least OpenAPI 3.0 for compatibility.",
  },
  {
    title: "Can I customize the generated Jest tests?",
    content:
      "Yes, you can. Once tests are generated, you can review and amend them as necessary to suit your specific testing requirements. This can be done directly within the browser, as we provide a code editor for you to make changes.",
  },
  {
    title: "How are parameters and responses handled in the generated tests?",
    content:
      "Generated tests include assertions for the expected parameters and responses. They validate that your API endpoints accept the correct parameters and return the expected responses.",
  },
  {
    title:
      "Does the application support authentication and authorization in tests?",
    content:
      "Yes, our application allows you to set up authentication tokens or other authorization mechanisms, which will be included in the generated tests to authenticate against your API.",
  },
  {
    title: "How do I run the generated Jest tests?",
    content:
      "You can run the generated tests using Jest's command-line interface or by integrating them into your existing test suite, provided Jest is installed and properly configured in your project.",
  },
  {
    title: "What happens if my OpenAPI specification changes?",
    content:
      "You should regenerate your tests to match the updated OpenAPI specification. This ensures that the tests remain consistent with your API's current functionality. We recommend regenerating tests whenever your API changes. We are currently working on a feature to automate this process, by directly integrating with your CI/CD pipeline.",
  },
  {
    title: "Is there a limit to the size of the OpenAPI specification?",
    content:
      "There is no set limit to the size of the OpenAPI specification. However, processing time may increase with larger specifications, but our application is designed to handle them efficiently.",
  },
  {
    title: "How do I report a bug or request a feature for this application?",
    content:
      "Please reach out through our support channels or our GitHub repository to report bugs or request new features. We value user feedback and strive to improve our application.",
  },
];

export default function FaqPage() {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto pb-12 md:pb-16">
            <h1 className="h1 mb-4" data-aos="fade-up">
              Frequently Asked Questions
            </h1>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionBasic key={index} title={faq.title}>
                  {faq.content}
                </AccordionBasic>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
