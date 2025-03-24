import { useState, useEffect } from 'react'
import { auth } from '@/firebaseConfig.js'
import { onAuthStateChanged } from 'firebase/auth'

export const useIsAuth = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [userId, setUserId] = useState<string | null>(null)
    const [email, setEmail] = useState<string>('')

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid)
				if (user.email) {					
					setEmail(user.email)
				}                
            } else {
                setUserId('NA')
            }
            setLoading(false)
        })

        // understand why and how this works
        return () => unsubscribe()
    }, [])

    return {
        loading,
        userId,
        email,
    }
}
