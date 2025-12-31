const DealsHeader = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-border bg-card px-6 lg:px-10 py-3 flex-shrink-0 z-20">
      <div className="flex items-center gap-4 text-foreground lg:hidden">
        <button className="size-10 flex items-center justify-center rounded-full hover:bg-muted">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="text-lg font-bold leading-tight">DealsHub</h2>
      </div>
      
      <div className="hidden lg:flex items-center gap-4" />
      
      <div className="flex flex-1 justify-end gap-6 items-center">
        <div className="flex gap-2">
          <button className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full hover:bg-muted text-foreground transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>notifications</span>
          </button>
          <button className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full hover:bg-muted text-foreground transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>chat_bubble</span>
          </button>
        </div>
        <div 
          className="size-9 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-card shadow-sm flex items-center justify-center text-primary-foreground font-bold text-sm"
        >
          JD
        </div>
      </div>
    </header>
  );
};

export default DealsHeader;
