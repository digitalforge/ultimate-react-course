import { BiError } from 'react-icons/bi'

export default function ErrorMessage({ message }) {
  return (
    <p className='error'>
      <BiError /> &nbsp;{message}
    </p>
  )
}
