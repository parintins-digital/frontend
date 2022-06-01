import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import Button from '@mui/material/Button'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'

export interface ConfirmDialogueProps {
  open: (message?: string, confirmLabel?: string, denyLabel?: string) => void
  close: () => void
  onConfirm: (fn: (response: boolean) => void) => void
}

interface Message {
  content: string
  confirmLabel: string
  denyLabel: string
}

interface FunctionObject {
  onConfirm: (response: boolean) => void
}

const ConfirmDialogue: React.ForwardRefRenderFunction<ConfirmDialogueProps> = (
  _,
  ref
) => {
  const [open, setOpen] = useState(false)
  const [functionObject, setFunctionObject] = useState<FunctionObject>()
  const [message, setMessage] = useState<Message>({
    content: 'Deseja prosseguir com esta ação?',
    confirmLabel: 'CONFIRMAR',
    denyLabel: 'CANCELAR',
  })

  function handleConfirm(response: boolean) {
    functionObject?.onConfirm?.(response)
    handleClose()
  }

  const handleOpen = useCallback(
    (
      message = 'Deseja prosseguir com esta ação?',
      confirmLabel = 'CONFIRMAR',
      denyLabel = 'CANCELAR'
    ) => {
      setMessage({
        content: message,
        confirmLabel,
        denyLabel,
      })
      setOpen(true)
    },
    []
  )

  function handleOnConfirm(fn: (response: boolean) => void) {
    setFunctionObject({
      onConfirm: fn,
    })
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  useImperativeHandle<Record<string, any>, ConfirmDialogueProps>(ref, () => ({
    open: handleOpen,
    close: handleClose,
    onConfirm: handleOnConfirm,
  }))

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Deseja prosseguir com esta ação?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleConfirm(false)}>
          {message.denyLabel}
        </Button>
        <Button onClick={() => handleConfirm(true)} autoFocus>
          {message.confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default forwardRef(ConfirmDialogue)
