import Link from "next/link";
import { Youtube, Music2, Facebook, Send, MessageCircle } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: "About", href: "#about" },
      { label: "Trading Approach", href: "#approach" },
      { label: "Classes", href: "#class" },
      { label: "Membership", href: "#membership" }
    ],
    resources: [
      { label: "FCPO Guide", href: "#fcpo" },
      { label: "Open Account", href: "#broker" },
      { label: "Media", href: "#media" },
      { label: "Contact", href: "#contact" }
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "SC Verification", href: "https://www.sc.com.my" },
      { label: "Disclaimer", href: "/disclaimer" }
    ]
  };

  const socialLinks = [
    { icon: Youtube, url: "https://youtube.com/@maxsaham", label: "YouTube" },
    { icon: Music2, url: "https://tiktok.com/@maxsaham", label: "TikTok" },
    { icon: Facebook, url: "https://facebook.com/maxsaham", label: "Facebook" },
    { icon: Send, url: "https://t.me/maxsaham", label: "Telegram" },
    { icon: MessageCircle, url: "https://wa.me/60123456789", label: "WhatsApp" }
  ];

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/LOGO-square-for-rounded-crop.jpg"
                alt="Max Saham"
                width={160}
                height={53}
                className="h-12 w-auto rounded-lg"
              />
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Professional FCPO trading education combining Wyckoff, Smart Money Concepts, and Order Flow analysis.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-muted/50 hover:bg-gold/20 rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Max Saham. All rights reserved. | Trading involves risk. Past performance does not guarantee future results.
            </p>
            <p className="text-xs text-muted-foreground">
              Registered Marketing Representative - Securities Commission Malaysia
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Risk Disclaimer:</strong> All content provided by MaxSaham is for educational purposes only and does not constitute financial advice. 
            Futures trading involves significant risk and may result in the loss of capital. Trade responsibly and within your own risk tolerance. 
            Trading futures and derivatives involves substantial risk of loss and is not suitable for all investors. 
            The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, 
            level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment. 
            You should only trade with money you can afford to lose.
          </p>
        </div>
      </div>
    </footer>
  );
}
