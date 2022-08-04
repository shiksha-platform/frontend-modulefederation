// Lib
import * as React from "react";
import { Avatar } from "native-base";

// Interface
export interface IAvatarGroup {
  avatarList: Array<{
    size: string;
    bg: string;
    source: {
      uri: string;
    };
    text: string;
  }>;
}

// Generates a list of avatars on the basis of passed props
const AvatarGroup: React.FC<IAvatarGroup> = ({ avatarList }) => {
  return (
    <Avatar.Group
      // @ts-ignore
      _avatar={{
        size: "md",
      }}
    >
      {avatarList.map((avt, idx) => (
        <Avatar
          key={`${idx} avt`}
          size={avt.size}
          bg={avt.bg}
          source={avt.source}
        >
          {avt.text}
        </Avatar>
      ))}
    </Avatar.Group>
  );
};
export default AvatarGroup;
