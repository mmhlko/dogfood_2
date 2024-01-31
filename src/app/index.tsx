import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./styles/index.scss";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "app/app-component/App";
import { persistor, store } from "storage/store";
import { PersistGate } from "redux-persist/integration/react";

const Router = process.env.REACT_APP_GH_PAGES !== "true" ? BrowserRouter : HashRouter;
const root = createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <Router>
            <App />
        </Router>
        </PersistGate>
    </Provider>
);