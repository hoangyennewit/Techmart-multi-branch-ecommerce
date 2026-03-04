import {Logo} from "../../../components/common/Logo";
import {Header} from "../../../components/Header";
import {PromoBanner} from "../components/PromoBanner";
import {CategoryBar} from "../../../components/CategoryBar";
export const HomePage = () => {
    return (
    <div>
            <Header />
            <PromoBanner />
            <CategoryBar />
    </div>
    );
};