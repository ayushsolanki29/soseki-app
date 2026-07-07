import { LogoIcon } from "@/components/logo";

export function UniversalLoader({ className }) {
  return (
    <div className={`flex flex-col items-center justify-center w-full min-h-[300px] h-full gap-6 ${className || ''}`}>
      <div className="flex items-center gap-3 animate-pulse">
        <LogoIcon className="size-8" />
        <span className="text-2xl font-bold tracking-tight">Soseki</span>
      </div>
      
      <div className="w-48 h-1.5 bg-muted overflow-hidden rounded-full relative">
        <div 
          className="absolute inset-y-0 bg-primary rounded-full"
          style={{
            width: '40%',
            animation: 'infinity-progress 1.5s infinite ease-in-out'
          }}
        />
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes infinity-progress {
          0% { left: -40%; }
          50% { left: 100%; }
          100% { left: -40%; }
        }
      `}} />
    </div>
  );
}
