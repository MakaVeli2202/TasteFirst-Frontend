import { Mail, Phone } from 'lucide-react';

function Footer() {

  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">RealCalories</h3>
            <p className="text-gray-300">
              Premium desserts with transparent nutrition
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <div className="flex gap-2 items-center mb-2">
              <Mail size={18} />
              <a href="mailto:info@realcalories.qa" className="hover:text-green-400">
                info@TestFirst.qa
              </a>
            </div>

            <div className="flex gap-2 items-center">
              <Phone size={18} />
              <a href="tel:+97444123456" className="hover:text-green-400">
                +974 4412 3456
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Hours</h4>
            <p className="text-gray-300">Mon-Thu: 10am - 10pm</p>
            <p className="text-gray-300">Fri-Sat: 12pm - 11pm</p>
            <p className="text-gray-300">Sun: Closed</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2026 TestFirst. All rights reserved.</p>
        </div>

      </div>

    </footer>
  );
}

export default Footer;