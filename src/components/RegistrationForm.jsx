import { useForm } from "react-hook-form";
import { CustomInput } from "./CustomInput";
import { Toast } from "./Toast";

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      gender: 'm',
      // date: (new Date()).toISOString().slice(0,10),
      date: '1994-06-29',
    }
  });
  console.log((new Date()).toISOString().slice(0, 10));
  const rhf = { register, errors, isValid };

  const onSubmit = (data) => {
    console.log('submit', data);
    // reset();
  };

  return (
    <>
      {!!Object.keys(errors).length && <Toast errors={errors} />}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1 text-xl w-full">
        <CustomInput name={'name'} rhf={rhf} title={'Ваше имя'} />
        <CustomInput name={'email'} rhf={rhf} title={'Ваша почта'}
          options={{
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Введите корректный email',
            }
          }}
        />

        <CustomInput name={'password'} rhf={rhf} type={'password'} title={'Пароль'}
          options={{
            minLength: { value: 6, message: "Минимум 6 символов!" }
          }}
        />

        <CustomInput name={'rpassword'} title={'Повторите пароль'} rhf={rhf} type={'password'}
          options={{
            minLength: { value: 6, message: "Минимум 6 символов!" }
          }}
        />

        <CustomInput name={'date'} rhf={rhf} type={'date'} title={'Дата рождения'} />

        <p className="text-left">Пол:</p>
        <div className="flex justify-evenly border-2 p-1 mb-10 items-center rounded">
          <CustomInput name={'gender'} title={'М'} rhf={rhf} type={'radio'} value={'m'} row />
          <CustomInput name={'gender'} title={'Ж'} rhf={rhf} type={'radio'} value={'f'} row />
        </div>

        <CustomInput name={'phone'} rhf={rhf} type={'phone'} title={'Телефон'} options={{
          pattern: {
            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            message: 'Введите номер телефона'
          }
        }}
        />


        <input type="submit" disabled={!isValid}
          className={`cursor-pointer border-2 p-2 mt-2 rounded ${isValid && 'animate-pulse'}
           disabled:border-gray-500 disabled:text-gray-500
           enabled:text-green-600 enabled:border-green-600
           `} />
      </form>
    </>
  )
}
