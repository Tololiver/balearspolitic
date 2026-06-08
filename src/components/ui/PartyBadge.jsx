// src/components/ui/PartyBadge.jsx
// Badge universal per a partits — mostra logo si disponible, color sempre
import { usePartitsGlobal } from '@/context/PartitsContext'

/**
 * Ús:
 * <PartyBadge codi="pp" />                    → badge amb logo si en té
 * <PartyBadge codi="psib" size="sm" />        → petit
 * <PartyBadge codi="mes" showName={false} />  → només logo/inicials
 * <PartyBadge codi="elpi" variant="pill" />   → pill rodona
 */
export default function PartyBadge({
  codi,
  nom: nomProp,
  color: colorProp,
  logoUrl: logoProp,
  size = 'md',       // 'xs' | 'sm' | 'md' | 'lg'
  showName = true,
  variant = 'badge', // 'badge' | 'pill' | 'dot'
}) {
  const { byCode } = usePartitsGlobal()
  const parti = byCode[codi] || {}

  const nom      = nomProp   || parti.sigles || parti.nom || codi || ''
  const color    = colorProp || parti.color  || '#888'
  const logoUrl  = logoProp  || parti.logo_url || null
  const bg       = parti.bg_color || `${color}18`

  // Mides
  const sizes = {
    xs: { badge: 'h-5 text-[9px] px-1.5 gap-1',   logo: 'w-3 h-3',   dot: 'w-2 h-2' },
    sm: { badge: 'h-6 text-[10px] px-2 gap-1.5',  logo: 'w-3.5 h-3.5', dot: 'w-2.5 h-2.5' },
    md: { badge: 'h-7 text-xs px-2.5 gap-1.5',    logo: 'w-4 h-4',   dot: 'w-3 h-3' },
    lg: { badge: 'h-9 text-sm px-3 gap-2',        logo: 'w-5 h-5',   dot: 'w-4 h-4' },
  }
  const s = sizes[size] || sizes.md

  if (variant === 'dot') {
    return (
      <span className="flex items-center gap-1.5">
        <span className={`${s.dot} rounded-sm flex-shrink-0`} style={{ background: color }}>
          {logoUrl && <img src={logoUrl} alt={nom} className="w-full h-full object-contain"/>}
        </span>
        {showName && <span className="font-mono text-[10px] text-mid">{nom}</span>}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center font-mono font-bold rounded ${s.badge} ${variant === 'pill' ? 'rounded-full' : 'rounded'}`}
      style={{ background: color, color: '#fff' }}
      title={parti.nom || nom}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={nom}
          className={`${s.logo} object-contain flex-shrink-0`}
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      ) : null}
      {showName && <span>{nom}</span>}
    </span>
  )
}
