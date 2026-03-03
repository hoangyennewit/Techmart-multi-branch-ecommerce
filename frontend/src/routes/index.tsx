import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../features/home/pages/Homepage";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    }
]);