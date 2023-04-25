import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props: IMultipleSelectProps) {
  const theme = useTheme();
 

  const handleChange = (event:any) => {
    const {
      target: { value },
    } = event;
    props?.setSelectedTime(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Hourly</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={props?.selectedTime}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {props?.dailyWeatherData?.slice(0, 23)?.map((time: any, index : number) => (
            <MenuItem
              key={time + index}
              value={time?.time?.split("T")?.[1]}
            //   style={getStyles(time, props?.selectedTime, theme)}
            >
              {time?.time?.split("T")?.[1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
