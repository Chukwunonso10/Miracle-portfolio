import React from 'react';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, MessageSquare, Download } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-background py-16 sm:py-24 px-6 page-transition">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-widest text-primary font-bold">Contact & Booking</p>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-tight">
            Let's Start A <br />
            <span className="text-gold-gradient">Creative Session</span>
          </h1>
          <p className="text-muted-foreground font-light text-sm sm:text-base leading-relaxed">
            Have a project scope ready, or looking to collaborate? Fill out the inquiry sheet below, or contact the studio directly via email or messaging links.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (Contact Form) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column (Details cards) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick WhatsApp click card */}
            <a
              href="https://wa.me/2348159248420"
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-[#075e54]/10 border border-[#075e54]/30 hover:border-[#128c7e]/80 transition-colors duration-300 block space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-[#075e54]/20 text-[#128c7e] group-hover:scale-105 transition-transform">
                  <MessageSquare size={20} />
                </div>
                <span className="text-[10px] font-mono uppercase text-[#128c7e] font-bold">Recommended</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">WhatsApp Live Chat</h3>
                <p className="text-xs text-muted-foreground font-light mt-0.5">
                  Direct message link to coordinate urgent booking slots. Response time &lt; 30 minutes.
                </p>
              </div>
            </a>

            {/* General contact data */}
            <div className="p-6 rounded-2xl bg-card border border-border space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground border-b border-border pb-3">
                Studio Coordinates
              </h3>
              
              <ul className="space-y-4 text-xs sm:text-sm">
                <li className="flex items-start space-x-3 text-muted-foreground">
                  <Mail size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] uppercase font-bold text-muted-foreground/80">Email Address</p>
                    <a href="mailto:kellymaxstudios@gmail.com" className="font-semibold text-foreground hover:text-primary transition-colors">
                      kellymaxstudios@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-muted-foreground">
                  <Phone size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] uppercase font-bold text-muted-foreground/80">Phone Hotline</p>
                    <a href="tel:+2348000000000" className="font-semibold text-foreground hover:text-primary transition-colors">
                      +234 815 924 8420
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-3 text-muted-foreground">
                  <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] uppercase font-bold text-muted-foreground/80">Physical Studio</p>
                    <p className="font-semibold text-foreground mt-0.5">Enug, Nigeria</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Profile Booklet download option */}
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Creative Agency Deck</h3>
                <p className="text-xs text-muted-foreground font-light mt-0.5 leading-relaxed">
                  Download our structured booklet displaying pricing details, delivery terms, and a selected offline portfolio.
                </p>
              </div>
              <a
                href="#"
                className="w-full py-3 rounded-lg border border-border hover:bg-secondary bg-card text-foreground font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2 transition-all active:scale-98"
              >
                <Download size={14} className="text-primary" />
                <span>Download Brochure</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
