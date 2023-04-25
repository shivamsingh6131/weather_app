import { Typography } from "@mui/material";
import React from "react";
import { Dna } from "react-loader-spinner";

interface CustomTypographyProps {
  component?: React.Component;
  condition: boolean;
  typegraphyData: any;
  temperatureData?: string;
  typegraphystyles?:any;
  additionalProps?:any;
}

const CustomTypography = (props: CustomTypographyProps) => {
    console.log("asfd" , typeof props?.typegraphyData);
  return (
    <>
      {props?.condition ? (
        <Typography sx={{...props.typegraphystyles}} color="text.secondary" gutterBottom>
          {props.typegraphyData}
          <span>{props.temperatureData || ``} </span>
        </Typography>
      ) : (
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      )}
    </>
  );
};

export default CustomTypography;
