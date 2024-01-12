import s from './styles.module.scss'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import IconCat1 from './img/ic-cat-01.svg';
import IconCat2 from './img/ic-cat-02.svg';
import IconCat3 from './img/ic-cat-03.svg';
import IconCat4 from './img/ic-cat-04.svg';
import IconCat5 from './img/ic-cat-05.svg';
import IconCat6 from './img/ic-cat-06.svg';

const dataCategory = [
    {
        title: "Наборы",
        icon: <IconCat1 />,
        link: "/catalog",
    },
    {
        title: "Лакомства",
        icon: <IconCat2 />,
        link: "/catalog",
    },
    {
        title: "Аксессуары",
        icon: <IconCat3 />,
        link: "/catalog",
    },
    {
        title: "Игрушки",
        icon: <IconCat4 />,
        link: "/catalog",
    },
    {
        title: "Рога",
        icon: <IconCat5 />,
        link: "/catalog",
    },
    {
        title: "Масла",
        icon: <IconCat6 />,
        link: "/catalog",
    }
]

interface CategoryMenuProps {
    extraClass: string
}

function CategoryMenu({extraClass}:CategoryMenuProps) {
    return ( 
        <div className={classNames(s.box, s.menu, {[s[extraClass]]: extraClass})}>
            <ul className={s.list}>
                {dataCategory.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link to={"/catalog"} className={s.item}>
                                {item.icon}
                                <span className={s.title}>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
     );
}

export default CategoryMenu;

