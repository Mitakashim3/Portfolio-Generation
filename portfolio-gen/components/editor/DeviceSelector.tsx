'use client';

import { Monitor, Smartphone, Tablet } from "lucide-react"
import Button from "@/components/ui/Button"

interface DeviceSelectorProps {
  value: 'desktop' | 'tablet' | 'mobile';
  onChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

export const DeviceSelector = ({ value, onChange }: DeviceSelectorProps) => {
  const devices = [
    { key: 'desktop' as const, icon: Monitor, label: 'Desktop' },
    { key: 'tablet' as const, icon: Tablet, label: 'Tablet' },
    { key: 'mobile' as const, icon: Smartphone, label: 'Mobile' }
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      {devices.map((device) => {
        const Icon = device.icon;
        const isActive = value === device.key;
        
        return (
          <Button
            key={device.key}
            variant={isActive ? "primary" : "ghost"}
            size="sm"
            onClick={() => onChange(device.key)}
            className={`
              h-8 px-3 gap-2
              ${isActive ? 'bg-background shadow-sm' : 'hover:bg-background/60'}
            `}
          >
            <Icon className="h-4 w-4" />
            <span className="text-xs font-medium hidden sm:inline">
              {device.label}
            </span>
          </Button>
        );
      })}
    </div>
  );
};