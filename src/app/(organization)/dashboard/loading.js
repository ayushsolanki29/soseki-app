import { UniversalLoader } from "@/components/ui/universal-loader";

export default function DashboardLoading() {
    return (
        <div className="w-full h-full flex items-center justify-center min-h-[60vh]">
            <UniversalLoader />
        </div>
    );
}
