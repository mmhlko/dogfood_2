import classNames from "classnames"
import CategoryMenu from "components/category-menu/CategoryMenu"
import Hero from "components/hero/Hero"
import s from './styles.module.scss';
import Banner, { BannerSize } from "components/banner/Banner";
import imageGift from './images/gift.png';
import imageSets from './images/set.png';
import imageMix from './images/mix.png';
import imageTurkey from './images/turkey.png';
import imageHorns from './images/horns.png';
import Carousel from "components/carousel";

const HomePage = () => {
    return (
        <>
            <Hero />
            <div className={classNames("content container", s.mainPage)}>
                <CategoryMenu extraClass="home" />
                <Banner
                    size={BannerSize.big}
                    subtitle="Легкое говяжье - пластины"
                    title="Подарок за первый заказ"
                    colorBg="#FF8F27"
                    bg={imageGift}
                />                
                <div className={s.banner_wrapper}>
                    <Banner
                        size={BannerSize.middle}
                        title="Наборы"
                        subtitle="для дрессировки"
                        colorBg="#D8A217"
                        price='от 840 ₽'
                        bg={imageSets} />
                    <Banner
                        size={BannerSize.middle}
                        title='Микс масел'
                        subtitle='пищевая здоровая натуральная добавка'
                        colorBg='#24B5BE'
                        bg={imageMix} />
                </div>
                <div className={s.banner_wrapper}>
                    <Banner
                        size={BannerSize.middle}
                        title='Рога северного оленя'
                        subtitle='от 10 до 30 кг.'
                        colorBg='#9CCD55'
                        bg={imageHorns} />
                    <Banner
                        size={BannerSize.middle}
                        title='Слипы из шеи индейки'
                        subtitle='100 % натуральное'
                        colorBg='#DB6825'
                        bg={imageTurkey} />
                </div>
                <Banner
                    size={BannerSize.big}
                    subtitle="Легкое говяжье - пластины"
                    title="Подарок за первый заказ"
                    colorBg="#FF8F27"
                    bg={imageGift}
                />
            </div>

        </>
    )
}

export default HomePage