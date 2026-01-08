/**
 * Unstyled Link
 */

import DefaultLink from 'next/link';
import { ComponentProps } from 'react';

interface LinkProps extends ComponentProps<typeof DefaultLink> {
  href: string;
  external?: boolean;
}

export function Link(
  { href, external, children, ...props }: LinkProps,
) {
  // If external, use a standard anchor tag
  if (external) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        {...props}
      >
        {children}
      </a>
    );
  }

  // If internal, use Next.js Link for client-side navigation
  return (
    <DefaultLink href={href} {...props}>
      {children}
    </DefaultLink>
  );
}