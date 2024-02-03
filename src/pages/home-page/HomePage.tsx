import classNames from "classnames"
import CategoryMenu from "components/category-menu/CategoryMenu"
import Hero from "components/hero/Hero"
import s from './styles.module.scss';
import { Banner, BannerSize } from "components/banner/Banner";
import imageGift from './images/gift.png';
import imageSets from './images/set.png';
import imageMix from './images/mix.png';
import imageTurkey from './images/turkey.png';
import imageHorns from './images/horns.png';
import { Card } from "modules/card-list";
import { useAppSelector } from "storage/hookTypes";
import { Carousel } from "components/carousel/Carousel";

const HomePage = () => {

    const cards = useAppSelector(state => state.products.data)

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
                <Carousel title="Хиты" component={Card} items={cards.slice(0, 10)} carouserlId="hits"/>
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
                <Carousel items={cards.slice(10, 20)} perView={4} component={Card} title={'Лакомства'} carouserlId="delicacy" />
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
                <Carousel items={cards.slice(20, 30)} perView={4} component={Card} title={'Недавно смотрели'} carouserlId="recent" />
            </div>
        </>
    )
}

export default HomePage