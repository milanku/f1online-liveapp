import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.PAGE_BACK_COLOR};
`

const Button = styled.div`
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ICONS = {}

export default function LiveBottomButtons({ onSitePicked }) {
  return (
    <Container>
      <Button onClick={() => onSitePicked(0)}>0</Button>
      <Button onClick={() => onSitePicked(1)}>1</Button>
      <Button onClick={() => onSitePicked(2)}>2</Button>
    </Container>
  )
}
