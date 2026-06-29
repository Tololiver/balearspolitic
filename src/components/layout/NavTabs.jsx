import { NavLink } from 'react-router-dom'
import { Home, Scale, Users, ArrowLeftRight, FileText, Building2, Calendar, Layers, PenLine, BookOpen, Newspaper } from 'lucide-react'

const MINT = '#43F8CC'
const ICO = { size: 14, strokeWidth: 1.5 }

const TABS = [
  { to:'/',               label:'Inici',          icon:<Home {...ICO}/>        , end:true },
  { to:'/pp-vs-psoe',    label:'PP vs PSOE',     icon:<Scale {...ICO}/>       },
  { to:'/partits',       label:'Partits',          icon:<Users {...ICO}/>       },
  { to:'/comparador',    label:'Comparador',      icon:<ArrowLeftRight {...ICO}/> },
  { to:'/programes',     label:'Programes',       icon:<FileText {...ICO}/>    },
  { to:'/ajuntaments',   label:'Ajuntaments',     icon:<Building2 {...ICO}/>   },
  { to:'/eleccions-2027',label:'Eleccions 2027',  icon:<Calendar {...ICO}/>    },
  { to:'/governs',       label:'Governs',         icon:<Layers {...ICO}/>      },
  { to:'/blog',          label:'Blog',            icon:<PenLine {...ICO}/>     },
  { to:'/noticies',      label:'Notícies',        icon:<Newspaper {...ICO}/>  },
  { to:'/fonts',         label:'Fonts',           icon:<BookOpen {...ICO}/>    },
]

export default function NavTabs() {
  return (
    <nav className="bg-ink sticky top-0 z-50 border-b border-white/8">
      <div className="max-w-5xl mx-auto px-4 flex overflow-x-auto" style={{scrollbarWidth:'none'}}>
        {TABS.map(({to,label,icon,end})=>(
          <NavLink key={to+label} to={to} end={end}
            style={({isActive})=>({color:isActive?MINT:'rgba(255,255,255,0.5)',borderBottomColor:isActive?MINT:'transparent'})}
            className="flex items-center gap-1.5 px-3.5 py-3.5 text-[11px] font-semibold whitespace-nowrap border-b-2 transition-all duration-150 hover:text-white/90">
            {icon}
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.split(' ')[0]}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
