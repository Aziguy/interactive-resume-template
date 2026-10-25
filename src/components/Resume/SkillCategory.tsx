interface SkillCategoryProps {
  title: string
  children: React.ReactNode
}

export function SkillCategory({ title, children }: SkillCategoryProps) {
  return (
    <div>
      <p className="text-xs font-medium text-resume-text mb-1.5">{title}</p>
      {children}
    </div>
  )
}
