import React from 'react';
import { 
  Shield, 
  Landmark, 
  Compass, 
  FileText, 
  Building2, 
  Satellite, 
  MapPin, 
  Eye, 
  User as UserIcon,
  Crown
} from 'lucide-react';
import { UserRole } from '../../types/landsync';

export interface UserAvatarProps {
  user?: {
    name?: string;
    role?: UserRole | string;
    avatarUrl?: string;
    department?: string;
    designation?: string;
  } | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'rounded';
  className?: string;
  showStatus?: boolean;
}

// Extract initials from user name, skipping prefixes like Dr., Smt., Sri.
export const getOfficerInitials = (name?: string): string => {
  if (!name) return 'GA';
  const clean = name
    .replace(/^(Dr\.|Smt\.|Sri\.|Mr\.|Mrs\.|Ms\.)\s+/i, '')
    .replace(/,\s*(IAS|IPS|IFS|IRS|GIS|PhD)$/i, '')
    .trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
};

export interface RoleTheme {
  label: string;
  gradient: string;
  border: string;
  ring: string;
  textColor: string;
  badgeBg: string;
  icon: React.FC<{ className?: string }>;
}

export const ROLE_THEMES: Record<string, RoleTheme> = {
  SUPER_ADMIN: {
    label: 'State Authority',
    gradient: 'from-[#1E3A8A] via-[#1D4ED8] to-[#0F172A]',
    border: 'border-[#93C5FD]',
    ring: 'ring-blue-100',
    textColor: 'text-white',
    badgeBg: 'bg-[#1E40AF]',
    icon: Crown,
  },
  DISTRICT_ADMIN: {
    label: 'Collectorate',
    gradient: 'from-[#78350F] via-[#B45309] to-[#D97706]',
    border: 'border-[#FDE68A]',
    ring: 'ring-amber-100',
    textColor: 'text-white',
    badgeBg: 'bg-[#B45309]',
    icon: Landmark,
  },
  GIS_OFFICER: {
    label: 'GIS Unit',
    gradient: 'from-[#0369A1] via-[#0284C7] to-[#0D9488]',
    border: 'border-[#BAE6FD]',
    ring: 'ring-sky-100',
    textColor: 'text-white',
    badgeBg: 'bg-[#0284C7]',
    icon: Compass,
  },
  REVENUE_OFFICER: {
    label: 'Revenue Wing',
    gradient: 'from-[#881337] via-[#BE123C] to-[#9A3412]',
    border: 'border-[#FECDD3]',
    ring: 'ring-rose-100',
    textColor: 'text-white',
    badgeBg: 'bg-[#BE123C]',
    icon: FileText,
  },
  MUNICIPAL_OFFICER: {
    label: 'Town Planning',
    gradient: 'from-[#065F46] via-[#0D9488] to-[#0284C7]',
    border: 'border-[#A7F3D0]',
    ring: 'ring-emerald-100',
    textColor: 'text-white',
    badgeBg: 'bg-[#0D9488]',
    icon: Building2,
  },
  SURVEY_OFFICER: {
    label: 'Geodetic Survey',
    gradient: 'from-[#581C87] via-[#7C3AED] to-[#4338CA]',
    border: 'border-[#DDD6FE]',
    ring: 'ring-purple-100',
    textColor: 'text-white',
    badgeBg: 'bg-[#7C3AED]',
    icon: Satellite,
  },
  FIELD_OFFICER: {
    label: 'Ground Truth',
    gradient: 'from-[#1E40AF] via-[#2563EB] to-[#059669]',
    border: 'border-[#BFDBFE]',
    ring: 'ring-blue-100',
    textColor: 'text-white',
    badgeBg: 'bg-[#2563EB]',
    icon: MapPin,
  },
  DEPARTMENT_VIEWER: {
    label: 'Audit Viewer',
    gradient: 'from-[#334155] via-[#475569] to-[#1E293B]',
    border: 'border-[#CBD5E1]',
    ring: 'ring-slate-100',
    textColor: 'text-white',
    badgeBg: 'bg-[#475569]',
    icon: Eye,
  },
};

const DEFAULT_THEME: RoleTheme = {
  label: 'GAIA Officer',
  gradient: 'from-[#1E40AF] via-[#2563EB] to-[#0284C7]',
  border: 'border-[#DBEAFE]',
  ring: 'ring-blue-50',
  textColor: 'text-white',
  badgeBg: 'bg-[#2563EB]',
  icon: Shield,
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
  shape = 'circle',
  className = '',
  showStatus = false,
}) => {
  const role = user?.role || 'GIS_OFFICER';
  const theme = ROLE_THEMES[role] || DEFAULT_THEME;
  const initials = getOfficerInitials(user?.name);
  const IconComponent = theme.icon;

  // Filter out any external AI/stock human photos (e.g. unsplash)
  // Only accept genuine vector emblems (data:image/svg+xml or clean uploaded SVG/PNG seals)
  const isAiStockPhoto = (url?: string) => {
    if (!url) return true;
    return (
      url.includes('images.unsplash.com') ||
      url.includes('unsplash') ||
      url.includes('photo-') ||
      url.includes('thispersondoesnotexist')
    );
  };

  const validCustomAvatar = user?.avatarUrl && !isAiStockPhoto(user.avatarUrl) ? user.avatarUrl : null;

  // Dimensions
  const sizeClasses = {
    xs: 'w-7 h-7 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-16 h-16 text-base',
    '2xl': 'w-20 h-20 text-xl',
  }[size];

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-7 h-7',
    '2xl': 'w-9 h-9',
  }[size];

  const badgeSizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
    '2xl': 'w-5 h-5',
  }[size];

  const shapeClasses = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
      {validCustomAvatar ? (
        <img
          src={validCustomAvatar}
          alt={user?.name || 'Officer Avatar'}
          className={`${sizeClasses} ${shapeClasses} object-cover border border-[#DBEAFE] shadow-2xs`}
        />
      ) : (
        <div
          className={`${sizeClasses} ${shapeClasses} bg-gradient-to-br ${theme.gradient} text-white flex items-center justify-center font-bold tracking-tight shadow-2xs border ${theme.border} ring-1 ${theme.ring} relative overflow-hidden`}
          title={`${user?.name || 'Officer'} (${theme.label})`}
        >
          {/* Subtle background insignia watermark for large avatars */}
          {(size === 'xl' || size === '2xl') && (
            <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
              <IconComponent className="w-full h-full scale-125" />
            </div>
          )}

          {/* Render Initials or Insignia */}
          {size === 'xs' || size === 'sm' ? (
            <span className="font-heading font-extrabold uppercase leading-none drop-shadow-xs">
              {initials}
            </span>
          ) : size === 'md' ? (
            <span className="font-heading font-extrabold uppercase leading-none drop-shadow-xs flex items-center gap-0.5">
              {initials}
            </span>
          ) : (
            <div className="flex flex-col items-center justify-center relative z-10 leading-none">
              <IconComponent className={`${iconSizes} mb-1 drop-shadow-xs`} />
              <span className="font-heading font-extrabold tracking-wider uppercase">
                {initials}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Online / Active status beacon */}
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 ${badgeSizes} rounded-full bg-[#16A34A] ring-2 ring-white shadow-xs`}
          title="Active Session"
        />
      )}
    </div>
  );
};
