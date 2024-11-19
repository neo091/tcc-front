import { Link } from "react-router-dom";

export const SidebarLink = ({ to, text, children }) => {
  return (
    <Link to={to} className={'pl-4 flex items-center h-14 gap-3 hover:bg-violet-600 hover:pl-8 transition-all ease-in-out duration-300 '}>
      {children}
      <h2 className="max-xl:hidden max-md:inline-block">{text}</h2>
    </Link>
  );
};

export const SidebarLinkLogout = ({ handle, text, children }) => {
  return (
    <button onClick={handle} className={'pl-4 flex items-center h-14 gap-3 hover:bg-red-600 hover:pl-8 transition-all ease-in-out duration-300 absolute bottom-0 max-lg:mb-5 max-md:bottom-20 w-full'}>
      {children}
      <h2 className="max-xl:hidden">{text}</h2>
    </button>
  );
};

