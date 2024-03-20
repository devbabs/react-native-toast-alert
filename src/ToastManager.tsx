import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface ToastOptions {
    duration?: number,
    progress?: boolean,
    bounce?: boolean,
    autoDismiss?: boolean,
    dissmissMode?: 'tap' | 'swipe'
}

export class ToastManager extends Component<{}, {
    backgroundColor: string
    dismissGesture: any
    toastMessage: any
    showProgress: any
    autoDismiss: any
    toastSpeed: any
    dismissMode: any
}> {
    defaultToastPosition = -Dimensions.get('window').height
    defaultToastDuration = 3000

    static toastInstance: ToastManager
  	progressValue: Animated.Value;
    topValue: Animated.Value;
    hideToastTimeout: any;

    constructor(props: {
        componentId: string
    }) {
        super(props)
        ToastManager.toastInstance = this
        this.state = {
            autoDismiss: true,
            dismissMode: true,
            showProgress: false,
            toastSpeed: 500,
            toastMessage: "",
            backgroundColor: '#aaa',
            dismissGesture: Gesture.Tap().runOnJS(true).onEnd(() => {
                ToastManager.toastInstance.hideAllToasts()
            })
        }
        this.progressValue = new Animated.Value(0)
        this.topValue = new Animated.Value(this.defaultToastPosition)
        this.hideToastTimeout
    }

    static success(text:any, options?: ToastOptions){
        ToastManager.toastInstance.setState({
            backgroundColor: '#14A44D'
        })

        ToastManager.toastInstance.show(text, options)
    }

    static info(text:any, options?: ToastOptions){
        ToastManager.toastInstance.setState({
            backgroundColor: '#54B4D3'
        })

        ToastManager.toastInstance.show(text, options)
    }

    static error(text:any, options?: ToastOptions){
        ToastManager.toastInstance.setState({
            backgroundColor: '#DC4C64'
        })

        ToastManager.toastInstance.show(text, options)
    }

    static warning(text:any, options?: ToastOptions){
        ToastManager.toastInstance.setState({
            backgroundColor: '#E4A11B'
        })

        ToastManager.toastInstance.show(text, options)
    }

    show = (text: string, options?: ToastOptions) => {
        let duration = options?.duration ?? this.defaultToastDuration
        let autoDismiss = options?.autoDismiss !== false

        this.setState({
            toastMessage: text,
            showProgress: options?.progress ?? false
        })

        if (options?.dissmissMode == 'swipe') {
            this.setState({
                dismissGesture: Gesture.Pan().runOnJS(true).onUpdate((gesture) => {
                    if (gesture.translationY < 0) {
                        this.hideAllToasts()
                    }
                })
            })
        }

        this.topValue.setValue(this.defaultToastPosition)
        this.progressValue.setValue(Dimensions.get('window').width)

        this.hideToastTimeout && clearTimeout(this.hideToastTimeout)

        Animated.sequence([
            options?.bounce ? (
                Animated.spring(this.topValue, {
                    toValue: -100,
                    friction: 6,
                    useNativeDriver: true,
                })
            ) : (
                Animated.timing(this.topValue, {
                    toValue: -100,
                    useNativeDriver: true,
                    duration: this.state.toastSpeed
                })
            ),
            Animated.timing(this.progressValue, {
                toValue: -10,
                duration,
                useNativeDriver: false
            })
        ]).start()

        this.hideToastTimeout = setTimeout(() => {
            if (autoDismiss) {
                this.hideAllToasts()
            }
        }, duration + (options?.bounce ? 1500 : 0));
    }

    hideAllToasts = () => {
        Animated.timing(this.topValue, {
            toValue: this.defaultToastPosition,
            useNativeDriver: true
        }).start()
    }

    render() {
        return (
            <Animated.View
                style={[styles.container, {
                    top: 0,
                    backgroundColor: this.state.backgroundColor,
                    transform: [
                        {
                            translateY: this.topValue
                        }
                    ]
                }]}
            >
                <GestureDetector
                    gesture={this.state.dismissGesture}
                >
                    <View>
                        <View
                        style={{
                            padding: 15,
                            paddingTop: 170,
                        }}
                    >
                        <Text style={{color: '#FFF'}}>
                            {this.state.toastMessage}
                        </Text>
                    </View>
                    {
                        this.state.showProgress && (
                            <View
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, .2)',
                                    height: 6,
                                    alignItems: 'flex-start'
                                }}
                            >
                                <Animated.View
                                    style={{
                                        backgroundColor: 'rgba(0, 0, 0, .2)',
                                        flex: 1,
                                        width: this.progressValue
                                    }}
                                ></Animated.View>
                            </View>
                        )
                    }
                    </View>
                </GestureDetector>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10000000000,
        width: Dimensions.get('window').width,
    }
})

export default ToastManager
