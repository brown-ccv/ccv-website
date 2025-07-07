import Link, { LinkProps } from 'next/link';
import React from 'react';

type ExternalLinkProps = React.PropsWithChildren<{
  external?: boolean;
  className?: string;
}> & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & Omit<LinkProps, 'href'> & {
  href: string;
};

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  external = false,
  href,
  children,
  className = '',
  ...props
}) => {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
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