import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getSession('superadmin');
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Return mock data for super admin dashboard charts
        return NextResponse.json({
            revenueOverview: [
                { month: "Jan", revenue: 20000, expenses: 15000 },
                { month: "Feb", revenue: 22000, expenses: 16000 },
                { month: "Mar", revenue: 25000, expenses: 18000 },
                { month: "Apr", revenue: 28000, expenses: 17000 },
                { month: "May", revenue: 32000, expenses: 19000 },
                { month: "Jun", revenue: 35000, expenses: 20000 },
                { month: "Jul", revenue: 40000, expenses: 22000 },
                { month: "Aug", revenue: 45000, expenses: 24000 },
            ],
            growthPctNum: 15.3,
            invoiceStatus: [
                { status: "Paid", share: 65, fill: "var(--color-paid)" },
                { status: "Pending", share: 20, fill: "var(--color-pending)" },
                { status: "Overdue", share: 10, fill: "var(--color-overdue)" },
                { status: "Draft", share: 5, fill: "var(--color-draft)" },
            ]
        });
    } catch (error) {
        console.error("Super Admin Charts Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
