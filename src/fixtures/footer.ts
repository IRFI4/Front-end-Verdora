import type { FooterSection } from '@/types/footer';

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Company',
    type: 'links',
    items: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Press', href: '/press' },
    ],
  },

  {
    title: 'Support',
    type: 'links',
    items: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Status', href: '/status' },
      { name: 'FAQs', href: '/faqs' },
    ],
  },

  {
    title: 'Contact',
    type: 'contact',
    items: [
      {
        type: 'phone',
        value: '+49 999 999 99 99',
        href: 'tel:+49999999999',
      },
      {
        type: 'email',
        value: 'support@verdora.com',
        href: 'mailto:support@verdora.com',
      },
      {
        type: 'address',
        value: 'Linkstraße 2, 8 OG, 10785 Berlin, Deutschland',
        href: 'https://maps.google.com/?q=Linkstraße+2,+10785+Berlin,+Deutschland',
      },
    ],
  },
];
