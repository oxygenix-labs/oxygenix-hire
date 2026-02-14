interface OxygenixLabsLogoProps {
    size?: "small" | "medium" | "large";
    variant?: "dark" | "light";
    iconOnly?: boolean;
    product?: "hire";
}

export function Logo({
    size = "small",
    variant = "dark",
    iconOnly = false,
    product = "hire",
}: OxygenixLabsLogoProps) {
    const dimensions = {
        small: { icon: 28, fontSize: "16px" },
        medium: { icon: 42, fontSize: "32px" },
        large: { icon: 56, fontSize: "48px" },
    };

    const dim = dimensions[size];
    const textColor = variant === "light" ? "#ffffff" : "#1e293b";
    const primaryGradient =
        variant === "light" ? ["#a78bfa", "#ec4899", "#f472b6"] : ["#8b5cf6", "#d946ef", "#ec4899"];

    // Use black for Hire product
    const isHire = product === "hire";
    const iconFill = isHire
        ? variant === "light"
            ? "#ffffff"
            : "#1e293b"
        : `url(#gradient-${size}-${variant})`;
    const accentColor = isHire ? (variant === "light" ? "#ffffff" : "#1e293b") : primaryGradient[2];

    const productNames = {
        hire: "HIRE",
    };

    return (
        <div className="flex items-center gap-4">
            {/* Icon - Abstract O2 Design */}
            <svg
                width={dim.icon}
                height={dim.icon}
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id={`gradient-${size}-${variant}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor={primaryGradient[0]} />
                        <stop offset="50%" stopColor={primaryGradient[1]} />
                        <stop offset="100%" stopColor={primaryGradient[2]} />
                    </linearGradient>
                </defs>

                {/* Stylized "O" - Left circle with cutout */}
                <circle cx="18" cy="28" r="14" fill={iconFill} opacity="0.9" />
                <circle
                    cx="18"
                    cy="28"
                    r="9"
                    fill={variant === "light" ? "#1e293b" : "#ffffff"}
                    opacity={variant === "light" ? "0.1" : "0.05"}
                />

                {/* Stylized "X" - Crossed lines */}
                <path
                    d="M28 16 L32 16 L38 28 L44 16 L48 16 L40 30 L48 44 L44 44 L38 32 L32 44 L28 44 L36 30 Z"
                    fill={iconFill}
                    opacity="0.9"
                />

                {/* Small accent circle (represents subscript 2) */}
                <circle cx="50" cy="38" r="3.5" fill={accentColor} opacity="0.8" />
            </svg>

            {/* Text Logo */}
            {!iconOnly && (
                <div className="flex items-center gap-1">
                    <span
                        style={{
                            color: textColor,
                            fontSize: dim.fontSize,
                            fontWeight: 700,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        OXYGENIX
                    </span>
                    <span
                        style={{
                            color: textColor,
                            fontSize: `calc(${dim.fontSize} * 0.5)`,
                            fontWeight: 600,
                            opacity: 0.5,
                            alignSelf: "flex-start",
                            marginTop: size === "small" ? "2px" : size === "medium" ? "4px" : "6px",
                        }}
                    >
                        {productNames[product]}
                    </span>
                </div>
            )}
        </div>
    );
}
