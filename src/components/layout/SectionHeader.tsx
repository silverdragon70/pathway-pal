interface SectionHeaderProps {
  title: string;
  action?: { label: string; onClick: () => void };
}

export const SectionHeader = ({ title, action }: SectionHeaderProps) => (
  <div className="flex items-center justify-between px-5 mb-3">
    <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {title}
    </h3>
    {action && (
      <button
        onClick={action.onClick}
        className="text-xs font-medium text-primary active:scale-[0.97] transition-transform"
      >
        {action.label}
      </button>
    )}
  </div>
);
