
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import s from './styles.module.css'
import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from 'storage/hookTypes';
import { UserReviewBodyDto } from 'types/products';
import Form from 'components/form/Form';
import { FormInput } from 'components/form-input/FormInput';
import FormButton from 'modules/auth-form/components/form-button';
import { Rating } from 'components/rating/Rating';
import { fetchCreateReview } from 'modules/product/store/productSlice';

interface IFormReviewProps {
    title: string,
    productId: string,
}

type TFormValues = {
    text: string;
    rating: number;
} 

export const FormReview = ({title = 'Отзыв о товаре', productId}: IFormReviewProps) => {
    const dispatch = useAppDispatch();
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<UserReviewBodyDto>({mode: 'onBlur'}); //типизируем useForm на то что он принимает данные из отзыва UserReviewBodyDto
    //const [rating, setRating] = useState(5);

    const handleSubmitForm:SubmitHandler<UserReviewBodyDto> = (data) => {
        
        dispatch(fetchCreateReview({productId, data}))
        reset(); //очищает форму после submit
        //setRating(5)
    }

    const textRegister = register('text', {
        required: {
            value: true,
            message: "Обязательное поле"
        }
    })   
    
    return ( 
        <>
        <h2>{title}</h2>
        <Controller
                render={({ field: {value, onChange} }) => (
                    <Rating currentRating={value} setCurrentRating={onChange} isEditable error={errors.rating} />
                )}
                name="rating"
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'Укажите рейтинг'
                    }
                }}
            />
        {/* <Rating currentRating={rating} setCurrentRating={setRating} isEditable /> */}
        <Form handleForm={handleSubmit(handleSubmitForm)}>
            
            <FormInput 
                {...textRegister}
                typeTag='textarea'
                id='text'
                placeholder='Напишите текст отзыва'
                
            />
            {errors?.text && <p className='errorMessage'>{errors.text.message}</p>}
                        
            <FormButton type='submit' color='primary'>Отправить отзыв</FormButton>
        </Form>
        

        </>
        
     );
}

export default FormReview;