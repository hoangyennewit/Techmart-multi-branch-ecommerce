import techLogo from "@/assets/logos/Icon-Logo.png";

export const Logo = () => {
    return (
        <section className="flex items-center gap-2">
            <img
                src={techLogo}
                alt="TechMart Logo"
                className="h-8 sm:h-10 w-auto object-contain flex-shrink-0"
            />
            <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent text-lg sm:text-2xl leading-none">
                TechMart
            </span>
        </section>
    );
};