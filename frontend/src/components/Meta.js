import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description}></meta>
      <meta name='keywords' content={keywords}></meta>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to your Summer Dream',
  description: 'Best summer must haves on trend',
  keywords: 'bikini, bikinis, dress, activewear, leggings, athlesure',
}
export default Meta
