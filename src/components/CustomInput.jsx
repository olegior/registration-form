/* eslint-disable react/prop-types */
export const CustomInput = ({ name, title, type, autoComplete, options, rhf: { register, errors, isValid } }) => {
    // const { register, errors, isValid } = rhf;
    // console.log(rhf);
    return (
        <>
            <label className="flex flex-col text-left gap-2">
                <span>{title || name}:</span>
                <input
                    className="text-center p-2"
                    type={type}
                    // autoComplete={'on' || autoComplete}

                    //react-hook-form
                    {...register(name, {
                        required: 'Поле обязателно к заполнению!',
                        ...options,
                    })}
                />
            </label>
            <div className="min-h-[36px] text-lg text-red-600">
                {errors?.[name] && <p className="min-h-full">{errors?.[name].message}</p>}
            </div>
        </>
    )
}
