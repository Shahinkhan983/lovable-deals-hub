import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  headerAction?: ReactNode;
}

const FormSection = ({ title, children, headerAction }: FormSectionProps) => {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex justify-between items-center">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        {headerAction}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
