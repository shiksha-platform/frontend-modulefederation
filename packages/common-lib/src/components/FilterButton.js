import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Stack,
  Text,
  Tooltip
} from 'native-base'
import React from 'react'
import { useTranslation } from 'react-i18next'
import IconByName from './IconByName'

const getValueByType = (value, type = 'array') => {
  return value ? value : type !== 'array' ? '' : []
}

const getAttribute = (value) => {
  return value.attributeName ? value.attributeName : value?.name
}

const getType = (object) => {
  return object?.type ? object?.type : 'array'
}

export default function FilterButton({
  filters = [],
  object,
  getObject,
  filterButtonText,
  resetButtonText,
  isResettableFilter,
  _box,
  _filterButton,
  _resetButton,
  _optionButton,
  _actionSheet,
  _button
}) {
  const { t } = useTranslation()
  const [filtered, setFiltered] = React.useState(false)
  const [groupValue, setGroupValue] = React.useState(object ? object : {})
  const [formData, setFormData] = React.useState({})
  const attributeName = getAttribute(formData)
  const type = getType(formData)
  const valueArr = getValueByType(groupValue?.[attributeName], type)

  const handleSelectVlaue = (value) => {
    if (type === 'array') {
      if (valueArr.includes(value)) {
        const newData = object[attributeName].filter((e) => value !== e)
        setGroupValue({
          ...groupValue,
          [attributeName]: newData.length > 0 ? newData : null
        })
      } else {
        setGroupValue({
          ...groupValue,
          [attributeName]: [...valueArr, value]
        })
      }
    } else if (valueArr === value) {
      setGroupValue({
        ...groupValue,
        [attributeName]: type === 'stingValueArray' ? [] : ''
      })
    } else {
      setGroupValue({
        ...groupValue,
        [attributeName]: type === 'stingValueArray' ? [value] : value
      })
    }
  }

  return (
    <Box bg='white' roundedBottom={'xl'} {..._box}>
      <HStack justifyContent='end' alignItems='center'>
        {!filtered ? (
          <Button
            rounded='full'
            colorScheme='button'
            variant='outline'
            px='5'
            _text={{
              textTransform: 'inherit',
              fontWeight: '500',
              fontSize: '14px'
            }}
            onPress={(e) => setFiltered(true)}
            rightIcon={<IconByName name='ArrowDownSLineIcon' isDisabled />}
            {..._button}
            {..._filterButton}
          >
            {filterButtonText ? filterButtonText : t('FILTER')}
          </Button>
        ) : (
          <ScrollView horizontal={true}>
            <HStack justifyContent='end' alignItems='center'>
              {filters.map((value, index) => {
                const attributeName = value.attributeName
                  ? value.attributeName
                  : value.name
                const isSelect = Array.isArray(groupValue?.[attributeName])
                  ? groupValue?.[attributeName].filter((e) =>
                      value?.data.includes(e)
                    ).length
                  : value?.data.includes(groupValue?.[attributeName])
                return (
                  <Button
                    key={index}
                    mr='1'
                    rounded='full'
                    colorScheme='button'
                    {...(isSelect ? {} : { variant: 'outline' })}
                    px='5'
                    rightIcon={
                      <IconByName
                        color={isSelect ? 'white' : 'button.500'}
                        name='ArrowDownSLineIcon'
                        isDisabled
                      />
                    }
                    onPress={(e) => {
                      if (value?.data && value?.data.length > 0) {
                        setFormData(value)
                      }
                    }}
                    {...(isSelect ? { ..._button, bg: 'button.500' } : _button)}
                    {...(isSelect
                      ? { ..._optionButton, bg: 'button.500' }
                      : _optionButton)}
                  >
                    <Text color={isSelect ? 'white' : 'button.500'}>
                      {isSelect ? '' : value.name}
                      {isSelect ? (
                        <Tooltip
                          label={groupValue?.[attributeName].toString()}
                          openDelay={50}
                        >
                          {Array.isArray(groupValue?.[attributeName])
                            ? groupValue?.[attributeName][0]
                            : groupValue?.[attributeName]}
                        </Tooltip>
                      ) : (
                        <React.Fragment />
                      )}
                    </Text>
                  </Button>
                )
              })}
              <Button
                mr='1'
                rounded='full'
                colorScheme='button'
                variant='outline'
                px='5'
                _text={{
                  textTransform: 'inherit',
                  fontWeight: '500',
                  fontSize: '14px'
                }}
                rightIcon={
                  <IconByName
                    color='button.500'
                    name='ArrowRightSFillIcon'
                    isDisabled
                  />
                }
                onPress={(e) => {
                  setFiltered(false)
                  if (isResettableFilter) {
                    setGroupValue({})
                    if (getObject) getObject({})
                  }
                }}
                {..._button}
                {..._resetButton}
              >
                {resetButtonText ? resetButtonText : t('RESET_FILTER')}
              </Button>
            </HStack>
          </ScrollView>
        )}
      </HStack>
      <Actionsheet isOpen={formData?.name} onClose={() => setFormData({})}>
        <Actionsheet.Content
          alignItems={'left'}
          bg='classCard.500'
          {..._actionSheet}
        >
          <HStack justifyContent={'space-between'}>
            <Stack p={5} pt={2} pb='25px'>
              <Text fontSize='16px' fontWeight={'600'}>
                {`${t('SELECT')} ${formData?.name ? formData?.name : ''}`}
              </Text>
            </Stack>
            <IconByName
              name='CloseCircleLineIcon'
              onPress={(e) => setFormData({})}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg='white' width={'100%'}>
          {type === 'array' ? (
            <Pressable
              p='3'
              onPress={(e) => {
                if (
                  formData?.data &&
                  valueArr &&
                  formData?.data?.length === valueArr?.length
                ) {
                  setGroupValue({
                    ...groupValue,
                    [formData?.attributeName]: null
                  })
                } else {
                  setGroupValue({
                    ...groupValue,
                    [formData?.attributeName]: formData.data
                  })
                }
              }}
            >
              <HStack space='2' colorScheme='button' alignItems='center'>
                <IconByName
                  isDisabled
                  color={
                    formData?.data &&
                    valueArr &&
                    formData?.data?.length === valueArr?.length
                      ? 'button.500'
                      : 'gray.300'
                  }
                  name={
                    formData?.data &&
                    valueArr &&
                    formData?.data?.length === valueArr?.length
                      ? 'CheckboxLineIcon'
                      : 'CheckboxBlankLineIcon'
                  }
                />
                <Text>{t('Select All')}</Text>
              </HStack>
            </Pressable>
          ) : (
            ''
          )}
          {formData?.data &&
            formData?.data.map((value, index) => {
              return (
                <Pressable
                  p='3'
                  key={index}
                  onPress={(e) => handleSelectVlaue(value)}
                  bg={
                    (type !== 'array' && valueArr === value) ||
                    (type === 'stingValueArray' && valueArr.includes(value))
                      ? 'gray.200'
                      : 'white'
                  }
                >
                  <HStack space='2' colorScheme='button' alignItems='center'>
                    {type === 'array' ? (
                      <IconByName
                        isDisabled
                        color={
                          valueArr.includes(value) ? 'button.500' : 'gray.300'
                        }
                        name={
                          valueArr.includes(value)
                            ? 'CheckboxLineIcon'
                            : 'CheckboxBlankLineIcon'
                        }
                      />
                    ) : (
                      ''
                    )}
                    <Text>{value}</Text>
                  </HStack>
                </Pressable>
              )
            })}
          <Box p='5'>
            <Button
              colorScheme='button'
              _text={{ color: 'white' }}
              onPress={(e) => {
                if (getObject) {
                  getObject(groupValue)
                }
                setFormData({})
              }}
            >
              {t('SELECT')}
            </Button>
          </Box>
        </Box>
      </Actionsheet>
    </Box>
  )
}
