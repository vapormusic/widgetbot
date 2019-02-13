import ExpandableImage from 'styled-elements/ExpandableImage'
import styled, { css } from 'typed-emotion'
import { Scale } from 'styled-elements/ScaledImage'

interface ImageProps {
  height: number
  width: number
}

export const Image = styled<ImageProps, any>(ExpandableImage)`
  display: block;
  margin: 10px 0;
  cursor: pointer;
  border-radius: 3px;
  ${props =>
    new Scale({
      ...props,
      maxWidth: 400,
      maxHeight: 300
    }).css};

  @media (max-width: 700px) {
    width: 65%;
    height: auto;
  }

  @media (max-width: 650px) {
    width: 70%;
  }

  @media (max-width: 600px) {
    width: 80%;
  }
`
