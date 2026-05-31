export default function SummaryCard({ title, value, subtitle, icon, color = 'accent' }) {
  const colorClasses = {
    accent: 'bg-accent-100 text-accent-700',
    navy: 'bg-navy-100 text-navy-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-semibold">{title}</p>
          <p className="text-3xl font-bold text-navy-900 mt-2">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`${colorClasses[color]} p-3 rounded-lg text-lg`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
