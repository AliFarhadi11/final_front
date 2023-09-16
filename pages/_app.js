import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/styles.css";
// import IndexLayout from '../components/index'   index.module.css
import store from '../redux/Store'
import { Provider } from 'react-redux'
import { IndexLayout } from '../components'

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>

      <IndexLayout>
        <Component {...pageProps} />
      </IndexLayout>
    </Provider >

  )
}

export default MyApp
