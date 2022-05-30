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
  const [groupValue, setGroupValue] = React.useState({})
  const [filterData, setFilterData] = React.useState(false)
  const [selectData, setSelectData] = React.useState([])

  React.useState(() => {
    if (object) setGroupValue(object)
  }, [object])

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
                const isSelect =
                  groupValue?.[attributeName] &&
                  groupValue?.[attributeName].filter((e) =>
                    value?.data.includes(e)
                  ).length
                return (
                  <Button
                    key={index}
                    mr='1'
                    rounded='full'
                    colorScheme='button'
                    {...(isSelect > 0 ? {} : { variant: 'outline' })}
                    px='5'
                    rightIcon={
                      <IconByName
                        color={isSelect > 0 ? 'white' : 'button.500'}
                        name='ArrowDownSLineIcon'
                        isDisabled
                      />
                    }
                    onPress={(e) => {
                      if (value?.data && value?.data.length > 0) {
                        setFilterData(value)
                        setSelectData(
                          groupValue?.[attributeName]
                            ? groupValue?.[attributeName]
                            : []
                        )
                      }
                    }}
                    {...(isSelect > 0
                      ? { ..._button, bg: 'button.500' }
                      : _button)}
                    {...(isSelect > 0
                      ? { ..._optionButton, bg: 'button.500' }
                      : _optionButton)}
                  >
                    <Text color={isSelect > 0 ? 'white' : 'button.500'}>
                      {isSelect > 0 ? '' : value.name}
                      {isSelect > 0 && groupValue?.[attributeName][0] ? (
                        <Tooltip
                          label={groupValue?.[attributeName].toString()}
                          openDelay={50}
                        >
                          {groupValue?.[attributeName][0]}
                        </Tooltip>
                      ) : (
                        ''
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
      <Actionsheet isOpen={filterData} onClose={() => setFilterData()}>
        <Actionsheet.Content
          alignItems={'left'}
          bg='classCard.500'
          {..._actionSheet}
        >
          <HStack justifyContent={'space-between'}>
            <Stack p={5} pt={2} pb='25px'>
              <Text fontSize='16px' fontWeight={'600'}>
                {`${t('SELECT')} ${filterData.name}`}
              </Text>
            </Stack>
            <IconByName
              name='CloseCircleLineIcon'
              onPress={(e) => setFilterData()}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg='white' width={'100%'}>
          <Pressable
            px='5'
            pt='5'
            onPress={(e) => {
              if (
                filterData?.data &&
                selectData &&
                filterData?.data?.length === selectData?.length
              ) {
                setSelectData([])
              } else {
                setSelectData(filterData.data)
              }
            }}
          >
            <HStack space='2' colorScheme='button' alignItems='center'>
              <IconByName
                isDisabled
                color={
                  filterData?.data &&
                  selectData &&
                  filterData?.data?.length === selectData?.length
                    ? 'button.500'
                    : 'gray.300'
                }
                name={
                  filterData?.data &&
                  selectData &&
                  filterData?.data?.length === selectData?.length
                    ? 'CheckboxLineIcon'
                    : 'CheckboxBlankLineIcon'
                }
              />
              <Text>{t('Select All')}</Text>
            </HStack>
          </Pressable>
          {filterData?.data &&
            filterData?.data.map((value, index) => (
              <Pressable
                px='5'
                pt='5'
                key={index}
                onPress={(e) => {
                  if (selectData.includes(value)) {
                    setSelectData(selectData.filter((e) => value !== e))
                  } else {
                    setSelectData([...selectData, value])
                  }
                }}
              >
                <HStack space='2' colorScheme='button' alignItems='center'>
                  <IconByName
                    isDisabled
                    color={
                      selectData.includes(value) ? 'button.500' : 'gray.300'
                    }
                    name={
                      selectData.includes(value)
                        ? 'CheckboxLineIcon'
                        : 'CheckboxBlankLineIcon'
                    }
                  />
                  <Text>{value}</Text>
                </HStack>
              </Pressable>
            ))}
          <Box p='5'>
            <Button
              colorScheme='button'
              _text={{ color: 'white' }}
              onPress={(e) => {
                const attributeName = filterData.attributeName
                  ? filterData.attributeName
                  : filterData.name
                setGroupValue({ ...groupValue, [attributeName]: selectData })
                if (getObject)
                  getObject({ ...groupValue, [attributeName]: selectData })
                setFilterData({})
                setSelectData([])
              }}
            >
              {t('CONTINUE')}
            </Button>
          </Box>
        </Box>
      </Actionsheet>
    </Box>
  )
}
