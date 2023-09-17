import { useForm } from "react-hook-form";
import { CustomInput } from "./CustomInput";

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const rhf = { register, errors, isValid };

  const onSubmit = (data) => {
    console.log('submit', data)
    reset()
  };
  console.log('errors', errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 text-2xl min-w-full">

        <CustomInput
          name={'name'}
          rhf={rhf}
          options={{
          }}
        />

        <CustomInput
          name={'email'}
          rhf={rhf}
          options={{
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Введите корректный email',
            }
          }}
        />

        <CustomInput
          name={'password'}
          rhf={rhf}
          type={'password'}
          options={{
            minLength: { value: 6, message: "Минимум 6 символов!" }
          }}
        />
        <CustomInput
          name={'repeatPassword'}
          title={'repeat password'}
          rhf={rhf}
          type={'password'}
          options={{
            minLength: { value: 6, message: "Минимум 6 символов!" }
          }}
        />

        <CustomInput
          name={'date'}
          rhf={rhf}
          type={'date'}
          options={{
            // minLength: { value: 6, message: "Минимум 6 символов!" }
          }}
        />

        <div className="flex justify-between">
          <CustomInput
            name={'gender'}
            title={'male'}
            rhf={rhf}
            type={'radio'}
            options={{
            }}
          />
          <CustomInput
            name={'gender'}
            title={'female'}
            rhf={rhf}
            type={'radio'}
            options={{
            }}
          />
        </div>

        <CustomInput
          name={'phone'}
          rhf={rhf}
          type={'phone'}
          options={{
            // minLength: { value: 6, message: "Минимум 6 символов!" }
          }}
        />

        <input type="submit" disabled={!isValid}
          className={'cursor-pointer border-2 p-2 disabled:border-slate-600 disabled:text-slate-600 enabled:text-green-500 enabled:border-green-500'} />
      </form>
    </>
  )
}
