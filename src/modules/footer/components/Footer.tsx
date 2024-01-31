import './styles.scss';
import { Logo } from "components/logo/Logo";
import { TMenuLink, TSocialLink, menuLisksCol1, menuLisksCol2, socialLinks } from '../constants/constants';

export const Footer = () => {
    const menuLinkRender = (item: TMenuLink, index: number) => <a href={item.href} className="menu-bottom__item" key={index}>{item.name}</a>;
    const menuListrender = (list: TMenuLink[]) => <nav className="menu-bottom">{list.map(menuLinkRender)}</nav>;
    
    const socialLinksRender = (list: TSocialLink[]) => {
        return (
            <ul className="socials contacts__socials">
                {list.map((item, index) => (
                    <li className="socials__item" key={index}>
                        <a className="socials__link" href={item.href}>
                            {item.icon}                      
                        </a>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__wrapper">
                    <div className="footer__col">
                        <Logo /* className="logo footer__logo" title="Логотип" aria-hidden={true} */ />
                        <p className="footer__copyright">
                            © «Интернет-магазин DogFood.ru»
                        </p>
                    </div>
                    <div className="footer__col">
                        {menuListrender(menuLisksCol1)}
                    </div>
                    <div className="footer__col">
                        {menuListrender(menuLisksCol2)}
                    </div>
                    <div className="footer__col">
                        <div className="contacts">
                            <p className="contacts__title">Мы на связи</p>
                            <a className="contacts__tel contacts__link" href="tel:8999000000">
                                8 (999) 00-00-00
                            </a>
                            <a className="contacts__mail contacts__link" href="mailto:hordog.ru@gmail.com">
                                dogfood.ru@gmail.com
                            </a>
                            {socialLinksRender(socialLinks)}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};