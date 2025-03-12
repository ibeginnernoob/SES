import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectItem,
} from '@/components/ui/select'
import { ChevronDownIcon } from '@/components/ui/icon'
import { Fragment, useState } from 'react'
import { ScrollView, Text } from 'react-native'
import { StyleSheet } from 'react-native'

export default function DropDownComponent({
    type,
    inputValue,
    setInputValue,
}: {
    type: string
    inputValue: string | null
    setInputValue: (para: string) => void
}) {
    return (
        <Fragment>
            <Select
                className="w-40"
                selectedValue={inputValue}
                onValueChange={(value) => {
                    setInputValue(value)
                }}
            >
                <SelectTrigger
                    className="flex flex-row justify-between"
                    variant="outline"
                    size="lg"
                >
                    <SelectInput
                        className="text-sm"
                        placeholder="Select Option"
                    />
                    <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {DropDownItems()}
                    </SelectContent>
                </SelectPortal>
            </Select>
        </Fragment>
    )

    function DropDownItems() {
        if (type === 'height') {
            const height = [...Array(301).keys()]
            return (
                <Fragment>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.scrollView}
                    >
                        {height.map((height, index) => {
                            return getDropDownItem(height, index)
                        })}
                    </ScrollView>
                </Fragment>
            )
        } else if (type === 'age') {
            const age = [...Array(101).keys()]
            return (
                <Fragment>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.scrollView}
                    >
                        {age.map((age, index) => {
                            return getDropDownItem(age, index)
                        })}
                    </ScrollView>
                </Fragment>
            )
        } else if (type === 'weight') {
            const weight = [...Array(201).keys()]
            return (
                <Fragment>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.scrollView}
                    >
                        {weight.map((weight, index) => {
                            return getDropDownItem(weight, index)
                        })}
                    </ScrollView>
                </Fragment>
            )
        }
    }
}

function getDropDownItem(age: number, index: number) {
    return <SelectItem key={index} label={`${age}`} value={`${age}`} />
}

const styles = StyleSheet.create({
    scrollView: {
        maxHeight: 300,
    },
})
