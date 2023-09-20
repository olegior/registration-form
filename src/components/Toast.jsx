// eslint-disable-next-line react/prop-types
export const Toast = ({ errors }) => {
    return (
        <div id="toast-warning" className="flex items-center w-full p-4 gap-4 text-gray-500 rounded-lg shadow dark:text-gray-400 border-2 border-red-600">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-600 bg-orange-200 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>
            </div>
            <div className="flex flex-col items-start overflow-y-auto max-h-32">
                {
                    Object.entries(errors)
                        .map(([name, message]) => <p key={name} className="max-sm:text-sm text-base text-start py-0.5"><span className="font-bold mr-1">{name}:</span>{message.message}</p>)
                }
            </div>
        </div>
    )
}
