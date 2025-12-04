
import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-xl">MS</span>
                </div>
                <span className="text-xl font-bold text-gold">Max Saham</span>
              </Link>
              <p className="text-muted-foreground text-sm">
                Professional FCPO trading education and mentorship by Abg Max (Muhammad Haniff)
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#about" className="hover:text-gold transition-colors">About</Link></li>
                <li><Link href="#approach" className="hover:text-gold transition-colors">Trading Approach</Link></li>
                <li><Link href="#class" className="hover:text-gold transition-colors">Classes</Link></li>
                <li><Link href="#membership" className="hover:text-gold transition-colors">Membership</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-gold transition-colors">Free Videos</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">Trading Guides</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">Broker Setup</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-gold transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">Disclaimer</Link></li>
                <li><Link href="#" className="hover:text-gold transition-colors">Risk Warning</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Max Saham. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Leaf className="w-4 h-4 text-green-500" />
                <span>Registered with Securities Commission Malaysia</span>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              <p className="mb-2">
                <strong>Risk Warning:</strong> Trading futures involves substantial risk of loss and is not suitable for all investors. 
                Past performance is not indicative of future results.
              </p>
              <p>
                The information provided on this website is for educational purposes only and should not be considered as financial advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
