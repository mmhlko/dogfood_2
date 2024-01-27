
import LogoSrc from './assets/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { SyntheticEvent } from 'react';

export const Logo = () => {

    const location = useLocation();
    const handleClick = (e: SyntheticEvent<HTMLAnchorElement>) => {
        
        if (location.pathname === "/") {
            e.preventDefault();
        }
    };

    return (
        <Link to={"/"} onClick={handleClick}>
            <LogoSrc />
        </Link>
    );
};
