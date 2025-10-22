import { useLocation, useNavigate } from "react-router";

interface MenuItem {
    name: string;
    href: string;
    iconPath: string; // SVG path for icon
}

const menuItems: MenuItem[] = [
    { 
        name: 'Dashboard', 
        href: '/admin/v1/dashboard', 
        iconPath: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' // Home/Dashboard
    },
    { 
        name: 'FAQ', 
        href: '/admin/v1/faq', 
        iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' // Help/Question Mark
    },
    { 
        name: 'Products', 
        href: '/admin/v1/products', 
        // Changed to: Shopping Cart or Shopping Bag (better for products/inventory)
        iconPath: 'M17 18c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2zM1 2v2h3l3.6 7.59-1.35 2.44c-.16.27-.25.58-.25.91 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25 0-.05.01-.09.03-.13L8.58 13h7.43c.47 0 .87-.27 1.05-.66l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.11 0-2 .89-2 2s.89 2 2 2 2-.89 2-2-.89-2-2-2z' 
    },
    { 
        name: 'Recipes', 
        href: '/admin/v1/recipes', 
        // Changed to: Restaurant Menu or Food Icon (better for recipes/food)
        iconPath: 'M20 5v14H4V5h16zm0-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 4h3c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1zm-6 0h3c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1z' 
        // Alternate recipe icon (e.g., local_dining/restaurant_menu): 'M16 6V2H8v4H2v15h20V6h-6zm-6-2h4v2h-4V4zm-4 8h4c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1zm6 0h4c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1z'
    },
    { 
        name: 'Promos', 
        href: '/admin/v1/promos', 
        // Changed to: Restaurant Menu or Food Icon (better for recipes/food)
        iconPath: 'M20 5v14H4V5h16zm0-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 4h3c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1zm-6 0h3c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1z' 
        // Alternate recipe icon (e.g., local_dining/restaurant_menu): 'M16 6V2H8v4H2v15h20V6h-6zm-6-2h4v2h-4V4zm-4 8h4c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1zm6 0h4c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1z'
    },
];
interface AdminSidebarProps {
    isExpanded: boolean;
}

const Sidebar: React.FC<AdminSidebarProps> = ({ isExpanded }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const navigate = useNavigate();
        localStorage.removeItem("gokka_login");
        navigate("/admin/v1/login");
    }
    const currentPath = location.pathname; // Mock current path for highlighting

    const sidebarWidth = isExpanded ? 'w-64' : 'w-20';
    const transition = 'transition-all duration-300 ease-in-out';

    return (
        <aside 
            className={`${sidebarWidth} h-screen bg-gray-100 flex flex-col z-10 sticky top-0 ${transition} border-r-2 border-gray-300`}
        >
            {/* Header / Logo */}
            <div className={`flex items-center p-8 h-20 border-b-2 border-gray-300 ${isExpanded ? 'justify-start' : 'justify-center'}`}>
                {isExpanded ? (
                    <span className="text-2xl font-bold tracking-wider">Admin</span>
                ) : (
                    <svg className="w-8 h-8 text-sky-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                )}
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = item.href === currentPath;
                    return (
                        <div
                            key={item.name}
                            onClick={() => navigate(item.href)}
                            className={`flex items-center p-3 rounded-lg cursor-pointer ${transition}
                                ${isActive ? 'bg-gray-300' : 'hover:bg-gray-200'}
                            `}
                            title={item.name}
                        >
                            {/* Icon */}
                            <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d={item.iconPath}/>
                            </svg>
                            
                            {/* Label (only visible when expanded) */}
                            {isExpanded && (
                                <span className={`ml-3 whitespace-nowrap text-sm font-medium ${transition}`}>
                                    {item.name}
                                </span>
                            )}
                        </div>
                    );
                })}
            </nav>
            <div className="w-full p-5 flex justify-center">
                <div className="bg-slate-400 w-full flex justify-center py-3 rounded-2xl font-medium cursor-pointer" onClick={() =>logout()}>Logout</div>
            </div>
        </aside>
    );
};

export default Sidebar;