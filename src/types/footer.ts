export type FooterLink = {
  name: string;
  href: string;
};

export type ContactDetail = {
  type: 'phone' | 'email' | 'address';
  value: string;
  href?: string;
};

export type FooterSection =
  | {
      title: string;
      type: 'links';
      items: FooterLink[];
    }
  | {
      title: string;
      type: 'contact';
      items: ContactDetail[];
    };
