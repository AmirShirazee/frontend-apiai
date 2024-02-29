export default function Features04() {
  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Blurred shape */}
        <div
          className="absolute top-0 -mt-24 left-0 -ml-16 blur-2xl opacity-70 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
            <defs>
              <linearGradient
                id="bs4-a"
                x1="19.609%"
                x2="50%"
                y1="14.544%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              fill="url(#bs4-a)"
              fillRule="evenodd"
              d="m0 0 461 369-284 58z"
              transform="matrix(1 0 0 -1 0 427)"
            />
          </svg>
        </div>

        <div className="pt-16 pb-12 md:pt-32 md:pb-20">
          {/* Section header */}
          <div className="max-w-3xl pb-12 md:pb-20">
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              How does it work?
            </h2>
            <p className="text-lg text-slate-400">
              Start by uploading your OpenAPI Specification file. Our platform
              ensures a secure and quick upload process, laying the foundation
              for generating comprehensive Jest tests.
            </p>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-800">
            {/* Row */}
            <div className="py-8 first-of-type:pt-0 last-of-type:pb-0">
              <div>
                <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 pb-6">
                  Automate Your API Testing with OpenAPI
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-2">
                {/* Feature */}
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <svg
                      className="shrink-0 fill-slate-300 gear-container"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      {/* Outer Gear */}
                      <g className="gear-outer">
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          stroke="slategray"
                          strokeWidth="1"
                          fill="none"
                        />
                        <line
                          x1="8"
                          y1="2"
                          x2="8"
                          y2="0"
                          stroke="slategray"
                          strokeWidth="1"
                        />
                        <line
                          x1="8"
                          y1="16"
                          x2="8"
                          y2="14"
                          stroke="slategray"
                          strokeWidth="1"
                        />
                        <line
                          x1="2"
                          y1="8"
                          x2="0"
                          y2="8"
                          stroke="slategray"
                          strokeWidth="1"
                        />
                        <line
                          x1="16"
                          y1="8"
                          x2="14"
                          y2="8"
                          stroke="slategray"
                          strokeWidth="1"
                        />
                      </g>

                      {/* Inner Gear */}
                      <g className="gear-inner">
                        <circle
                          cx="8"
                          cy="8"
                          r="3"
                          stroke="slategray"
                          strokeWidth="1"
                          fill="none"
                        />
                        <line
                          x1="8"
                          y1="5"
                          x2="8"
                          y2="4"
                          stroke="slategray"
                          strokeWidth="1"
                        />
                        <line
                          x1="8"
                          y1="12"
                          x2="8"
                          y2="11"
                          stroke="slategray"
                          strokeWidth="1"
                        />
                        <line
                          x1="5"
                          y1="8"
                          x2="4"
                          y2="8"
                          stroke="slategray"
                          strokeWidth="1"
                        />
                        <line
                          x1="12"
                          y1="8"
                          x2="11"
                          y2="8"
                          stroke="slategray"
                          strokeWidth="1"
                        />
                      </g>

                      {/* Center */}
                      <circle
                        cx="8"
                        cy="8"
                        r="1"
                        stroke="slategray"
                        strokeWidth="1"
                        fill="slategray"
                      />
                    </svg>

                    <h4 className="font-medium text-slate-50">
                      Dynamic Test Generation
                    </h4>
                  </div>
                  <p className="text-sm text-slate-400">
                    Automatically generate Jest test cases for your APIs based
                    on your OpenAPI spec. This includes test scenarios for
                    status codes, path parameters, and query parameters.
                  </p>
                </div>
                {/* Feature */}
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <svg
                      className="shrink-0 fill-slate-300"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z" />
                    </svg>
                    <h4 className="font-medium text-slate-50">
                      Parameterized Testing
                    </h4>
                  </div>
                  <p className="text-sm text-slate-400">
                    Use valid and invalid parameters to rigorously test the
                    robustness of your API, all derived from your OpenAPI
                    Specification.
                  </p>
                </div>
                {/* Feature */}
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <svg
                      className="shrink-0 fill-slate-300"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        className="box box-bottom"
                        x="5"
                        y="15"
                        width="14"
                        height="4"
                      />
                      <rect
                        className="box box-middle"
                        x="7"
                        y="11"
                        width="10"
                        height="4"
                      />

                      <rect
                        className="box box-top"
                        x="9"
                        y="7"
                        width="6"
                        height="4"
                      />
                    </svg>

                    <h4 className="font-medium text-slate-50">Edge cases</h4>
                  </div>
                  <p className="text-sm text-slate-400">
                    We take into account all the edge cases that might not be
                    visible during routine testing but could lead to unexpected
                    behavior. With our platform, you&apos;ll be prepared for any
                    scenario.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
