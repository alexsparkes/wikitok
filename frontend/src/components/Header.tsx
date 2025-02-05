import { LanguageSelector } from "./LanguageSelector";

type HeaderProps = {
  onReload: () => void;
  onToggleAbout: () => void;
};

export function Header({ onReload, onToggleAbout }: HeaderProps) {
  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={onReload}
          className="text-2xl font-bold text-white drop-shadow-lg hover:opacity-80 transition-opacity"
        >
          WikiTok
        </button>
      </div>
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
        <button
          onClick={onToggleAbout}
          className="text-sm text-white/70 hover:text-white transition-colors"
        >
          About
        </button>
        <LanguageSelector />
      </div>
    </>
  );
}
