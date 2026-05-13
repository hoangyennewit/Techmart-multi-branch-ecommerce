import techLogo from "@/assets/logos/Icon-Logo.png";

export const Logo = () => {
    return (
        <section className="flex items-center gap-2">
            <img
                src={techLogo}
                alt="TechMart Logo"
                className="h-10 sm:h-12 w-auto object-contain flex-shrink-0"
            />
            <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent text-xl sm:text-3xl leading-none">
                TechMart
            </span>
        </section>
    );
};