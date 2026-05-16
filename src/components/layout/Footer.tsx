import { Link } from 'react-router-dom';
import LogoIcon from '@assets/icons/logo.svg?react';
import SocialMedia1 from '@assets/icons/social-media-1.svg?react';
import SocialMedia2 from '@assets/icons/social-media-2.svg?react';
import { Separator } from '@components/ui/separator';
import { FOOTER_SECTIONS } from '@fixtures/footer';
import FooterSection from '@components/common/section/FooterSection';

const Footer = () => {
  return (
    <footer className="bg-[#2C332D] px-8 py-16 text-[#A8B0A9] xl:px-20">
      <div className="mx-auto max-w-[1710px]">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 my-20">
          <div className="max-w-md">
            <Link to="/" className="mb-6 flex items-center gap-5">
              <div className="flex p-8 items-center justify-center rounded-full bg-accent">
                <LogoIcon className="size-20 text-white" />
              </div>

              <span className="text-3xl font-semibold tracking-tight text-white">
                Verdora
              </span>
            </Link>

            <p className="mb-8 text-base text-[#A8B0A9]">
              Your trusted online shop for premium garden products, plants, and
              modern gardening tools.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:border-accent hover:bg-accent hover:text-white p-5"
              >
                <SocialMedia2 className="size-16" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:border-accent hover:bg-accent hover:text-white p-5"
              >
                <SocialMedia1 className="size-16" />
              </a>
            </div>
          </div>
          {FOOTER_SECTIONS.map(section => (
            <FooterSection title={section.title} key={section.title}>
              <ul>
                {section.type === 'links'
                  ? section.items.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.href}
                          className="transition-colors hover:text-white"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))
                  : section.items.map((contact, index) => (
                      <li key={index}>
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className="transition-colors hover:text-white"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <span>{contact.value}</span>
                        )}
                      </li>
                    ))}
              </ul>
            </FooterSection>
          ))}
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col gap-6 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-[#7E8780]">
            © {new Date().getFullYear()} Verdora. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-8">
            <Link to="/terms" className="transition-colors hover:text-white">
              Terms & Conditions
            </Link>

            <Link to="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>

            <Link to="/cookies" className="transition-colors hover:text-white">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
