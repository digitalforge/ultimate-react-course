import { useEffect } from 'react'

export function useKey(keyPressed, callback) {
  useEffect(() => {
    function callBack(e) {
      if (e.code.toLowerCase() === keyPressed.toLowerCase()) {
        callback()
        console.log('useKey was fired. Well done.')
      }
    }
    document.addEventListener('keydown', callBack)

    return () => document.removeEventListener('keydown', callBack)
  }, [callback, keyPressed])
}
