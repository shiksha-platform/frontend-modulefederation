import { BodyMedium, Collapsible } from "@shiksha/common-lib";

const CollapsibleBlockComponent = ({ header, content }) => {
  return (
    <Collapsible
      header={header}
      children={<BodyMedium py="4">{content}</BodyMedium>}
      p="3"

    ></Collapsible>
  );
};
export default CollapsibleBlockComponent;
