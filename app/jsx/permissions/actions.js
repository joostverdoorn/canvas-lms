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

import $ from 'jquery'
import I18n from 'i18n!permissions'
import {createActions} from 'redux-actions'

const types = ['UPDATE_PERMISSIONS_SEARCH']

const actions = createActions(...types)

actions.searchPermissions = function searchPermissions({permissionSearchString, contextType}) {
  return (dispatch, getState) => {
    dispatch(actions.updatePermissionsSearch({permissionSearchString, contextType}))
    const markedPermissions = getState().permissions
    const numDisplayedPermissions = markedPermissions.filter(p => p.displayed).length
    const message = I18n.t(
      {
        one: 'One permission found',
        other: '%{count} permissions found'
      },
      {count: numDisplayedPermissions}
    )
    $.screenReaderFlashMessageExclusive(message)
  }
}

const actionTypes = types.reduce((acc, type) => {
  acc[type] = type
  return acc
}, {})

export {actionTypes, actions as default}
