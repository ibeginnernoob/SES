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
import { ScrollView, Text, Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'

const { width } = Dimensions.get("window");

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
                className=""
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
                <SelectPortal className=''>
                    <SelectBackdrop />
                    <SelectContent className={`pt-2 text-left`}>
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

function getDropDownItem(value: number, index: number) {
    return <SelectItem className='px-4' key={index} label={`${value}`} value={`${value}`} />
}

const styles = StyleSheet.create({
    scrollView: {
        maxHeight: 300,
		width: width,
		paddingBottom: 20,
		marginBottom: 20
    },
})
