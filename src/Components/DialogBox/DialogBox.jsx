import { CircularProgress } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'

import { getSections } from '../../Services/API/sectionsRequest'

export default function DialogBox(props) {
  const navigate = useNavigate()
  const { onClose, selectedValue, open } = props
  const {
    isError: isSectionsError,
    isLoading: areSectionsLoading,
    data: sectionsData,
  } = useQuery(
    [
      'sections',
      props.value.department._id,
      props.value.program._id,
      props.value.session._id,
    ],
    () =>
      getSections(
        props.value.department._id,
        props.value.program._id,
        props.value.session._id,
      ),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: open,
    },
  )

  const handleClose = () => {
    onClose()
  }

  const handleListItemClick = value => {
    onClose()
    navigate(
      `/teacher/result-form?department=${props.value.department._id}&session=${props.value.session._id}&session_title=${props.value.session.session_title}&semester=${props.value.semester._id}&program=${props.value.program._id}&program_abbreviation=${props.value.program.program_abbreviation}&subject=${props.value.subject._id}&subject_title=${props.value.subject.subject_title}&section=${value._id}&section_title=${value.section_title}`,
    )
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Section</DialogTitle>
      {areSectionsLoading && <CircularProgress sx={{ margin: '0 auto' }} />}
      <List sx={{ pt: 0 }}>
        {sectionsData?.map(s => (
          <ListItem disableGutters key={s._id}>
            <ListItemButton onClick={() => handleListItemClick(s)} key={s._id}>
              <ListItemText primary={s.section_title.toUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}
