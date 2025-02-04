import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem } from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Fragment, useState } from "react";
import { ScrollView, Text } from "react-native";
import { StyleSheet } from "react-native";
	
export default function DropDownComponent({type}:{
  type:string
}) {
  const [selectedValue,setSelectedValue]=useState<string | null>(null)

  return (
    <Fragment>
      <Select className="w-40" selectedValue={selectedValue} onValueChange={(value)=>{
        setSelectedValue(value)
      }}>
        <SelectTrigger className="flex flex-row justify-between px-3 py-0" variant="outline" size="lg" >
          {DropDownPlaceHolder()}
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop/>
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {DropDownItems()}
          </SelectContent>
        </SelectPortal>
      </Select>
    </Fragment>
  );

  function DropDownItems(){
    if(type==='gender'){
      return(
        <Fragment>
          <SelectItem label="Male" value="Male" />
          <SelectItem label="Female" value="Female" />
          <SelectItem label="Rather Not Say" value="RNS" />
        </Fragment>
      )
    } else if(type==='age'){
      const ages=[...Array(100).keys()];
      return(
        <Fragment>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            {ages.map(age=>{
              return getAgeItem(age)
            })}
          </ScrollView>
        </Fragment>
      )
    }
  }

  function DropDownPlaceHolder(){
    if(type==='gender'){
      return(
        <SelectInput className='text-sm' placeholder="Select Gender" />
      )
    } else if(type==='age'){
      return(
        <SelectInput className='text-sm' placeholder="Select Age" />
      )
    }
  }
}

function getAgeItem(age:number){
  return(
    <SelectItem label={`${age}`} value={`${age}`} />
  )
}

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 200, 
  },
});