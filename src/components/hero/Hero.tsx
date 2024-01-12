import s from './styles.module.scss';
import classNames from 'classnames';
import ArrowIcon from './images/arrow.svg';
import BannerBg from './images/banner.png';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonVariant } from 'ui/button/Button';
import { RoutePath } from 'pages/routeConfig';

const Hero = () => {
    
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(RoutePath.products)
    }
    return ( 
        <div className={s.banner}>
            <div className={classNames('container', s.container)} style={{backgroundImage: `url(${BannerBg})`}}>                
                <h1 className={s.title}>Крафтовое лакоство для собак</h1>
                <p className={s.subtitle}>Всегда свежее лакомство ручной работы с доствкой по России и миру</p>
                <Button
                    variant={ButtonVariant.light} 
                    href={RoutePath.products} 
                    extraClass={'button_type_box'}
                    action={handleButtonClick}
                >
                    Каталог
                    <ArrowIcon className={s.link}/>
                </Button>
            </div>
        </div>
     );
}

export default Hero;

