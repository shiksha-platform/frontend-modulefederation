import { Box, HStack, Stack, Text, Tooltip, VStack } from 'native-base'
import React from 'react'

export default function ProgressBar({
  data,
  h,
  sufix,
  isTextShow,
  isTextInBar,
  isLabelCountHide,
  _bar,
  _labelCount,
  _textInBar,
  legendType,
  _legendType,
  ...props
}) {
  let total = data.reduce((a, b) => a + b['value'], 0)

  let values =
    data &&
    !isLabelCountHide &&
    data.length &&
    data.map(function (item, i) {
      if (item.value > 0) {
        return (
          <Box
            float='left'
            textAlign='center'
            color={item.color}
            w={(item.value / total) * 100 + '%'}
            key={i}
            _text={{
              color: 'white',
              bg: item.color,
              w: 'fit-content',
              px: '1',
              py: '2px',
              mb: '1',
              rounded: 'sm',
              fontSize: 10,
              fontWeight: 600
            }}
            {..._labelCount}
          >
            {item.value.toString().padStart(2, '0') + (sufix ? sufix : '')}
          </Box>
        )
      }
      return undefined
    })

  let bars =
    data &&
    data.length &&
    data.map(function (item, i) {
      if (item.value > 0) {
        return (
          <Tooltip key={i} label={item.name} openDelay={50}>
            <Box
              h={h ? h : '5px'}
              bg={item.color}
              w={(item.value / total) * 100 + '%'}
              textAlign='center'
              justifyContent='center'
            >
              {isTextInBar ? (
                <Text
                  color={'white'}
                  whiteSpace='nowrap'
                  {..._textInBar}
                  {...(item?._textInBar ? item?._textInBar : {})}
                >
                  {item.name}
                </Text>
              ) : (
                ''
              )}
            </Box>
          </Tooltip>
        )
      }
      return undefined
    })

  let legends
  if (isTextShow) {
    legends =
      data &&
      data.length &&
      data.map(function (item, i) {
        if (item.value > 0) {
          return (
            <Text
              key={i}
              color={item.color}
              {..._legendType}
              {...(item?._legendType ? item?._legendType : {})}
            >
              {!legendType && <Text fontSize='25px'>●</Text>}
              <Text>{item.name}</Text>
            </Text>
          )
        }
        return undefined
      })
  }

  const getLegendPattern = () => {
    if (legendType === 'separated') {
      return (
        <HStack
          alignSelf='space-between'
          space={1}
          justifyContent='space-between'
        >
          {legends === '' ? '' : legends}
        </HStack>
      )
    }
    if (legendType === 'linear') {
      return (
        <HStack
          alignSelf='space-between'
          space={1}
          justifyContent='space-between'
        >
          {legends === '' ? '' : legends}
        </HStack>
      )
    }
    return (
      <HStack alignSelf='center' space={1} justifyContent='center'>
        {legends === '' ? '' : legends}
      </HStack>
    )
  }

  return (
    <Stack {...props}>
      <VStack>
        {!isLabelCountHide ? (
          <HStack>{values === '' ? '' : values}</HStack>
        ) : (
          ''
        )}
        <HStack overflow='hidden' rounded='xl' {..._bar}>
          {bars === '' ? '' : bars}
        </HStack>
        {!isTextInBar && isTextShow ? getLegendPattern() : ''}
      </VStack>
    </Stack>
  )
}
