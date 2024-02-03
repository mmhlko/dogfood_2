import { TReviewResponseDto } from "types/typesApi";
import s from "./styles.module.scss"
import { formattedDate } from "utils/products";
import { Rating } from "components/rating/Rating";

export const Review = ({ author, text, city, created_at, rating }: TReviewResponseDto) => {
    return (
        <>
            <div className={s.review}>
                <div className={s.review__header}>
                    <div className={s.review__name}>{author.name}</div>
                    <div className={s.review__date}>{formattedDate(created_at)}</div>
                </div>
                <Rating currentRating={rating} />
                {city && <div className={s.review__city}>{city}</div>}
                <p className={s.review__text}>{text}</p>
            </div>
        </>
    );
}