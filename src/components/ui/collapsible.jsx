"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { cn } from "@/lib/utils"

function Collapsible({
  className,
  ...props
}) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" className={cn("t-acc", className)} {...props} />;
}

function CollapsibleTrigger({
  ...props
}) {
  return (<CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />);
}

function CollapsibleContent({
  className,
  children,
  ...props
}) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" className={cn("t-acc-panel", className)} {...props}>
      <div className="t-acc-panel-inner">
        {children}
      </div>
    </CollapsiblePrimitive.Panel>
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
