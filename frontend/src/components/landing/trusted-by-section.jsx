import React from 'react';

export function TrustedBySection() {
  return (
    <section className="py-12 border-y border-gray-200/50 bg-[#f3f8ff]/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Featured & Launched On
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
          
          {/* Example 1: What Launched Today */}
          <a href="https://whatlaunched.today" target="_blank" rel="noopener noreferrer" aria-label="Live on What Launched Today badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '10px 20px', borderRadius: '9999px', border: '1px solid #E5E7EB', background: '#FFFFFF', fontFamily: "'Google Sans Flex',Arial,sans-serif", textDecoration: 'none', height: '56px' }} className="hover:scale-105 transition-transform shadow-sm">
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '9999px', background: '#F8FAFC', border: '1px solid #E5E7EB' }}>
              <img src="https://whatlaunched.today/Logo.png" alt="What Launched Today" style={{ width: '20px', height: '20px' }} />
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }} className="text-left">
              <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#0F172A' }}>LIVE ON</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>What Launched Today</span>
            </span>
            <span style={{ fontSize: '16px', color: '#0F172A' }}>★</span>
          </a>

          {/* Example 2: Nick Launches */}
          <a href="https://nicklaunches.com/products/soseki/?utm_source=soseki.app&utm_medium=badge&utm_campaign=featured" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform flex items-center justify-center">
            <img src="https://nicklaunches.com/badges/featured.png" alt="Soseki on Nick Launches" width="244" height="56" className="h-[56px] w-auto" />
          </a>
          {/* Example 3: Uneed */}
          <a href="https://www.uneed.best/tool/soseki" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform flex items-center justify-center">
            <img src="https://www.uneed.best/EMBED3B.png" alt="Launching Soon on Uneed" className="h-[56px] w-auto" />
          </a>
          {/* Example 4: Dodo Payments */}
          <a href="https://index.dodopayments.com/soseki" target="_blank" rel="noopener noreferrer" aria-label="Featured on Dodo Payments badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '10px 20px', borderRadius: '9999px', border: '1px solid #E5E7EB', background: '#FFFFFF', fontFamily: "'Google Sans Flex',Arial,sans-serif", textDecoration: 'none', height: '56px' }} className="hover:scale-105 transition-transform shadow-sm">
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '9999px', background: '#F8FAFC', border: '1px solid #E5E7EB' }}>
              <span className="text-lg leading-none" role="img" aria-label="Dodo">🦤</span>
            </span>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }} className="text-left">
              <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#0F172A' }}>FEATURED ON</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>Dodo Payments</span>
            </span>
          </a>

          {/* Example 5: Aura++ */}
          <a href="https://auraplusplus.com/projects/soseki-open-source-freelance-business-platform" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform flex items-center justify-center">
            <img src="https://auraplusplus.com/images/badges/featured-on-light.svg" alt="Featured on Aura++" width="265" height="58" className="h-[56px] w-auto" />
          </a>

          {/* Example 6: Product Hunt */}
          <a href="https://www.producthunt.com/products/soseki?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-soseki" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform flex items-center justify-center">
            <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1205549&theme=dark&t=1784899100375" alt="Soseki - Run Your Freelance Business, All in One Place | Product Hunt" width="250" height="54" className="h-[56px] w-auto" />
          </a>

          {/* You can add the rest of your badges here! Just paste them below like the ones above. */}
        </div>
      </div>
    </section>
  );
}
