import { createAvatar } from '@dicebear/core';
import { 
  initials,
  identicon,
  shapes,
  rings,
  icons,
  thumbs,
  glass
} from '@dicebear/collection';

// Map different entities to distinct aesthetic styles
const avatarStyles = {
  user: initials,          // Clean initials for users (e.g., AS)
  client: thumbs,          // Friendly character illustrations for clients
  project: shapes,         // Abstract colorful shapes for projects
  invoice: identicon,      // Unique geometric patterns for invoices
  expense: rings,          // Abstract rings for expenses
  organization: glass,     // Glass style for organization
  default: icons           // Glyphs (icons) as a fallback
};

export function DynamicAvatar({ 
  type = 'default', 
  seed, 
  size = 40,
  className = "",
  options = {}
}) {
  // If no seed is provided, show a default contrast gradient from the theme
  if (!seed) {
    return (
      <div 
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
        className={`shrink-0 bg-gradient-to-br from-primary to-primary/40 shadow-sm ${type === 'project' || type === 'invoice' ? 'rounded-md' : 'rounded-full'} ${className}`} 
      />
    );
  }

  const selectedStyle = avatarStyles[type] || avatarStyles.default;

  // Generate the avatar
  const avatar = createAvatar(selectedStyle, {
    seed: seed,
    size: size,
    // Provide sensible defaults for styling based on type
    radius: (type === 'project' || type === 'invoice') ? 10 : 50, 
    ...options
  });

  const dataUri = avatar.toDataUri();

  return (
    <img 
      src={dataUri} 
      alt={`${type} avatar`} 
      width={size} 
      height={size} 
      className={`shrink-0 ${type === 'project' || type === 'invoice' ? 'rounded-md' : 'rounded-full'} ${className}`} 
    />
  );
}
