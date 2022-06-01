import {useNavigate} from 'react-router-dom'

export function useCustomNavigate() {
  const navigate = useNavigate()

  function navigateTo(path: string) {
    navigate(path)
  }

  function navigateToAnotherDomain(path: string) {
    window.open(path, '_self')
  }

  function createHandler(path: string): () => void {
    return () => navigateTo(path)
  }

  return {
    navigateTo,
    navigateToAnotherDomain,
    createHandler,
  }
}
