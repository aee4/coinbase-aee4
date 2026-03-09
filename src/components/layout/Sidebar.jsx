import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="w-64 border-r border-gray-200 hidden md:block h-full p-4">
            <nav className="flex flex-col space-y-2">
                <Link to="/" className="p-2 rounded hover:bg-gray-100 text-gray-700 font-medium">Home</Link>
                <Link to="/explore" className="p-2 rounded hover:bg-gray-100 text-gray-700 font-medium">Explore</Link>
                <Link to="/learn" className="p-2 rounded hover:bg-gray-100 text-gray-700 font-medium">Learn</Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
