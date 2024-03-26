import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Gesture, GestureDetector, type GestureUpdateEvent, type PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import Toast from './Toast'

interface ToastOptions {
    duration?: number,
    progress?: boolean,
    bounce?: boolean,
    autoDismiss?: boolean,
    centerText?: boolean,
    dismissMode?: 'tap' | 'swipe'
}

export class ToastManager extends Component<{}, {
    visible: boolean
    duration: number
    backgroundColor: string
    dismissGesture: any
    toastMessage: string
    showProgress: boolean
    bounce: boolean
    autoDismiss: boolean
    centerText: boolean
    toastSpeed: number
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
            dismissGesture: Gesture.Tap().runOnJS(true).onEnd(() => {
                console.log("Tapped to duss")
                this.hideAllToasts()
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
        this.hideAllToasts()
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
                style={{
                    backgroundColor: this.state.backgroundColor
                }}
                message={this.state.toastMessage}
                dismiss={this.hideAllToasts}
            />
        )
    }
}

const styles = StyleSheet.create({
    
})

export default ToastManager
