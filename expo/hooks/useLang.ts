import { usePathname } from 'expo-router';


export const useLang = (): string => {
  const pathname = usePathname();

  const pathnameSegments = pathname.split('/');
  const lang = pathnameSegments[1];

  return lang;
};
