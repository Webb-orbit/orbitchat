import { useDispatch, useSelector } from 'react-redux'
import { hidet } from '../store/toastslice'

const Toast = () => {
    const { opned, mass, time, color, icon } = useSelector(state => state.toastslice)
    const Dispatch = useDispatch()
    let id;
    if (opned) {
        id = setTimeout(() => {
            Dispatch(hidet())
        }, time)
    }

    const closetost = () => {
        clearTimeout(id)
        Dispatch(hidet())
    }


    return opned ? (
        <div className={`fixed bottom-3 right-3 select-none z-20 flex items-center justify-between p-1 w-[30%] h-[3.5rem] rounded-md bg-neutral-100 ${color} max-sm:right-2 max-sm:top-3 max-sm:h-[3rem] max-sm:w-[90%]`}>
            <div className='flex items-center'>
                <span className='material-symbols-outlined p-2'>{icon}</span>
                <p className='inter text-[1rem] font-semibold'>{mass}</p>
            </div>
            <div>
                <button onClick={closetost} className='material-symbols-outlined p-1 rounded-full '>clear</button>
            </div>
        </div>
    ) : null
}

export default Toast