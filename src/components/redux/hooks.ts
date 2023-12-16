import {useDispatch,useSelector,TypedUseSelectorHook} from 'react-redux'

import { RootState,AppDispatch } from './Store'

export const useAppDispatch : ()=>AppDispatch=useDispatch
export const useAppSelecter : TypedUseSelectorHook<RootState> = useSelector