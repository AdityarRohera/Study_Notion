import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Mail, MapPin, Phone } from "lucide-react";

import StudyNotionLogo from "../../assets/logos/Logo-Full-Light.png";
import { FooterLink2 } from "../../Data/footerLink";

const COMPANY_LINKS = [
  { title: "About", link: "/about" },
  { title: "Careers", link: "/about" },
  { title: "Affiliates", link: "/about" },
  { title: "Contact", link: "/contact" },
];

const SUPPORT_LINKS = [
  { title: "Help Centre", link: "/contact" },
  { title: "Community", link: "/contact" },
  { title: "Report an issue", link: "/contact" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", Icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedinIn },
  { label: "X", href: "https://x.com", Icon: FaXTwitter },
  { label: "YouTube", href: "https://youtube.com", Icon: FaYoutube },
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { title: string; link: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((item) => (
          <li key={`${title}-${item.title}`}>
            <Link
              to={item.link}
              className="text-sm text-ink-400 transition-colors duration-200 hover:text-brand-300"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  // Keep the footer scannable: show a curated slice of the large catalog lists.
  const subjectColumns = FooterLink2.map((group) => ({
    title: group.title,
    links: group.links.filter((l) => l.title !== "-").slice(0, 7),
  }));

  return (
    <footer className="relative mt-auto border-t border-ink-800 bg-ink-950">
      <div className="sn-container-wide py-14 lg:py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" aria-label="StudyNotion home" className="inline-block">
              <img
                src={StudyNotionLogo}
                alt="StudyNotion"
                className="h-8 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-400">
              StudyNotion helps learners go from first line of code to
              job-ready — with project-based courses, mentor feedback and a
              community that keeps you moving.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-ink-400">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                <a
                  href="mailto:hello@studynotion.com"
                  className="transition-colors hover:text-brand-300"
                >
                  hello@studynotion.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                <a
                  href="tel:+911800123456"
                  className="transition-colors hover:text-brand-300"
                >
                  +91 1800 123 456
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-brand-400" />
                Bengaluru, India
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink-800 text-ink-300 transition-all duration-200 hover:border-brand-400/50 hover:bg-brand-400/10 hover:text-brand-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <LinkColumn title="Company" links={COMPANY_LINKS} />
          {subjectColumns.map((group) => (
            <LinkColumn
              key={group.title}
              title={group.title}
              links={group.links}
            />
          ))}
          <LinkColumn title="Support" links={SUPPORT_LINKS} />
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="sn-container-wide flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-ink-500">
            © {year} StudyNotion. Built for learners everywhere.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-500">
            <Link to="/about" className="transition-colors hover:text-brand-300">
              Privacy Policy
            </Link>
            <Link to="/about" className="transition-colors hover:text-brand-300">
              Terms of Service
            </Link>
            <Link to="/contact" className="transition-colors hover:text-brand-300">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
