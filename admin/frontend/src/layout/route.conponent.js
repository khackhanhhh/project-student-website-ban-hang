import { Route } from "react-router";
import Home from "./home.component"
const Router = () => {
    return (
        <Route path="/" component={Home} />
    );
}
export default Router;