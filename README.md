# react-native-toast-alert

An awesome package for cool toast alerts in react-native 🚀

```js
Toast.success("Welcome. you will definitely love this toast package.😉")
```

<!-- ![](./Toast.success.gif) -->
<div style="margin-bottom: 20px;display: flex">
  <img src="./Toast.success.gif" width="300" style="margin-right: 20px;max-width: 100px" />
  <img src="./Toast.error.gif" width="300" style="margin-right: 20px;max-width: 100px" />
</div>
<div style="margin-bottom: 20px;display: flex">
  <img src="./Toast.warning.gif" width="300" style="margin-right: 20px;max-width: 100px" />
  <img src="./Toast.info.gif" width="300" style="margin-right: 20px;max-width: 100px" />
</div>

## Installation

```sh
npm install react-native-toast-alert
```

## Usage

### Step 1

Import `ToastManager` and `Toast`.

```js
// ...
import ToastManager { Toast } from 'react-native-toast-alert'
```

### Step 2

Add `ToastManager` component to the top of your app component structure.
```js
const App = () => {
  return (
    <View>
      <ToastManager />
      <App>
        // Other parts of your application content can go here
      </App>
    </View>
  )
})
```

### Step 3 (Final Step)

Call any of the `Toast` methods directly

```js
const App = () => {
  // ...

  const showSuccessToast = () => {
    Toast.success("Yaay!!! You made it here...🚀🚀🚀")
  }

  const showErrorToast = () => {
    Toast.error("Error, looks like something went wrong.🙁")
  }

  const showInfoToast = () => {
    Toast.error("Hi, you're still online.")
  }

  const showWarningToast = () => {
    Toast.error("Your wallet balance is running low.")
  }

  return (
    <View>
      <ToastManager />
      <Touchable
        onPress={() => showSuccessToast()}
      >
        Show
      </Touchable>
    </View>
  )
})

// ...
```

# Happy Coding 🥂

<!-- ## TODO
1. Add custom style to alert
2. Allow custom callback
3. Add option to disiss alert manually
4. Display custom component -->

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
