import { Typography } from "@mui/material";
import { Dna } from "react-loader-spinner";
import { ICustomTypographyProps } from "../utils/types";

const CustomTypography = (props: ICustomTypographyProps) => {
  return (
    <>
      {props?.condition ? (
        <Typography
          sx={{ ...props.typegraphystyles }}
          color="text.secondary"
          gutterBottom
        >
          {props.typegraphyData}
          <span>{props.temperatureData || ``} </span>
        </Typography>
      ) : (
        <Dna
          wrapperStyle={{
            display: "block",
            "margin-left": "auto",
            "margin-right": "auto",
          }}
          visible={true}
          height={props.loaderHeightWidth ?? "80"}
          width={props.loaderHeightWidth ?? "80"}
          ariaLabel="dna-loading"
          wrapperClass="dna-wrapper"
        />
      )}
    </>
  );
};

export default CustomTypography;
