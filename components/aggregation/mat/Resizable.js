import React, { useEffect, useCallback, useState } from 'react'
import { Box } from 'ooni-components'
import styled from 'styled-components'
import { useResizeDetector } from 'react-resize-detector'

export const ResizableYBox = styled(Box)`
  position: relative;
  border: 2px solid ${props => props.theme.colors.gray1};
  overflow: hidden;
  resize: vertical;
  min-height: ${props => props.minHeight ?? 250}px;
  /* max-height: 100vh; */
  padding: 16px;
`

export const ResizableBox = ({ children, onResize, ...props}) => {
  const { width, height, ref } = useResizeDetector({
    onResize,
    handleWidth: false,
    skipOnMount: true,
    refreshMode: 'debounce',
    refreshRate: 500,
  })
  return (
    <ResizableYBox ref={ref} {...props}>
      {children}
    </ResizableYBox>
  )
}
