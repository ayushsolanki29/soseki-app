import { formatCurrency, formatDate } from "@/lib/utils";

export function SosekiModernExpense({ expense, organization }) {
  if (!expense) return null;

  const currency = expense.invoice?.currency || organization?.masterCurrency || "USD";

  return (
    <div className="bg-white text-black w-full h-full flex flex-col p-12 shrink-0">
        
        <div className="flex justify-between items-start mb-12">
            <div>
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">EXPENSE VOUCHER</h2>
                <p className="text-gray-500 mt-2">Date: {formatDate(expense.date)}</p>
                <p className="text-gray-500">Ref: EXP-{expense.id.slice(0,6).toUpperCase()}</p>
            </div>
            <div className="text-right">
                <div className="font-bold text-gray-900 text-lg">{organization?.name || "Your Organization"}</div>
                {organization?.address ? (
                    <div className="text-gray-500 text-sm whitespace-pre-wrap mt-1 text-right max-w-xs ml-auto leading-relaxed">{organization.address}</div>
                ) : (
                    <div className="text-gray-400 text-xs mt-2 italic">Address not configured</div>
                )}
            </div>
        </div>

        <div className="flex justify-between mb-12 border-b border-gray-200 pb-8">
            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Details</p>
                <p className="font-semibold text-gray-900">{expense.description}</p>
                <p className="text-gray-500 text-sm mt-1">Category: {expense.category}</p>
            </div>
            {expense.client && (
                <div className="text-right">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Linked Client</p>
                    <p className="font-semibold text-gray-900">{expense.client.name}</p>
                    <p className="text-gray-500 text-sm mt-1">{expense.client.email}</p>
                </div>
            )}
        </div>

        <div className="mb-12 flex-1">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="border-b border-gray-300 text-gray-500">
                        <th className="py-3 font-medium">Description</th>
                        <th className="py-3 font-medium text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-100">
                        <td className="py-4 text-gray-900 font-medium">{expense.description}</td>
                        <td className="py-4 text-gray-900 text-right font-medium">{formatCurrency(expense.amount, currency)}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="flex justify-end mb-12">
            <div className="w-64 space-y-3 text-sm">
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-1 border-t-2 border-gray-900">
                    <span>TOTAL PAID</span>
                    <span>{formatCurrency(expense.amount, currency)}</span>
                </div>
            </div>
        </div>
        
        <div className="mt-8 bg-emerald-50/50 p-4 rounded-md border-l-4 border-emerald-600">
            <div className="flex items-center text-emerald-800">
                <span className="font-bold">✓ This expense has been fully recorded.</span>
            </div>
        </div>

        <div className="text-center text-gray-400 text-xs mt-auto pt-8 border-t border-gray-200">
            {organization?.profile?.expenseFooterNote || "Thank you!"}
        </div>
    </div>
  );
}
