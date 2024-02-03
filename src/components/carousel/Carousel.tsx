import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./Carousel.css"
import s from "./styles.module.scss"
import { Virtual, Pagination, Navigation, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TProductResponseDto } from 'types/typesApi';
import { FC } from 'react';
import ArrowIcon from "./img/arrow.svg"
import classNames from 'classnames';

interface ICarouselProps {
    items: TProductResponseDto[],
    perView?: number,
    component: FC<any>,
    virtual?: boolean,
    title: string,
    paginationType?: "bullets" | "fraction" | "progressbar" | "custom",
    carouserlId: string,
}

export const Carousel = ({ items, perView = 4, component: Component, virtual = true, title, paginationType, carouserlId }: ICarouselProps) => {

    return (
        <div id={carouserlId}>
            <div className={s.header}>
                <h2 className={s.title}>{title}</h2>
                <div className={s.buttonWrapper}>
                    <button className={classNames(`prev-${carouserlId}`, s.button)} aria-label='Прокрутить слайдер назад'>
                        <ArrowIcon style={{ transform: "rotate(180deg)" }} />
                    </button>
                    <button className={classNames(`next-${carouserlId}`, s.button)} aria-label='Прокрутить слайдер вперед'>
                        <ArrowIcon />
                    </button>
                </div>
            </div>
            <Swiper
                modules={[Virtual, Pagination, Navigation, Mousewheel]}
                spaceBetween={50}
                slidesPerView={perView}
                virtual={virtual}
                pagination={{
                    type: paginationType,
                }}
                navigation={{
                    prevEl: `.prev-${carouserlId}`, //селектор кнопки
                    nextEl: `.next-${carouserlId}`, //селектор кнопки                    
                }}
                mousewheel
            >
                {items?.map((card, index) => (
                    <SwiperSlide key={card._id} virtualIndex={index} className={s.swiperSlide}>
                        <Component {...card} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}