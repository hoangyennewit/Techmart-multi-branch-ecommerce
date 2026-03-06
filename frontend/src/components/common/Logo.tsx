import techLogo from "@/assets/logos/Icon-Logo.png";

export const Logo = () => {
    return (
        <section className="flex items-center gap-1.5 sm:gap-2">
            <img
                src={techLogo}
                alt="TechStore Logo"
                className="h-10 sm:h-14 w-auto object-contain flex-shrink-0"
            />
            <span className="font-bold text-[#1a3673] text-base sm:text-xl leading-none">
                TechStore
            </span>
        </section>
    );
};