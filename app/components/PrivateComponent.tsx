import { useAuth } from '../hooks/useAuth'
interface Props {
  children: JSX.Element
}

const PrivateComponent = ({ children }: Props) => {
  //show only if user is logged in
  const user = useAuth()
  if (user) {
    return children
  }
  return null
}

export default PrivateComponent
