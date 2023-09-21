import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CustomInput } from './CustomInput';
import { Toast } from './Toast';
import * as yup from 'yup';
import "yup-phone-lite";
import { Modal } from './Modal';

const useYupValidationResolver = validationSchema =>
  useCallback(
    async data => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message
              }
            }),
            {}
          )
        };
      }
    },
    [validationSchema]
  );

const validationSchema = yup.object(
  {
    name: yup.string().required('Введите имя'),
    email: yup.string().required('Введите почту').email('Введите корректную почту').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Введите корректную почту'),
    password: yup.string().required('Введите пароль').min(6, 'Минимум 6 символов').matches(/[A-Z]/, 'Минимум одна заглавная латинская буква')
    // .oneOf([yup.ref('cpassword'), null], 'Пароли не совпадают')
    ,
    cpassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
    date: yup.date().required('Введите дату').min(new Date('1900-01-01'), 'Укажите корректную дату').max(new Date(), 'Укажите корректную дату'),
    phone: yup.string().phone('BY', 'Введите корректный номер').required('Введите номер телефона'),
    gender: yup.string().required('Укажите пол')
  }
);

export const RegistrationForm = () => {

  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      gender: 'm',
      date: (new Date(Date.now() - 567648e6)).toISOString().slice(0, 10),
    },
    resolver
  });

  const [showModal, setShowModal] = useState(false);
  const [json, setjson] = useState('')

  const rhf = { register, errors, showModal };

  const onSubmit = (data) => {
    setShowModal(true);
    setjson(JSON.stringify(data, (key, value) => key === 'date' ? value.slice(0, 10) : value, '\t'));
    reset();
  };

  return (
    <>
      {showModal && <Modal setShowModal={setShowModal} json={json} />}
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-1 text-lg w-full min-w-[16rem]`}>
        <CustomInput name={'name'} rhf={rhf} title={'Ваше имя'} />
        <CustomInput name={'email'} rhf={rhf} title={'Ваша почта'} />
        <CustomInput name={'password'} rhf={rhf} type={'password'} title={'Пароль'} />
        <CustomInput name={'cpassword'} title={'Повторите пароль'} rhf={rhf} type={'password'} />
        <CustomInput name={'date'} rhf={rhf} type={'date'} title={'Дата рождения'} />
        <p className='text-left'>Пол:</p>
        <div className='flex justify-evenly border-2 p-1 items-center rounded'>
          <CustomInput name={'gender'} title={'М'} rhf={rhf} type={'radio'} value={'m'} row />
          <CustomInput name={'gender'} title={'Ж'} rhf={rhf} type={'radio'} value={'f'} row />
        </div>
        <CustomInput name={'phone'} rhf={rhf} type={'phone'} title={'Телефон'} />
        <input type='submit' disabled={!isValid} value={'Зарегестрироваться'}
        // hover:animate-pulse
          className={`cursor-pointer border-2 p-2 mt-5 rounded ${isValid && ' dark:hover:bg-gray-700 hover:bg-green-200'} 
           disabled:border-gray-400 disabled:text-gray-400 
           enabled:text-green-900 enabled:border-green-800
           dark:enabled:text-white `} />
        <div className='min-h-[10rem] max-h-40 mt-5'>
          {!!Object.keys(errors).length && <Toast errors={errors} />}
        </div>
      </form>
    </>
  )
}
