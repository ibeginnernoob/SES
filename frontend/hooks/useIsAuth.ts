import { useState, useEffect } from 'react'
import { auth } from '@/firebaseConfig.js'

import { onAuthStateChanged} from "firebase/auth";

export const useIsAuth = () => {
    const [loading, setLoading]=useState(false)
    const [userId, setUserId]=useState<string | null>('no userId')

    useEffect(() => {
        setLoading(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid)
            }
            else {
                setUserId(null)
            }
        });
        setLoading(false)
    }, [])

    return {
        loading,
        userId
    }
}