import React from 'react'
import { IconButton as IconButtonCustom, Stack } from 'native-base'

function IconButton({ icon, isDisabled, prefix, ...props }) {
  if (!isDisabled) {
    return <IconButtonCustom {...props} icon={icon} />
  } else {
    return <Stack {...props}>{icon}</Stack>
  }
}

const loadComponent = (name) => {
  const Component = React.lazy(() =>
    import(`remixicon-react/${name}`)
  );
  return Component;
}


export default function IconByNameCopy({ _icon, ...props }) {
  const Icon = loadComponent(componentNumber);
  return (<IconButton {...props} icon={<Icon {...(_icon ? _icon : {})} />} />);
}