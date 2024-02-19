import Logo from "./logo";

export default function Footer() {
  return (
      <footer className="bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12">
            <div className="sm:col-span-12 lg:col-span-3">
              <div className="mb-4">
                <Logo />
              </div>
              <div className="text-sm text-slate-300">
                © {new Date().getFullYear()} ApiAi - All rights reserved.
              </div>
            </div>

            <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
              <h6 className="text-sm text-slate-50 font-medium mb-2">Support</h6>
              <ul className="text-sm space-y-2">
                <li><a className="text-slate-400 hover:text-slate-200" href="/support/contact">Help Center</a></li>
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">Contact Us</a></li>
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">Privacy Policy</a></li>
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">Refund Policy</a></li>
              </ul>
            </div>

            <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
              <h6 className="text-sm text-slate-50 font-medium mb-2">Resources</h6>
              <ul className="text-sm space-y-2">
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">Documentation</a></li>
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">Developer API</a></li>
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">Community</a></li>
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">FAQs</a></li>
              </ul>
            </div>

            <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
              <h6 className="text-sm text-slate-50 font-medium mb-2">Company</h6>
              <ul className="text-sm space-y-2">
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">About Us</a></li>
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">Careers</a></li>
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">Blog</a></li>
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">Diversity & Inclusion</a></li>
              </ul>
            </div>

            <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
              <h6 className="text-sm text-slate-50 font-medium mb-2">Licenses & Pricing</h6>
              <ul className="text-sm space-y-2">
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">Pricing</a></li>
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">License Agreement</a></li>
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">Terms of Service</a></li>
                <li><a className="text-slate-400 hover:text-slate-200" href="#0">Service Level Agreement</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
  );
}
