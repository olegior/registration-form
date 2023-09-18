/* eslint-disable react/prop-types */
export const CustomInput = ({ name, title, type, options, value, rhf: { register, errors, isValid }, row }) => {
    // console.log(errors[name] ?? name);
    return (
        <div>
            <label className={`flex ${row ? 'flex-row' : 'flex-col'} text-left gap-1`}>
                <span>{title || name}:</span>
                <input
                    className={`text-center p-1 border-2 rounded w-full ${errors[name] && 'border-red-600 animate-pulse '}`}
                    type={type || 'text'} value={value}

                    //react-hook-form
                    {...register(name, {
                        required: 'Поле обязателно к заполнению!',
                        ...options,
                    })}
                />
            </label>
            {!(type === 'radio') && <div className="min-h-[36px] text-base text-red-600">
                {errors?.[name] && <p className="min-h-full">{errors?.[name].message}</p>}
            </div>}
        </div>
    )
}
