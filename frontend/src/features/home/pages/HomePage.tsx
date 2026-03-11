import {Header} from "../../../components/Header";
import {PromoBanner} from "../components/PromoBanner";
import {CategoryBar} from "../../../components/CategoryBar";
import {FeaturedProducts} from "../components/FeaturedProducts";
import {Footer} from "../../../components/Footer";

export const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <PromoBanner />
                <CategoryBar />
                <FeaturedProducts />
            </main>
            <Footer />
        </div>
    );
};