import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Check, 
  RefreshCw, 
  Sparkles, 
  AlertCircle,
  Shield,
  Palette
} from 'lucide-react';
import { UserProfile } from '../../types/landsync';
import { OFFICIAL_AUTHORITY_SEALS, AuthoritySeal } from '../../data/officialSeals';
import { UserAvatar, getOfficerInitials } from '../common/UserAvatar';

interface ChangePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateAvatar: (newAvatarUrl: string) => void;
}

const MONOGRAM_PALETTES = [
  { id: 'mono-blue', name: 'Royal Navy', gradient: 'from-[#1E3A8A] via-[#1D4ED8] to-[#0F172A]', border: '#93C5FD' },
  { id: 'mono-emerald', name: 'Emerald Land', gradient: 'from-[#065F46] via-[#059669] to-[#0F172A]', border: '#A7F3D0' },
  { id: 'mono-amber', name: 'Imperial Gold', gradient: 'from-[#78350F] via-[#D97706] to-[#0F172A]', border: '#FDE68A' },
  { id: 'mono-crimson', name: 'Revenue Ruby', gradient: 'from-[#881337] via-[#E11D48] to-[#0F172A]', border: '#FECDD3' },
  { id: 'mono-purple', name: 'Geodetic Violet', gradient: 'from-[#581C87] via-[#7C3AED] to-[#0F172A]', border: '#DDD6FE' },
  { id: 'mono-cyan', name: 'GIS Ocean', gradient: 'from-[#0369A1] via-[#0284C7] to-[#0F172A]', border: '#BAE6FD' },
  { id: 'mono-slate', name: 'State Charcoal', gradient: 'from-[#1E293B] via-[#334155] to-[#0F172A]', border: '#CBD5E1' },
];

export const ChangePhotoModal: React.FC<ChangePhotoModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateAvatar,
}) => {
  const [activeTab, setActiveTab] = useState<'seals' | 'monogram' | 'upload'>('seals');
  
  // Find matching default seal
  const defaultSeal = OFFICIAL_AUTHORITY_SEALS.find(s => s.role === user.role) || OFFICIAL_AUTHORITY_SEALS[0];
  const initialUrl = user.avatarUrl && !user.avatarUrl.includes('unsplash') 
    ? user.avatarUrl 
    : defaultSeal.badgeUrl;

  const [previewUrl, setPreviewUrl] = useState<string>(initialUrl);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Process and compress chosen image to a fast, clean Data URL
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an official image file (PNG, SVG, JPG, WebP).');
      return;
    }

    setIsProcessingFile(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 320;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/png');
          setPreviewUrl(compressedDataUrl);
        } else {
          setPreviewUrl(e.target?.result as string);
        }
        setIsProcessingFile(false);
      };
      img.onerror = () => {
        setIsProcessingFile(false);
        alert('Could not process this file.');
      };
      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      setIsProcessingFile(false);
      alert('Failed to read image file.');
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleSelectMonogram = (palette: typeof MONOGRAM_PALETTES[0]) => {
    const initials = getOfficerInitials(user.name);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <defs>
        <linearGradient id="mono_g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.gradient.includes('1E3A8A') ? '#1E3A8A' : palette.gradient.includes('065F46') ? '#065F46' : palette.gradient.includes('78350F') ? '#78350F' : palette.gradient.includes('881337') ? '#881337' : palette.gradient.includes('581C87') ? '#581C87' : palette.gradient.includes('0369A1') ? '#0369A1' : '#1E293B'}"/>
          <stop offset="100%" stop-color="#0F172A"/>
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill="url(#mono_g)" stroke="${palette.border}" stroke-width="5"/>
      <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="4,4"/>
      <text x="100" y="118" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="64" font-weight="900" text-anchor="middle" letter-spacing="4">${initials}</text>
      <text x="100" y="152" fill="${palette.border}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="2">GAIA OFFICER</text>
    </svg>`;
    setPreviewUrl(`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`);
  };

  const handleSave = () => {
    onUpdateAvatar(previewUrl);
    onClose();
  };

  const handleResetToDefault = () => {
    setPreviewUrl(defaultSeal.badgeUrl);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center border border-[#DBEAFE]">
              <Shield className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight font-heading">
                Officer Insignia &amp; Avatar
              </h2>
              <p className="text-xs text-[#64748B]">
                Select an official authority crest, monogram seal, or department insignia
              </p>
            </div>
          </div>
          <button
            id="btn-close-change-photo"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#E2E8F0]/50 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current & Preview Banner */}
        <div className="p-6 pb-4 flex items-center gap-5 border-b border-[#F1F5F9] bg-[#F8FAFC]/50">
          <div className="relative shrink-0">
            <img
              src={previewUrl}
              alt="Avatar insignia preview"
              className="w-20 h-20 rounded-full object-cover border-3 border-[#2563EB] shadow-md ring-4 ring-[#EFF6FF] bg-slate-900"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultSeal.badgeUrl;
              }}
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#16A34A] ring-2 ring-white flex items-center justify-center">
              <Check className="w-3 h-3 text-white stroke-3" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#0F172A] truncate">
                {user.name}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB] rounded-full border border-[#DBEAFE]">
                Official Credentials
              </span>
            </div>
            <div className="text-xs text-[#64748B] mt-0.5 truncate">
              {user.role} • {user.department}
            </div>
            <p className="text-[11px] text-[#2563EB] font-medium mt-1">
              Official insignia appears on GAIA GIS maps, audits, and official certificates
            </p>
          </div>
        </div>

        {/* Selection Method Tabs */}
        <div className="p-6 pt-4 space-y-4">
          <div className="flex bg-[#F1F5F9] p-1 rounded-2xl border border-[#E2E8F0]">
            <button
              id="tab-photo-seals"
              type="button"
              onClick={() => setActiveTab('seals')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'seals' 
                  ? 'bg-white text-[#2563EB] shadow-xs' 
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authority Crests</span>
            </button>

            <button
              id="tab-photo-monogram"
              type="button"
              onClick={() => setActiveTab('monogram')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'monogram' 
                  ? 'bg-white text-[#2563EB] shadow-xs' 
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Monogram Seal</span>
            </button>

            <button
              id="tab-photo-upload"
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'upload' 
                  ? 'bg-white text-[#2563EB] shadow-xs' 
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Seal</span>
            </button>
          </div>

          {/* TAB 1: Authority Crests & Seals */}
          {activeTab === 'seals' && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#64748B] block">
                Select official government department crest:
              </span>

              <div className="grid grid-cols-4 gap-2.5 max-h-56 overflow-y-auto p-1">
                {OFFICIAL_AUTHORITY_SEALS.map((seal) => {
                  const isSelected = previewUrl === seal.badgeUrl;
                  return (
                    <button
                      key={seal.id}
                      type="button"
                      onClick={() => setPreviewUrl(seal.badgeUrl)}
                      className={`relative group rounded-2xl p-2 border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
                        isSelected 
                          ? 'border-[#2563EB] bg-[#EFF6FF] shadow-xs' 
                          : 'border-[#E2E8F0] hover:border-[#93C5FD] bg-white'
                      }`}
                    >
                      <img
                        src={seal.badgeUrl}
                        alt={seal.label}
                        className="w-12 h-12 rounded-full object-cover shadow-2xs"
                      />
                      <span className="text-[10px] font-bold text-[#0F172A] mt-1.5 leading-tight line-clamp-1">
                        {seal.label}
                      </span>
                      <span className="text-[9px] text-[#64748B] leading-none line-clamp-1 mt-0.5">
                        {seal.colorName}
                      </span>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-[#2563EB] text-white rounded-full flex items-center justify-center shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Monogram Badges */}
          {activeTab === 'monogram' && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#64748B] block">
                Create a high-contrast official monogram with your initials ({getOfficerInitials(user.name)}):
              </span>

              <div className="grid grid-cols-4 gap-2.5 p-1">
                {MONOGRAM_PALETTES.map((pal) => (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => handleSelectMonogram(pal)}
                    className="p-3 rounded-2xl border border-[#E2E8F0] hover:border-[#2563EB] bg-white hover:bg-[#F8FAFC] flex flex-col items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${pal.gradient} flex items-center justify-center text-white font-extrabold text-sm border-2`} style={{ borderColor: pal.border }}>
                      {getOfficerInitials(user.name)}
                    </div>
                    <span className="text-[10px] font-bold text-[#0F172A]">{pal.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Upload Official Crest or Seal */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/svg+xml, image/webp"
                className="hidden"
                onChange={handleFileChange}
              />

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#2563EB] bg-[#EFF6FF]'
                    : 'border-[#CBD5E1] bg-[#F8FAFC] hover:bg-[#EFF6FF]/60 hover:border-[#2563EB]'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-[#E2E8F0] flex items-center justify-center mb-2.5 text-[#2563EB]">
                  {isProcessingFile ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-[#2563EB]" />
                  ) : (
                    <Upload className="w-6 h-6 text-[#2563EB]" />
                  )}
                </div>

                <span className="text-xs font-bold text-[#0F172A]">
                  Click to select departmental emblem or drag and drop
                </span>
                <span className="text-[11px] text-[#64748B] mt-0.5">
                  PNG, SVG, or JPG official crest up to 10MB
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
                <span>Official government seal or agency emblem</span>
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="text-xs text-[#2563EB] hover:underline font-semibold cursor-pointer"
                >
                  Reset to default
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-6 pt-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] text-xs font-bold cursor-pointer transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              id="btn-save-profile-photo"
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Apply Insignia</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
