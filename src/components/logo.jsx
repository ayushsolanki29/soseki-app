export const LogoIcon = ({ className, ...props }) => (
	<img src="/logo.svg" alt="Workora Logo Icon" className={`size-6 ${className || ''}`} {...props} />
);

export const Logo = ({ className, ...props }) => (
	<img src="/logo.svg" alt="Workora Logo" className={`h-6 w-auto ${className || ''}`} {...props} />
);
