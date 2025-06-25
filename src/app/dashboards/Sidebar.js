import Link from 'next/link';

const navLinks = [
  {
    name: 'Overview',
    href: '/dashboards',
    icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
      </svg>
    ),
  },
  {
    name: 'API Keys',
    href: '/dashboards',
    icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm-6 8v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      </svg>
    ),
  },
  {
    name: 'Invoices',
    href: '#',
    icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Documentation',
    href: 'https://docs.example.com',
    external: true,
    icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4h9m-9 8h9" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r flex flex-col justify-between fixed left-0 top-0 z-40 shadow-sm">
      <div>
        {/* Logo/Title */}
        <div className="flex items-center h-16 px-6 border-b">
          <span className="font-bold text-xl tracking-tight text-gray-900">Dandi <span className="text-blue-600">AI</span></span>
        </div>
        {/* Navigation */}
        <nav className="mt-6 px-2 flex-1">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-base font-medium"
                  >
                    {link.icon}
                    {link.name}
                    <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h7" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18h6m0 0v-6m0 6l-9-9" />
                    </svg>
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-base font-medium"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* User Profile */}
      <div className="p-4 border-t flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600 mr-3">
          <span>E</span>
        </div>
        <div>
          <div className="font-medium text-gray-900">Eden Marco</div>
          <div className="text-xs text-gray-500">Admin</div>
        </div>
      </div>
    </aside>
  );
} 