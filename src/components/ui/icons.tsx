import {
  Award,
  Bike,
  BookOpen,
  Briefcase,
  CalendarClock,
  Camera,
  Car,
  Code,
  Coffee,
  Dumbbell,
  Film,
  Flag,
  Gamepad2,
  Globe,
  GraduationCap,
  Guitar,
  Headphones,
  Heart,
  IdCard,
  Mountain,
  Palette,
  PenTool,
  Piano,
  Plane,
  Rocket,
  Sparkles,
  Target,
  Trophy,
  Utensils,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'
import type { IconName } from './icon-names'

type SvgProps = React.SVGProps<SVGSVGElement>

export function GitHubIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  )
}

export function LinkedInIcon(props: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1zm1.8 13.1H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" />
    </svg>
  )
}

const ICONS: Record<IconName, LucideIcon> = {
  award: Award,
  bike: Bike,
  book: BookOpen,
  briefcase: Briefcase,
  calendar: CalendarClock,
  camera: Camera,
  car: Car,
  code: Code,
  coffee: Coffee,
  dumbbell: Dumbbell,
  film: Film,
  flag: Flag,
  gamepad: Gamepad2,
  globe: Globe,
  graduation: GraduationCap,
  guitar: Guitar,
  headphones: Headphones,
  heart: Heart,
  'id-card': IdCard,
  mountain: Mountain,
  palette: Palette,
  pen: PenTool,
  piano: Piano,
  plane: Plane,
  rocket: Rocket,
  sparkles: Sparkles,
  target: Target,
  trophy: Trophy,
  utensils: Utensils,
}

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = ICONS[name] ?? Sparkles
  return <Component aria-hidden="true" {...props} />
}
