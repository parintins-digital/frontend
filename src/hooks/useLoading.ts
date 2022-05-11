import {useContext} from 'react'
import {ToastContext} from '../contexts/Toast'

export function useLoading<A extends (...args: any[]) => Promise<any>>(
  fn: A,
  message = 'Carregando. Aguarde um momento...',
  close = true
): A {
  const {showToast, closeToast} = useContext(ToastContext)

  return async function (...args: any[]): Promise<any> {
    showToast(message, 'awaiting')
    return fn(...args).finally(() => {
      if (close) closeToast()
    })
  } as A
}
