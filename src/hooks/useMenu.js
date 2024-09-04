import { useEffect, useRef, useState } from "react";

export function useMenu({ userMenuRef }) {
    const [userMenu, setUserMenu] = useState(false)

    const onClickHandler = (e) => {
        console.log('click', e.target)
        const includesPopoverElement = e.composedPath().includes(userMenuRef.current);
        if (userMenuRef.current && !includesPopoverElement) {
            setUserMenu(false);
        }
    }

    const toggleMenu = () => {
        setUserMenu(!userMenu)
    }

    useEffect(() => {

        document.body.addEventListener('click', onClickHandler);
        return () => {
            document.body.removeEventListener('click', onClickHandler);
        }
    }, [])

    return { userMenu, toggleMenu }
}