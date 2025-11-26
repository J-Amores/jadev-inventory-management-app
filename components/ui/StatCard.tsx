// Dashboard stat cards
interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
      {icon}
      {trend && (
        <span>
          {trend.isPositive ? '+' : '-'}{trend.value}%
        </span>
      )}
    </div>
  );
}
