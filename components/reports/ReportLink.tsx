import Link from "next/link";

export function ReportLink({
  href,
  title,
  customStyle,
}: {
  href: string;
  title: string;
  customStyle: string;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-xl transition ${customStyle}`}
    >
      {title}
    </Link>
  );
}
