import { Alert } from '@blueprintjs/core'
import { useThemeContext } from '../../../../contexts/useThemeContext'
import { Connection } from '../../../../lib/clickhouse-clients'
import { getConnectionDisplay } from '../../../../lib/connections-helpers'

type Props = {
  handleAlertClose: () => void
  handleConfirmRemove: () => void
  isAlertOpen: boolean
  selectedConnetionToDelete?: Connection
}

export default function RemoveConnectionAlert({ handleAlertClose, handleConfirmRemove, isAlertOpen, selectedConnetionToDelete }: Props) {
  const { bpTheme } = useThemeContext()
  return (
    <Alert
      className={bpTheme}
      cancelButtonText="Cancel"
      confirmButtonText="Remove"
      icon="trash"
      intent="danger"
      isOpen={isAlertOpen}
      onCancel={handleAlertClose}
      onConfirm={handleConfirmRemove}
    >
      <p>
        You are going to delete "
        {getConnectionDisplay({ connection: selectedConnetionToDelete })}"
        connection.
      </p>
      <p>Are you sure you want to remove this connection?</p>
    </Alert>
  )
}
