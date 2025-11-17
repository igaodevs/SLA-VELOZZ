'use client'

import { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleRouteChange = () => {
      scroll.scrollToTop({
        duration: 500,
        smooth: 'easeInOutQuart',
      });
    };

    // Add smooth scroll behavior to all anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        const targetElement = document.querySelector(targetId || '');
        if (targetElement) {
          scroll.scrollTo(targetElement.getBoundingClientRect().top + window.scrollY, {
            duration: 800,
            smooth: 'easeInOutQuart',
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return <>{children}</>;
}
