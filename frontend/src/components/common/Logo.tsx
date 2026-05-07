import techLogo from "@/assets/logos/Icon-Logo.png";

export const Logo = () => {
    return (
        <section className="flex items-center gap-y-12">
            <img
                src={techLogo}
                alt="TechStore Logo"
                className="h-30 w-auto object-contain flex-shrink-0"
            />
            <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent text-xl leading-none">
                TechStore
            </span>
        </section>
    );
};