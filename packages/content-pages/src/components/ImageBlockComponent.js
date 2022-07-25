import { Box, Image } from "native-base";
const ImageBlockComponent = (props) => {
  return (
    <Box
      width="100%"
      p="5"
      justifyContent="center"
      alignItems={
        props.align === "left"
          ? "flex-start"
          : props.align === "right"
          ? "flex-end"
          : "center"
      }
    >
      <img src={props.src} style={{ objectFit: "cover" }}></img>
    </Box>
  );
};
export default ImageBlockComponent;
