import { Dimensions, Platform, StyleSheet, Text, View, type ViewStyle } from 'react-native'
import React, { useEffect } from 'react'
import { GestureDetector } from 'react-native-gesture-handler'
import Animated, {Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'

const Toast = ({
    message,
    visible = false,
    duration = 2000,
    speed = 700,
    progress = false,
    bounce = false,
    autoDismiss = false,
    centerText = false,
    dismissGesture,
    style = {},
    dismiss
}: {
    message: string,
    visible: boolean,
    duration?: number,
    speed?: number,
    progress?: boolean,
    bounce?: boolean,
    autoDismiss?: boolean,
    centerText?: boolean,
    dismissGesture: any,
    style?: ViewStyle,
    dismiss: () => void
}) => {
    const initialToastPosition = -Dimensions.get('window').height
    const toastVisiblePosition = -300
    const progressValue = useSharedValue(Dimensions.get('window').width)
    const topValue = useSharedValue(initialToastPosition)

    let hideToastTimeout: NodeJS.Timeout

    const dismissToast = () => {
        topValue.value = withTiming(initialToastPosition, {
            duration: 400
        })
        dismiss()
    }

    useEffect(() => {
        if (visible) {
            console.log("Bounce is", bounce)
            topValue.value = initialToastPosition
            animateProgressBar()
            if (bounce) {
                topValue.value = withSpring(toastVisiblePosition, {
                    mass: .7,
                    damping: 10,
                    stiffness: 100,
                    overshootClamping: false,
                    restDisplacementThreshold: 0.01,
                    restSpeedThreshold: 2
                })
            } else {
                topValue.value = withTiming(toastVisiblePosition, {
                    duration: speed,
                    easing: Easing.linear
                })
            }

            hideToastTimeout = setTimeout(() => {
                if (autoDismiss) {
                    dismissToast()
                }
            }, duration + 1800);
        } else {
            dismissToast()
        }

        return () => {
            clearTimeout(hideToastTimeout)
        }
    }, [visible])

    const animateProgressBar = () => {
        progressValue.value = Dimensions.get('window').width
        progressValue.value = withTiming(0, {
            duration: duration + 2000,
        })
    }

    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: topValue.value
                }
            ]
        }
    })

    const animatedProgressBar = useAnimatedStyle(() => {
        return {
            width: progressValue.value
        }
    })

    return (
        <Animated.View
            style={[styles.container, {
                top: 0,
            }, animatedContainerStyle, style]}
        >
            <GestureDetector
                gesture={dismissGesture}
            >
                <View>
                    <View
                    style={{
                        padding: 15,
                        paddingTop: Platform.OS == 'ios' ? 370 : 320,
                    }}
                >
                    <Text style={{color: '#FFF', textAlign: centerText ? 'center' : 'left'}}>
                        {message}
                    </Text>
                </View>
                {
                    progress && (
                        <View
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, .2)',
                                height: 6,
                                alignItems: 'flex-start'
                            }}
                        >
                            <Animated.View
                                style={[{
                                    backgroundColor: 'rgba(0, 0, 0, .2)',
                                    flex: 1,
                                }, animatedProgressBar]}
                            ></Animated.View>
                        </View>
                    )
                }
                </View>
            </GestureDetector>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10000000000,
        width: Dimensions.get('window').width,
    }
})

export default Toast
