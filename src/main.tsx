import App from  './app/App'
import {Provider} from "react-redux";
import {store} from "./app/store/store";

const Main = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default Main;