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
import { BodyLarge, H2 } from './layout/HeaderTags'
import * as questionRegistryService from '../services/questionRegistryService'

const getValueByType = (value, type = 'array') => {
  return value ? value : type !== 'array' ? '' : []
}

const getAttribute = (value) => {
  return value.attributeName ? value.attributeName : value?.name
}

const getType = (object) => {
  return object?.type ? object?.type : 'array'
}

const FilterButton = ({
  filters = [],
  object,
  getObject,
  filterButtonText,
  resetButtonText,
  isResettableFilter,
  setAlert,
  _box,
  _filterButton,
  _resetButton,
  _optionButton,
  _actionSheet,
  _button
}) => {
  const { t } = useTranslation()
  const [filtered, setFiltered] = React.useState(false)
  const [inputs, setInputs] = React.useState([])
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
      setDependentData(formData, value)
      setGroupValue({
        ...groupValue,
        [attributeName]: type === 'stingValueArray' ? [value] : value
      })
    }
  }

  const handelSetFormData = (data) => {
    if (data?.dependent) {
      let dependent = ['gradeLevel'].includes(data.dependent)
        ? 'grade'
        : data.dependent
      if (!groupValue[dependent]) {
        const nameData = inputs.find((e) => e.attributeName === dependent)
        if (setAlert) {
          setAlert(
            <BodyLarge>
              Please select the <H2>{nameData.name}</H2> first
            </BodyLarge>
          )
        }
      } else {
        setFormData(data)
      }
    } else {
      setFormData(data)
    }
  }

  const setDependentData = async (data, value) => {
    let attributeName = ['grade'].includes(data.attributeName)
      ? 'gradeLevel'
      : data.attributeName
    const nameData = inputs.find((e) => e.dependent === attributeName)
    if (nameData?.urlName === 'getSubjectsList') {
      const selectData = await questionRegistryService.getSubjectsList({
        adapter: groupValue?.source,
        gradeLevel: value
      })
      setInputs(
        inputs.map((e) => {
          if (e.attributeName === nameData.attributeName) {
            return { ...e, data: selectData.map((e) => e.code) }
          }
          return e
        })
      )
    } else if (nameData?.urlName === 'getTopicsList') {
      const selectData = await questionRegistryService.getTopicsList({
        adapter: groupValue?.source,
        subject: value
      })
      setInputs(
        inputs.map((e) => {
          if (e.attributeName === nameData.attributeName) {
            return { ...e, data: selectData }
          }
          return e
        })
      )
    }
  }

  React.useEffect(() => {
    setInputs(filters)
  }, [filters])

  return (
    <Box bg='white' roundedBottom={'xl'} {..._box}>
      <HStack justifyContent='end' alignItems='center'>
        {!filtered ? (
          <Button
            rounded='full'
            colorScheme='button'
            variant='outline'
            px='5'
            onPress={(e) => setFiltered(true)}
            rightIcon={<IconByName name='ArrowDownSLineIcon' isDisabled />}
            {..._button}
            {..._filterButton}
          >
            <BodyLarge textTransform='inherit' color={'primary'}>
              {filterButtonText ? filterButtonText : t('FILTER')}
            </BodyLarge>
          </Button>
        ) : (
          <ScrollView horizontal={true}>
            <HStack justifyContent='end' alignItems='center'>
              {inputs.map((value, index) => {
                const attributeName = value.attributeName
                  ? value.attributeName
                  : value.name
                const isSelect =
                  groupValue[attributeName] &&
                  Array.isArray(groupValue[attributeName])
                    ? groupValue[attributeName][0]
                    : groupValue[attributeName]
                    ? groupValue[attributeName]
                    : false
                const overrideBtnProp = isSelect
                  ? { ..._button, bg: 'primary' }
                  : _button
                const overrideOptionBtnProp = isSelect
                  ? { ..._optionButton, bg: 'primary' }
                  : _optionButton
                return (
                  <Button
                    key={index}
                    mr='1'
                    rounded='full'
                    {...(isSelect ? {} : { variant: 'outline' })}
                    px='5'
                    rightIcon={
                      <IconByName
                        color={isSelect ? 'white' : 'primary'}
                        name='ArrowDownSLineIcon'
                        isDisabled
                      />
                    }
                    onPress={(e) => {
                      handelSetFormData(value)
                    }}
                    {...overrideBtnProp}
                    {...overrideOptionBtnProp}
                  >
                    <Text color={isSelect ? 'white' : 'primary'}>
                      {isSelect ? '' : value.name}
                      {isSelect ? (
                        <Tooltip
                          label={groupValue?.[attributeName].toString()}
                          openDelay={50}
                          bg='white'
                        >
                          {groupValue[attributeName] &&
                          Array.isArray(groupValue[attributeName])
                            ? groupValue[attributeName][0]
                            : groupValue[attributeName]
                            ? groupValue[attributeName]
                            : `Select ${t(value.name)}`}
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
                variant='outline'
                px='5'
                rightIcon={
                  <IconByName
                    color='primary'
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
                <BodyLarge textTransform='inherit' color='primary'>
                  {resetButtonText ? resetButtonText : t('RESET_FILTER')}
                </BodyLarge>
              </Button>
            </HStack>
          </ScrollView>
        )}
      </HStack>

      {formData?.name ? (
        <Actionsheet isOpen={formData?.name} onClose={() => setFormData({})}>
          <Actionsheet.Content
            alignItems={'left'}
            bg='classCard.500'
            {..._actionSheet}
          >
            <HStack justifyContent={'space-between'}>
              <Stack p={5} pt={2} pb='15px'>
                <H2>
                  {`${t('Select')} ${formData?.name ? formData?.name : ''}`}
                </H2>
              </Stack>
              <IconByName
                name='CloseCircleLineIcon'
                color='classCard.900'
                onPress={(e) => setFormData({})}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg={'white'} width={'100%'} maxH='80%'>
            <ScrollView>
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
                          ? 'primary'
                          : 'gray'
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
                <React.Fragment />
              )}
              {formData?.data &&
                formData?.data.map((item, index) => {
                  let value = item?.value ? item?.value : item
                  let label = item?.label ? item?.label : item
                  return (
                    <Pressable
                      p='3'
                      key={index}
                      onPress={(e) => handleSelectVlaue(value)}
                      bg={
                        (type !== 'array' && valueArr === value) ||
                        (type === 'stingValueArray' && valueArr.includes(value))
                          ? 'lightGray2'
                          : 'white'
                      }
                    >
                      <HStack
                        space='2'
                        colorScheme='button'
                        alignItems='center'
                      >
                        {type === 'array' ? (
                          <IconByName
                            isDisabled
                            color={
                              valueArr.includes(value) ? 'primary' : 'gray'
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
                        <Text>{label}</Text>
                      </HStack>
                    </Pressable>
                  )
                })}
            </ScrollView>
            <Box p='5'>
              <Button
                colorScheme='button'
                _text={{ color: 'white' }}
                onPress={(e) => {
                  setFormData({})
                  if (getObject) {
                    getObject(groupValue)
                  }
                }}
              >
                {t('SELECT')}
              </Button>
            </Box>
          </Box>
        </Actionsheet>
      ) : (
        <React.Fragment />
      )}
    </Box>
  )
}

export default React.memo(FilterButton)
