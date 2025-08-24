import { useState, useCallback, useEffect } from 'react'
import {
    View,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from 'react-native'
import { useRouter, usePathname } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'
import { phoneSignIn } from '@/utils/auth/phoneSignIn'
import Feather from '@expo/vector-icons/Feather'
import AntDesign from '@expo/vector-icons/AntDesign'
import useConfirm from '@/store/confirm'

function Signin() {
    const pathname = usePathname()
    const router = useRouter()
    const { updateConfirm } = useConfirm()

    const [loading, setLoading] = useState(false)
    const [activeInput, setActiveInput] = useState<string>('')

    const [mobile, setMobile] = useState<string>('')

    useFocusEffect(
        useCallback(() => {
            return () => {
                setLoading(false)
                setMobile('')
            }
        }, []),
    )

    useEffect(() => {
        if (pathname === '/firebaseauth/link') {
            router.back()
        }
    }, [pathname])

    const handlePhoneSignIn = async () => {
        try {
            if (mobile.length !== 10) {
                return
            }
            const confirmation = await phoneSignIn(mobile)
            if (confirmation) {
                updateConfirm(confirmation)
                router.push('/otp')
            }
        } catch (e: any) {
            alert('Something went wrong')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    className={`flex-1 w-[90%] flex flex-col relative justify-center ${Platform.OS === 'ios' ? 'pt-10' : 'pt-20'}`}
                >
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('@/assets/new-images/logo.png')}
                            className="w-52 h-52"
                        />
                    </View>
                    <View
                        className={`flex-1 flex flex-col gap-10 ${Platform.OS === 'ios' ? 'pb-10' : 'pb-20'}`}
                    >
                        <View style={styles.inputContainer}>
                            <Feather
                                name="phone"
                                size={18}
                                color={
                                    activeInput === 'phone' ? '#1DA1F2' : 'gray'
                                }
                                className="absolute z-10 left-5 top-2.5"
                            />
                            <Text style={styles.phoneCountryCode}>+91</Text>
                            <TextInput
                                keyboardType="numeric"
                                maxLength={10}
                                value={mobile}
                                onChangeText={setMobile}
                                style={[
                                    styles.phoneInput,
                                    {
                                        borderColor:
                                            activeInput === 'phone'
                                                ? '#1DA1F2'
                                                : 'gray',
                                    },
                                ]}
                                placeholder="Enter your phone number"
                                placeholderTextColor={'gray'}
                                onFocus={() => {
                                    setActiveInput('phone')
                                }}
                                onBlur={() => {
                                    setActiveInput('')
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={async () => {
                                await handlePhoneSignIn()
                            }}
                            style={[
                                styles.button,
                                {
                                    backgroundColor: !loading
                                        ? '#1DA1F2'
                                        : 'gray',
                                },
                            ]}
                            disabled={loading}
                        >
                            {!loading ? (
                                <Text style={[styles.buttonText]}>
                                    Generate OTP
                                </Text>
                            ) : (
                                <ActivityIndicator size="small" color="#fff" />
                            )}
                        </TouchableOpacity>

                        <View className="w-full" style={styles.bottomContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: !loading
                                            ? '#1DA1F2'
                                            : 'gray',
                                    },
                                ]}
                                className="flex flex-row items-center justify-center gap-6"
                                disabled={loading}
                            >
                                <AntDesign
                                    name="google"
                                    size={22}
                                    color="white"
                                />
                                <Text style={[styles.buttonText]}>
                                    Login with Google
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default Signin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginHorizontal: 'auto',
        marginBottom: 40,
    },
    inputContainer: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
    },
    phoneCountryCode: {
        position: 'absolute',
        left: 47.5,
        top: 8,
        fontSize: 16,
        color: 'black',
    },
    phoneInput: {
        width: '100%',
        borderRadius: 5,
        paddingLeft: 80,
        paddingRight: 40,
        paddingVertical: 8,
        color: 'black',
        borderBottomWidth: 1,
        fontSize: 16,
    },
    button: {
        width: '100%',
        backgroundColor: '#1DA1F2',
        paddingVertical: 14,
        borderRadius: 6,
    },
    buttonText: {
        color: 'white',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 16,
    },
    bottomContainer: {
        marginTop: 'auto',
    },
})
