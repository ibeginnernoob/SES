import { useState, useCallback } from 'react'
import {
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import { useFocusEffect, useRouter } from 'expo-router'
import useConfirm from '@/store/confirm'

function Input({
    disabled,
    setDigits,
}: {
    disabled: boolean
    setDigits: (digits: string) => void
}) {
    return (
        <View className="w-full flex flex-row justify-between items-center gap-2">
            <OtpInput
                numberOfDigits={6}
                focusColor="#1DA1F2"
                onTextChange={(otp) => setDigits(otp)}
                disabled={disabled}
                theme={{ pinCodeTextStyle: inputStyles.pinCodeTextStyle }}
            />
        </View>
    )
}

const inputStyles = StyleSheet.create({
    pinCodeTextStyle: {
        color: 'white',
        fontSize: 24,
        fontWeight: '400',
    },
})

function Otp() {
    const { confirm } = useConfirm()
    const router = useRouter()

    const [digits, setDigits] = useState<string>('')

    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            return () => {
                setLoading(false)
                setDigits('')
            }
        }, []),
    )

    const handleOtpSubmit = async () => {
        try {
            if (!confirm) {
                throw new Error('Confirmation not found')
            }
            setLoading(true)
            await confirm.confirm(digits)
            router.push('/')
        } catch (e: any) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    className={`flex-1 w-[90%] flex flex-col relative ${Platform.OS === 'ios' ? 'pt-10 pb-20' : 'pt-20 pb-40'}`}
                >
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('@/assets/new-images/logo.png')}
                            className="w-52 h-52"
                        />
                    </View>
                    <Input disabled={loading} setDigits={setDigits} />
                    <View className="w-full" style={styles.bottomContainer}>
                        <TouchableOpacity
                            onPress={() => handleOtpSubmit()}
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
                            <Text style={[styles.buttonText]}>
                                {!loading ? (
                                    <Text style={[styles.buttonText]}>
                                        Continue
                                    </Text>
                                ) : (
                                    <ActivityIndicator
                                        size="small"
                                        color="#fff"
                                    />
                                )}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default Otp

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
