// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server';

const Middleware = (req: any) => {
  const obj = [
    {
      source: '/academic-excellence',
      destination: '/',
    },
    {
      source: '/meet-team',
      destination: '/',
    },
    {
      source: '/skand-bali',
      destination: '/',
    },
    {
      source: '/Moksha-Adani',
      destination: '/',
    },
    {
      source: '/ravender-koul',
      destination: '/',
    },
    {
      source: '/Pallavi-Baviskar',
      destination: '/',
    },
    {
      source: '/maushmi-mehta',
      destination: '/',
    },
    {
      source: '/Rumia-Sharma',
      destination: '/',
    },
    {
      source: '/Ekta-Yadav',
      destination: '/',
    },
    {
      source: '/Preeti-Unnithan',
      destination: '/',
    },
    {
      source: '/cheryl-shah',
      destination: '/',
    },
    {
      source: '/Divya-Chawla',
      destination: '/',
    },
    {
      source: '/Rashmi-Pathak',
      destination: '/',
    },
    {
      source: '/Prachi-Jain',
      destination: '/',
    },
    {
      source: '/Namita-Mishra',
      destination: '/',
    },
    {
      source: '/Reshma-Bhojwani',
      destination: '/',
    },
    {
      source: '/Mohsina-Sayed',
      destination: '/',
    },
    {
      source: '/Charmy-Dave',
      destination: '/',
    },
    {
      source: '/Mitali-Shah',
      destination: '/',
    },
    {
      source: '/Rajashree-Pradeep',
      destination: '/',
    },
    {
      source: '/Mrunmayee-Deoghare',
      destination: '/',
    },
    {
      source: '/Darshna-Malkani',
      destination: '/',
    },
    {
      source: '/Anjali-Karunkaran',
      destination: '/',
    },
    {
      source: '/legal',
      destination: '/terms',
    },
    {
      source: '/About-Us',
      destination: '/about-us',
    },
  ];

  const filterData = obj.filter((node) => {
    return node.source == req.nextUrl.pathname ? 1 : 0;
  });

  if (filterData[0] && filterData[0].source == req.nextUrl.pathname) {
    return NextResponse.redirect(new URL(filterData[0].destination, req.url), 301);
  }

  if (
    req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase() ||
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/assets')
  )
    return NextResponse.next();

  return NextResponse.redirect(
    req.nextUrl.origin + process.env.NEXT_PUBLIC_STAGING_LINK + req.nextUrl.pathname.toLowerCase(),
  );
};

export default Middleware;
