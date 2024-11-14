export const GridContent = ({ children }) => {
    return (
        <div className="grid grid-cols-[repeat(2, 1fr)] max-xl:grid-cols-[1fr] mt-4 ">
            {children}
        </div>
    );
};
