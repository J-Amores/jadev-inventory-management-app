'use client';

// Page header (Client Component)
interface HeaderProps {
  title: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

export default function Header({ title, showAddButton, onAddClick }: HeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
      {/* Display user avatar (static initials "JD") */}
      {showAddButton && <button onClick={onAddClick}>Add</button>}
    </header>
  );
}
