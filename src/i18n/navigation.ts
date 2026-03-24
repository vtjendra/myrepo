import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// Re-export for components that need untyped navigation
// (dynamic paths not in the routing config)
export { useRouter as useTypedRouter };
