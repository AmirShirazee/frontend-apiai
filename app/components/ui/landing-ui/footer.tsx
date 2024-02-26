import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-row justify-between items-center py-8 md:py-12">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <div className="text-sm text-slate-300">
              © {new Date().getFullYear()} ApiAi - All rights reserved.
            </div>
          </div>

          <div className="flex flex-row space-x-4">
            <a
              className="text-sm text-slate-400 hover:text-slate-200"
              href="/support/contact"
            >
              Contact
            </a>
            <a
              className="text-sm text-slate-400 hover:text-slate-200"
              href="/support/faq"
            >
              FAQ
            </a>
            <a
              className="text-sm text-slate-400 hover:text-slate-200"
              href="/support/privacy-policy"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
