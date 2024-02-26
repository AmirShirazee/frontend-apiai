"use client";

import React, { useState } from "react";

type FormDataState = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

type ErrorState = {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
  termsAgreed?: string;
};

const HelpCenter = () => {
  const [formData, setFormData] = useState<FormDataState>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);

  const validateForm = () => {
    let formIsValid = true;
    let newErrors: ErrorState = {};

    if (!formData.firstName) {
      formIsValid = false;
      newErrors.firstName = "First Name is required.";
    }

    if (!formData.email) {
      formIsValid = false;
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      formIsValid = false;
      newErrors.email = "Email is invalid.";
    }

    if (!formData.message) {
      formIsValid = false;
      newErrors.message = "Message is required.";
    }

    if (!isTermsAgreed) {
      formIsValid = false;
      newErrors.termsAgreed = "You must agree to the terms.";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // Clear any errors for this field
    if (errors[name as keyof ErrorState]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form data before submitting
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("/api/support/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        // Reset form and errors if successful
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
        setIsTermsAgreed(false);
        setErrors({});
      } else {
        alert(result.message); // or handle error messages from server
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while sending your inquiry.");
    }
  };
  return (
    <>
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h1 mb-4" data-aos="fade-up">
                How can we help you?
              </h1>
              <p
                className="text-xl text-gray-400"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Fill out the form below and well get back to you as soon as
                possible.
              </p>
            </div>

            {/* Contact form */}
            <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-4">
                {/* FirstName field */}
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label
                    className="block text-gray-300 text-sm font-medium mb-1"
                    htmlFor="first-name"
                  >
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="first-name"
                    name="firstName" // Make sure the name matches the formData state key
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form-input w-full text-gray-300 ${errors.firstName ? "border-red-500 focus:border-red-500" : "border-gray-300"}`}
                    placeholder="Enter your first name"
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block text-gray-300 text-sm font-medium mb-1"
                    htmlFor="last-name"
                  >
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input w-full text-gray-300"
                    placeholder="Enter your last name"
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input w-full text-gray-300"
                    placeholder="Enter your email address"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-sm font-medium mb-1"
                    htmlFor="subject"
                  >
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input w-full text-gray-300"
                    placeholder="How can we help you?"
                    required
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-300 text-sm font-medium mb-1"
                    htmlFor="message"
                  >
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="form-textarea w-full text-gray-300"
                    placeholder="Write your message"
                    required
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      required
                      checked={isTermsAgreed}
                      onChange={(e) => {
                        setIsTermsAgreed(e.target.checked);
                        if (errors.termsAgreed) {
                          setErrors((prevErrors) => ({
                            ...prevErrors,
                            termsAgreed: undefined,
                          }));
                        }
                      }}
                    />
                    {errors.termsAgreed && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.termsAgreed}
                      </p>
                    )}
                    <span className="text-gray-400 ml-2">
                      I agree to the privacy policy{" "}
                      <span className="text-red-600">*</span>{" "}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default HelpCenter;
