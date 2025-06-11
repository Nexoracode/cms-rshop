import Link from "next/link";

type TextLink = {
  text: string;
  link: string;
  textLink: string;
};

const TextLink = ({ link, text, textLink }: TextLink) => {
  return (
    <div className="mt-4 text-center">
      <span className="text-[var(--gray)]">{text}</span>
      <Link href={link} className="underline text-[var(--primary)]">{textLink}</Link>
    </div>
  );
};

export default TextLink;
