
export const Modal = ({ setShowModal, json }) => {
    const handleShow = () => {
        setShowModal(prev => !prev);
    }
    return (
        <div className="fixed px-2 center z-50 overflow-hidden">
            <div className="w-full max-w-xs max-h-full">
                <div className="bg-yellow-50 rounded-lg shadow-xl dark:bg-slate-700">
                    <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-500">
                        <h3 className="text-xl font-medium text-green-700 dark:text-white">
                            Успешно зарегистрированы!
                        </h3>
                        <button type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={handleShow}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <p className="text-base text-justify leading-relaxed text-gray-600 dark:text-gray-200"> <span>JSON:</span> {json}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
