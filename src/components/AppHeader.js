import React from 'react'
import PropTypes from 'prop-types'

const AppHeader = props => {
    return (
        <div>
            <div className="App Header">
                <h1>{props.title}</h1>
            </div>
        </div>
    )
}

AppHeader.propTypes = {
    title: PropTypes.string.isRequired,

}

export default AppHeader
