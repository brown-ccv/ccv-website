import Link, { LinkProps } from 'next/link';
import React from 'react';

type ExternalLinkProps = React.PropsWithChildren<{
  external?: boolean;
  className?: string;
}> & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & Omit<LinkProps, 'href'> & {
  href: string;
};

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  external = true,
  href,
  children,
  className = '',
  ...props
}) => {
  // Default keppel styling for external links
  const defaultClass = "text-keppel-700 hover:text-keppel-500 underline";
  const combinedClass = external
    ? className
      ? `${defaultClass} ${className}`
      : defaultClass
    : className;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClass}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
};

export default ExternalLink; 