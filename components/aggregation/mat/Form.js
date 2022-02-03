import React from 'react'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'
import styled from 'styled-components'
import {
  Flex, Box,
  Label, Input, Select, Button
} from 'ooni-components'
import { countryList } from 'country-util'
import moment from 'moment'

import { categoryCodes } from '../../utils/categoryCodes'
import DatePicker from '../../DatePicker'

export const StyledLabel = styled(Label).attrs({
  my: 2,
  color: 'blue5',
})`
`

const optionsAxis = [
  'measurement_start_day',
  'input',
  'category_code',
  'probe_cc',
  'probe_asn',
  ''
]

const tomorrow = moment.utc().add(1, 'day').format('YYYY-MM-DD')
const lastMonthToday = moment.utc().subtract(30, 'day').format('YYYY-MM-DD')

const defaultDefaultValues = {
  probe_cc: '',
  probe_asn: '',
  test_name: 'web_connectivity',
  input: '',
  category_code: '',
  since: lastMonthToday,
  until: tomorrow,
  axis_x: 'measurement_start_day',
  axis_y: ''
}

export const Form = ({ onSubmit, testNames, query }) => {
  const defaultValues = Object.assign({}, defaultDefaultValues, query)
  const { handleSubmit, control, getValues } = useForm({
    defaultValues
  })
  const sortedCountries = countryList
    .sort((a,b) => (a.iso3166_name < b.iso3166_name) ? -1 : (a.iso3166_name > b.iso3166_name) ? 1 : 0)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex my={2} alignItems='center'>
        <Box width={1/3}>
          <StyledLabel>
            Country
          </StyledLabel>
          <Controller
            render={({field}) => (
              <Select {...field}>
                <option value=''>All Countries</option>
                {sortedCountries.map((c, idx) =>(
                  <option key={idx} value={c.iso3166_alpha2}>{c.iso3166_name}</option>
                ))}
              </Select>
            )}
            name='probe_cc'
            control={control}
          />
        </Box>
        <Box width={1/6}>
          <StyledLabel>
            ASN
          </StyledLabel>
          <Controller
            name='probe_asn'
            control={control}
            render={({field}) => (
              <Input
                placeholder='AS1234'
                {...field}
              />
            )}
          />
        </Box>
        <Box width={1/5} px={3}>
          <StyledLabel>
            Since
          </StyledLabel>
          <Controller
            name='since'
            control={control}
            render={({field: {onChange}}) => (
              <DatePicker
                defaultValue={defaultValues.since}
                dateFormat='YYYY-MM-DD'
                utc={true}
                timeFormat={false}
                onChange={(date) =>
                  onChange(moment.isMoment(date)
                    ? date.format('YYYY-MM-DD')
                    : date
                  )
                }
                isValidDate={currentDate => {
                  const untilValue = getValues('until')
                  if (untilValue && untilValue.length !== 0) {
                    return currentDate.isBefore(untilValue, 'day')
                  } else {
                    return currentDate.isBefore(tomorrow)
                  }
                }}
              />
            )}
          />
        </Box>
        <Box width={1/4} px={3}>
          <StyledLabel>
            Until
          </StyledLabel>
          <Controller
            name='until'
            control={control}
            render={({field: {onChange}}) => (
              <DatePicker
                defaultValue={defaultValues.until}
                dateFormat='YYYY-MM-DD'
                utc={true}
                timeFormat={false}
                onChange={(date) =>
                  onChange(moment.isMoment(date)
                    ? date.format('YYYY-MM-DD')
                    : date
                  )
                }
                isValidDate={currentDate => {
                  const sinceFilter = getValues('since')
                  if (sinceFilter && sinceFilter.length !== 0) {
                    return currentDate.isAfter(sinceFilter) && currentDate.isSameOrBefore(tomorrow)
                  } else {
                    return currentDate.isSameOrBefore(tomorrow)
                  }
                }}
              />
            )}
          />
        </Box>
      </Flex>
      <Flex justifyContent='space-between'  alignItems='center'>
        <Box>
          <StyledLabel>
            Test Name
          </StyledLabel>
          <Controller
            name='test_name'
            control={control}
            render={({field}) => (
              <Select {...field}>
                {testNames.map((test, idx) => (
                  <option key={idx} value={test.id}>{test.name}</option>
                ))}
              </Select>
            )}
          />
        </Box>
        <Box>
          <StyledLabel>
            Input
          </StyledLabel>
          <Controller
            name='input'
            control={control}
            render={({field}) => (
              <Input
                placeholder='https://twitter.com/OpenObservatory'
                {...field}
              />
            )}
          />
        </Box>
        <Box width={1/5}>
          <StyledLabel>
            Category Codes
          </StyledLabel>
          <Controller
            name='category_code'
            control={control}
            render={({field}) => (
              <Select {...field}>
                <option value="">ALL</option>
                {categoryCodes.map(([code, label], idx) => (
                  <option key={idx} value={code}>{label}</option>
                ))}
              </Select>
            )}
          />
        </Box>
        <Box>
          <StyledLabel>
            X Axis
          </StyledLabel>
          <Controller
            name='axis_x'
            control={control}
            render={({field}) => (
              <Select {...field}>
                {optionsAxis.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </Select>
            )}
          />
        </Box>
        <Box>
          <StyledLabel>
            Y Axis
          </StyledLabel>
          <Controller
            name='axis_y'
            control={control}
            render={({field}) => (
              <Select {...field}>
                {optionsAxis.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </Select>
            )}
          />
        </Box>
      </Flex>
      <Flex my={4}>
        <Button type='submit'>Submit</Button>
      </Flex>

    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  testNames: PropTypes.array,
  query: PropTypes.shape({
    axis_x: PropTypes.string,
    axis_y: PropTypes.string,
    since: PropTypes.string,
    until: PropTypes.string,
    test_name: PropTypes.string,
    input: PropTypes.string,
    probe_cc: PropTypes.string,
    category_code: PropTypes.string,
  })
}
