/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand
        ink:    '#0c0c12',
        paper:  '#f6f3ee',
        cream:  '#faf8f4',
        accent: '#c8300a',
        // Partits (color semàntic consistent)
        pp:      '#0e2a6e',
        'pp-bg': '#dce8ff',
        psib:    '#b82012',
        'psib-bg': '#fde8e6',
        mes:     '#1a5c30',
        'mes-bg': '#e8f5e9',
        vox:     '#4a6600',
        'vox-bg': '#f0f4e0',
        podem:   '#6b0f9e',
        'podem-bg': '#f3e5f5',
        mxme:    '#005448',
        'mxme-bg': '#e0f2f1',
        elpi:    '#bf5c00',
        'elpi-bg': '#fff3e0',
        saunio:  '#4527a0',
        'saunio-bg': '#ede7f6',
        // Neutres
        border:  '#ddd8d0',
        mid:     '#666672',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(12,12,18,0.07)',
        lg:   '0 8px 40px rgba(12,12,18,0.12)',
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
}
