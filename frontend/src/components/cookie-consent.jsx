"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "granted");
    setShow(false);
    
    // Push event to GTM
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "cookie_consent_granted" });
      
      // Google Consent Mode v2 Update
      function gtag(){window.dataLayer.push(arguments);}
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "denied");
    setShow(false);
    
    // Push event to GTM
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "cookie_consent_denied" });
      
      // Google Consent Mode v2 Update
      function gtag(){window.dataLayer.push(arguments);}
      gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      });
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 sm:bottom-4 sm:left-4 sm:right-auto pointer-events-none">
      <div className="bg-white dark:bg-[#09090b] border border-gray-200 dark:border-white/10 shadow-2xl rounded-2xl p-5 max-w-sm w-full pointer-events-auto flex flex-col gap-4 relative animate-in slide-in-from-bottom-5 fade-in duration-500">
        <button 
          onClick={handleDecline}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full text-primary">
            <Cookie className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm tracking-tight">We value your privacy</h3>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          We use tracking cookies to understand how you interact with our platform and to improve your experience. See our <a href="/privacy-policy" className="text-primary hover:underline font-medium">Privacy Policy</a> for more details.
        </p>
        
        <div className="flex items-center gap-3 mt-2">
          <Button 
            onClick={handleDecline} 
            variant="outline" 
            className="flex-1 text-xs h-9 dark:border-white/10 dark:hover:bg-white/5"
          >
            Decline
          </Button>
          <Button 
            onClick={handleAccept} 
            className="flex-1 text-xs h-9 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
