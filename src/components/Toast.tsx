import { Dimensions, Image, StyleSheet, Text, View, type ViewStyle, type ImageSourcePropType } from 'react-native'
import React, { useEffect } from 'react'
import { GestureDetector } from 'react-native-gesture-handler'
import Animated, {Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated'

const Toast = ({
    message,
    visible = false,
    duration = 2000,
    speed = 300,
    progress = false,
    bounce = false,
    autoDismiss = false,
    centerText = false,
    dismissGesture,
    icon = undefined,
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
    icon?: ImageSourcePropType,
    dismissGesture: any,
    style?: ViewStyle | undefined | ViewStyle[],
    dismiss: () => void
}) => {
    const initialToastPosition = -Dimensions.get('window').height
    const toastVisiblePosition = 0
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
        progressValue.value = Dimensions.get('window').width - 20
        progressValue.value = withTiming(0, {
            duration: duration + 2000,
        })
    }

    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: topValue.value,
                }
            ],
        }
    })

    const animatedProgressBar = useAnimatedStyle(() => {
        return {
            width: progressValue.value
        }
    })

    const Icon = () => {
        if (!icon) {
            return null
        }

        return (
            <View
                style={{
                    height: 25,
                    width: 25,
                    borderRadius: 100,
                    backgroundColor: 'rgba(0, 0, 0, .1)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={icon}
                    style={{
                        width: 14,
                        height: 14,
                    }}
                    resizeMode={'contain'}
                />
            </View>
        )
    }

    return (
        <Animated.View
            style={[styles.container, {
                top: 0,
                maxHeight: Dimensions.get('window').height - 20
            }, animatedContainerStyle, style]}
        >
            <GestureDetector
                gesture={dismissGesture}
            >
                <View>
                    <View
                        style={{
                            padding: 10,
                            minHeight: 45,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5
                        }}
                    >
                        <Icon />
                        <Text
                            style={{
                                color: '#FFF',
                                textAlign: centerText ? 'center' : 'left',
                                flex: 1
                            }}
                        >
                            {message}
                        </Text>
                    </View>
                    {
                        progress && (
                            <View
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, .2)',
                                    height: 6,
                                    alignItems: 'flex-start',
                                    borderRadius: 5
                                }}
                            >
                                <Animated.View
                                    style={[{
                                        backgroundColor: 'rgba(0, 0, 0, .2)',
                                        flex: 1,
                                        borderRadius: 5
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
        width: Dimensions.get('window').width - 20,
        marginHorizontal: 10,
        marginTop: 15,
        borderRadius: 5
    }
})

export default Toast
