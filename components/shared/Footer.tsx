import { SiFacebook, SiGithub, SiLinkedin, SiX } from "react-icons/si";
import Link from "next/link";
import { HTMLProps } from "react";
import { IconBaseProps } from "react-icons/lib";

const navigation = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/madusha.kv",
    icon: (props: IconBaseProps) => <SiFacebook {...props} />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/_MadushaS",
    icon: (props: IconBaseProps) => <SiX {...props} />,
  },
  {
    name: "GitHub",
    href: "https://github.com/MadushaS",
    icon: (props: IconBaseProps) => <SiGithub {...props} />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/madushasandaruwan/",
    icon: (props: IconBaseProps) => <SiLinkedin {...props} />,
  },
];

const year = new Date().getFullYear().toString();

export default function Footer(props: Readonly<HTMLProps<HTMLDivElement>>) {
  return (
    <footer className="bg-card mt-8" {...props}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-card-foreground hover:text-accent-foreground transform rounded-full p-2 transition duration-100 hover:scale-110 hover:bg-slate-200 dark:hover:bg-slate-700"
              target="_blank"
              aria-label={item.name}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-card-foreground text-center text-base">
            &copy; {year} Madusha Sandaruwan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
