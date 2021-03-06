/*
 * Copyright (C) 2018 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from '@instructure/ui-forms/lib/components/Checkbox'
import Select from '@instructure/ui-forms/lib/components/Select'
import TextArea from '@instructure/ui-forms/lib/components/TextArea'
import I18n from 'i18n!edit_rubric'

const FreeFormComments = (props) => {
  const { savedComments, comments, saveLater, setComments, setSaveLater } = props
  const first = <option key="first" value="first">{I18n.t('[ Select ]')}</option>

  const options = savedComments.map((comment, ix) => (
    // eslint-disable-next-line react/no-array-index-key
    <option key={ix} value={ix.toString()}>{comment}</option>
  ))
  const selector = [
    (
      <Select
        key="select"
        label={I18n.t('Saved Comments')}
        assistiveText={I18n.t('Select from saved comments')}
        onChange={(_unused, el) => { setComments(savedComments[el.value])} }
      >
        {[first, ...options]}
      </Select>
    ),
    <br key="br" />
  ]

  return (
    <div className="edit-freeform-comments">
      {options.length > 0 ? selector : null}
      <TextArea
        label={I18n.t('Comments')}
        maxHeight="50rem"
        onChange={(e) => setComments(e.target.value)}
        resize="vertical"
        size="small"
        value={comments}
      />
      <br />
      <Checkbox
        checked={saveLater}
        label={I18n.t('Save this comment for reuse')}
        size="small"
        onChange={(event) => setSaveLater(event.target.checked)}
      />
    </div>
  )
}
FreeFormComments.propTypes = {
  savedComments: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.string,
  saveLater: PropTypes.bool,
  setComments: PropTypes.func.isRequired,
  setSaveLater: PropTypes.func.isRequired
}
FreeFormComments.defaultProps = {
  comments: '',
  saveLater: false
}

export default FreeFormComments
