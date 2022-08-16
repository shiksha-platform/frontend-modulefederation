import { BodyMedium, Collapsible } from "@shiksha/common-lib";

const CollapsibleBlockComponent = ({ collapsibleHeader, collapsibleContent }) => {
  return (
    <Collapsible
      defaultCollapse
      header={collapsibleHeader}
      children={<BodyMedium py="4">{collapsibleContent}</BodyMedium>}
      p="3"
    ></Collapsible>
  );
};
export default CollapsibleBlockComponent;
