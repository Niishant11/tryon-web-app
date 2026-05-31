export default function ProductTable({ products }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-navy-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Product</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Sales</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Revenue</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Try Ons</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Conversion</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-navy-900 font-medium">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{product.sales}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  ${product.revenue.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{product.tryOns}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    {product.conversionRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
