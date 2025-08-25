import Image from "next/image";
import Link from "next/link";

import GHAS from "@/public/images/certifications/ghas.png";
import AI102 from "@/public/images/certifications/ai-102.svg";

const certs = [
  {
    image: GHAS,
    alt: "GitHUB Advanced Security",
    link: "https://www.credly.com/badges/c0a6736d-3b56-4b17-be20-ca2c2bf10927/public_url",
  },
  {
    image: AI102,
    alt: "Azure AI Engineer Associate",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/madusha/6929E4841E790DDB?sharingId=D5F24605DD88E710",
  }
];

export default function Certifications() {
  return (
    <div className="flex">
      {certs.map(({ image, alt, link }) => (
        <Link key={alt} href={link}>
          <Image
            src={image}
            alt="GHAS"
            width={64}
            height={64}
            className="hover:bg-muted inline-block h-16 w-16 rounded-2xl p-1"
          />
        </Link>
      ))}
    </div>
  );
}
