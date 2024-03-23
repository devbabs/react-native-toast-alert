# react-native-toast-alert

My awesome react-native-toast-alert library

## Installation

```sh
npm install react-native-toast-alert
```

## Usage

```js
// ...
import ToastManager { Toast } from 'react-native-toast-alert'

const App = () => {
  const showToast = () => {
    Toast.success("Successful...", {
      dissmissMode: 'swipe',
      autoDismiss: false,
      progress: true,
      bounce: true,
    })
  }

  return (
    <View>
      <ToastManager />
      <Touchable
        onPress={() => showToast()}
      >
        Show
      </Touchable>
    </View>
  )
})

// ...
```

## TODO
1. Add custom style to alert
2. Allow custom callback
3. Add option to disiss alert manually
4. Display custom component

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
