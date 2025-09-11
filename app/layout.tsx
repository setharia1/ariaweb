import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import BackgroundEffects from '@/components/BackgroundEffects';
import BackgroundParticles from '@/components/BackgroundParticles';
import LangtonsAnt from '@/components/LangtonsAnt';
import CursorAura from '@/components/CursorAura';
import DevUtils from '@/components/DevUtils';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Aria',
  description: 'Building the Future Through Thoughtful Investment',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Aria',
    description: 'Building the Future Through Thoughtful Investment',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head />
      <body className="min-h-[100svh] flex flex-col bg-app tron-grid">
        <ThemeProvider>
          <DevUtils />
          {/* Background (z-0) */}
          <BackgroundEffects />
          <LangtonsAnt />
          <CursorAura />
          
          {/* Site content (z-10) */}
          <div className="relative z-10 flex flex-col min-h-[100svh]">
            <Header />
            <div className="flex-1">
              <PageTransition>
                {children}
              </PageTransition>
            </div>
            <Footer className="mt-auto" />
          </div>
        </ThemeProvider>
        
        {/* Runtime CSS Guard */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const testEl = document.createElement('div');
                testEl.style.background = '#33E1ED';
                testEl.style.position = 'fixed';
                testEl.style.top = '0';
                testEl.style.left = '0';
                testEl.style.width = '1px';
                testEl.style.height = '1px';
                testEl.style.zIndex = '99999';
                testEl.style.opacity = '0';
                testEl.style.pointerEvents = 'none';
                document.body.appendChild(testEl);
                
                const computedStyle = window.getComputedStyle(testEl);
                const bgColor = computedStyle.backgroundColor;
                
                if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
                  console.warn('⚠️ Tailwind CSS may not be loading properly. Check your build configuration.');
                }
                
                document.body.removeChild(testEl);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
