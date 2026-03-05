import {Header} from "../../../components/Header";
import {PromoBanner} from "../components/PromoBanner";
import {CategoryBar} from "../../../components/CategoryBar";
import {FeaturedProducts} from "../components/FeaturedProducts";
export const HomePage = () => {
    return (
    <div>
            <Header />
            <PromoBanner />
            <CategoryBar />
            <FeaturedProducts />
    </div>
    );
};