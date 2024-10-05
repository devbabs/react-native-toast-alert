import { Animated, Dimensions, type ImageSourcePropType } from 'react-native'
import React, { Component } from 'react'
import { Gesture, type GestureUpdateEvent, type PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import Toast from './Toast'

interface ToastOptions {
    duration?: number,
    progress?: boolean,
    bounce?: boolean,
    autoDismiss?: boolean,
    centerText?: boolean,
    dismissMode?: 'tap' | 'swipe',
    icon?: ImageSourcePropType
    withIcon?: boolean
}

interface StyledToastOptions {
    backgroundColor?: string,
    textColor?: string,
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined
}

export class ToastManager extends Component<{}, {
    visible: boolean
    duration: number
    backgroundColor: string
    style?: StyledToastOptions
    dismissGesture: any
    toastMessage: string
    showProgress: boolean
    bounce: boolean
    autoDismiss: boolean
    centerText: boolean
    toastSpeed: number
    icon?: ImageSourcePropType
    withIcon?: boolean
    dismissMode: 'tap' | 'swipe'
}> {
    defaultToastPosition = -Dimensions.get('window').height
    defaultToastDuration = 2000

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
            visible: false,
            duration: this.defaultToastDuration,
            autoDismiss: true,
            dismissMode: 'tap',
            showProgress: false,
            bounce: true,
            centerText: false,
            toastSpeed: 500,
            toastMessage: "",
            backgroundColor: '#aaa',
            style: undefined,
            icon: undefined,
            withIcon: true,
            dismissGesture: Gesture.Tap().runOnJS(true).onEnd(() => {
                this.hideAllToasts()
            })
        }
        this.progressValue = new Animated.Value(0)
        this.topValue = new Animated.Value(this.defaultToastPosition)
        this.hideToastTimeout
    }

    static success(text:any, options?: ToastOptions){
        ToastManager.toastInstance.show(text, options)

        setTimeout(() => {
            ToastManager.toastInstance.setState({
                backgroundColor: '#14A44D',
            })

            if (options?.withIcon !== false) {
                ToastManager.toastInstance.setState({
                    icon: options?.icon ?? require('../assets/icons/check.png')
                })
            } else {
                ToastManager.toastInstance.setState({
                    icon: undefined
                })
            }
        }, 500);
    }

    static info(text:any, options?: ToastOptions){
        ToastManager.toastInstance.show(text, options)

        setTimeout(() => {
            ToastManager.toastInstance.setState({
                backgroundColor: '#54B4D3',
            })

            if (options?.withIcon !== false) {
                ToastManager.toastInstance.setState({
                    icon: options?.icon ?? require('../assets/icons/info.png')
                })
            } else {
                ToastManager.toastInstance.setState({
                    icon: undefined
                })
            }
        }, 500);
    }

    static error(text:any, options?: ToastOptions){
        ToastManager.toastInstance.show(text, options)

        setTimeout(() => {
            ToastManager.toastInstance.setState({
                backgroundColor: '#DC4C64',
            })

            if (options?.withIcon !== false) {
                ToastManager.toastInstance.setState({
                    icon: options?.icon ?? require('../assets/icons/error.png')
                })
            } else {
                ToastManager.toastInstance.setState({
                    icon: undefined
                })
            }
        }, 500);
    }

    static warning(text:any, options?: ToastOptions){
        ToastManager.toastInstance.show(text, options)

        setTimeout(() => {
            ToastManager.toastInstance.setState({
                backgroundColor: '#E4A11B',
            })

            if (options?.withIcon !== false) {
                ToastManager.toastInstance.setState({
                    icon: options?.icon ?? require('../assets/icons/info.png')
                })
            } else {
                ToastManager.toastInstance.setState({
                    icon: undefined
                })
            }
        }, 500);
    }

    static styled(text:any, style: StyledToastOptions, options?: ToastOptions){
        ToastManager.toastInstance.show(text, options)

        setTimeout(() => {
            ToastManager.toastInstance.setState({
                backgroundColor: '#E4A11B',
                style,
            })

            if (options?.withIcon !== false) {
                ToastManager.toastInstance.setState({
                    icon: options?.icon ?? require('../assets/icons/info.png')
                })
            } else {
                ToastManager.toastInstance.setState({
                    icon: undefined
                })
            }
        }, 500);
    }

    show = (text: string, options?: ToastOptions) => {
        this.hideAllToasts()

        setTimeout(() => {
            let duration = options?.duration ?? this.defaultToastDuration
            let autoDismiss = options?.autoDismiss !== true

            console.log("Showing toast on", this.props)

            this.setState({
                toastMessage: text,
                showProgress: options?.progress ?? false,
                centerText: options?.centerText ?? false,
                bounce: options?.bounce ?? false,
                visible: true,
                duration,
                autoDismiss
            })

            if (options?.dismissMode == 'swipe') {
                this.setState({
                    dismissGesture: Gesture.Pan().runOnJS(true).onUpdate((gesture: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
                        if (gesture.translationY < 0) {
                            this.hideAllToasts()
                        }
                    })
                })
            }
        }, 200);
    }

    hideAllToasts = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <Toast
                visible={this.state.visible}
                duration={this.state.duration}
                progress={this.state.showProgress}
                bounce={this.state.bounce}
                autoDismiss={this.state.autoDismiss}
                centerText={this.state.centerText}
                dismissGesture={this.state.dismissGesture}
                style={[this.state.style ?? {}, {
                    backgroundColor: this.state.backgroundColor
                }]}
                message={this.state.toastMessage}
                icon={this.state.icon}
                dismiss={this.hideAllToasts}
            />
        )
    }
}

export default ToastManager
