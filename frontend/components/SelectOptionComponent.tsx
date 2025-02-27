import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@/components/ui/select';
import { ChevronDownIcon } from './ui/icon';
import { useState } from 'react';

export default function SelectOptionComponent() {
    const [selectedValue, setSelectedValue] = useState<string | null>(null)

    return (
        <Select
            className='w-40'
            selectedValue={selectedValue}
            onValueChange={(value) => {
            setSelectedValue(value)
            }}
        >
            <SelectTrigger variant="outline" size="lg" className="flex flex-row justify-between">
                <SelectInput className='text-sm' placeholder="Select option" />
                <SelectIcon className='mr-3' as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                    <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="UX Research" value="ux" />
                    <SelectItem label="Web Development" value="web" />
                    <SelectItem
                        label="Cross Platform Development Process"
                        value="Cross Platform Development Process"
                    />
                    <SelectItem label="UI Designing" value="ui" isDisabled={true} />
                    <SelectItem label="Backend Development" value="backend" />
                </SelectContent>
            </SelectPortal>
        </Select>
    )
}