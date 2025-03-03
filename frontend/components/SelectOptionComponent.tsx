import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@/components/ui/select';
import { ChevronDownIcon } from './ui/icon';
import { useState } from 'react';

export default function SelectOptionComponent({ inputValue, setInputValue } : {
    inputValue: string | null,
    setInputValue: (para: string) => void
}) {

    return (
        <Select
            className='w-40'
            selectedValue={inputValue}
            onValueChange={(value) => {
                setInputValue(value)
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
                    <SelectItem label="Male" value="male" />
                    <SelectItem label="Female" value="female" />
                    <SelectItem label="Rather not say" value="NA" />
                </SelectContent>
            </SelectPortal>
        </Select>
    )
}