import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cn } from '@/lib/utils';

export type Option = {
    label: string;
    value: string;
}

interface ISelectAppProps extends React.ComponentProps<typeof Select> {
    label: string;
    options: Option[];
    triggerClassName?: string;
    placeholder?: string;
}

export default function SelectApp({ label, options, triggerClassName, placeholder, ...props }: ISelectAppProps) {
    return (
        <Select {...props}>
            <SelectTrigger className={cn(triggerClassName)}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
