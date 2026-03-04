import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage} from "../features/home/pages/Homepage";
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    );
};