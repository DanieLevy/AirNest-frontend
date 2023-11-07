import React from 'react'
import ContentLoader from 'react-content-loader'

export const StayLoader = (props) => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={'100%'}
    viewBox='0 0 300 400'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='3' y='3' rx='10' ry='10' width='300' height='240' />
    <rect x='6' y='250' rx='0' ry='0' width='220' height='20' />
    <rect x='250' y='250' rx='0' ry='0' width='100%' height='20' />
    <rect x='4' y='280' rx='0' ry='0' width='100%' height='20' />
    <rect x='4' y='310' rx='0' ry='0' width='35%' height='20' />
    <rect x='4' y='340' rx='0' ry='0' width='45%' height='20' />
    <rect x='4' y='370' rx='0' ry='0' width='40%' height='20' />
  </ContentLoader>
)
