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
            <img src="https://nicklaunches.com/badges/featured.png" alt="Soseki on Nick Launches" width="244" height="56" className="h-[56px] w-auto shadow-sm rounded-full" />
          </a>

          {/* Example 3: Aback Launch */}
          <a href="https://abacklaunch.com" target="_blank" rel="dofollow" className="hover:scale-105 transition-transform flex items-center justify-center bg-white rounded-full p-2 border border-[#E5E7EB] shadow-sm h-[56px]">
            <img src="https://abacklaunch.com/badges/listed-on-light.svg" alt="Listed on Aback Launch" width="150" height="32" className="h-full w-auto p-1" />
          </a>

          {/* You can add the rest of your 12 badges here! Just paste them below like the ones above. */}

        </div>
      </div>
    </section>
  );
}
