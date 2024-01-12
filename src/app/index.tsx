import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./styles/index.scss";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "app/app-component/App";
import { store } from "storage/store";

const Router = process.env.REACT_APP_GH_PAGES !== "true" ? BrowserRouter : HashRouter;
const root = createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);