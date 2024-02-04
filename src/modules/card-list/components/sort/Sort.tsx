import s from './styles.module.scss';
import classNames from "classnames";
import { SyntheticEvent } from 'react';
import { Tab} from 'modules/card-list';

interface ISortProps {
    tabs: Tab[];
    onChangeSort: (currentSort: string) => void,
    currentSort: string
}

export const Sort = ({ tabs, onChangeSort, currentSort }: ISortProps) => {
    
    const handleClickTab = (e: SyntheticEvent<HTMLAnchorElement>, tab: Tab) => {
        e.preventDefault();
        onChangeSort(tab.id)
    }

    const sortTabsRender = (tab: Tab, index: number) => (
        <a key={index}
            className={classNames(s.sort__link, { [s.sort__link_selected]: currentSort === tab.id })}
            href="#"
            onClick={(e) => handleClickTab(e, tab)}
        >
            {tab.title}
        </a>
    )

    return (
        <div className={s.sort}>
            {tabs.map(sortTabsRender)}
        </div>
    )
}
