import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IMultipleSelectProps } from "../utils/types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

export default function MultipleSelect(props: IMultipleSelectProps) {
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    console.log(" value ", value);
    props?.setterFunction(
      // On autofill we get a stringified value.
      // typeof value === "string" ? value.split(",") : value
      [...value.split(",")]
    );
  };

  console.log("props asdf", props?.data);

  // let inpuCategoryHere : string;
  // switch (props?.inputCategory) {
  //   case ISelectedCriteria.Today:
  //     inpuCategoryHere = ISelectedCriteria.Hourly;
  //     break;

  //   default:
  //     break;
  // }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">
          {props?.inputCategory}
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={props?.setVariable}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {props?.data?.slice(0, 23)?.map((item: any, index: number) => {
            return (
              <MenuItem
                key={item + index}
                value={
                  props?.inputCategory === "Select Category"
                    ? item
                    : item?.time?.split("T")?.[1]
                }
                //   style={getStyles(time, props?.selectedTime, theme)}
              >
                {props?.inputCategory === "Select Category"
                  ? item
                  : item?.time?.split("T")?.[1]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
