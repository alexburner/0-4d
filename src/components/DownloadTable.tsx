import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FaDownload } from 'react-icons/fa'
import { TableItem } from '../data'
import { capitalize, downloadItems } from '../util'

/**
 * Assumption: tableItem.name is unique, and can be used as a primary key
 * (could also use compound keys, like name+device. Or just generate a local id)
 */
type SelectedNames = Set<TableItem['name']>

export const DownloadTable: FC<{ items: TableItem[] }> = ({ items }) => {
  const [selectedNames, setSelectedNames] = useState<SelectedNames>(new Set())

  /**
   * Toggle an item's selected state, by name
   */
  const toggleName = (name: TableItem['name']) => {
    const nextSelectedNames = new Set(selectedNames)
    nextSelectedNames.has(name)
      ? nextSelectedNames.delete(name)
      : nextSelectedNames.add(name)
    setSelectedNames(nextSelectedNames)
  }

  /**
   * Download selected items
   */
  const downloadSelectedItems = () => {
    const selectedItems = items.filter((item) => selectedNames.has(item.name))
    downloadItems(selectedItems)
  }

  return (
    <div className="download-table">
      <div className="header">
        <div className="select-all">
          <SelectAllCheckbox
            allNames={items.map((item) => item.name)}
            selectedNames={selectedNames}
            setSelectedNames={setSelectedNames}
          />
        </div>
        {selectedNames.size > 0 && (
          <div>
            <button onClick={downloadSelectedItems}>
              <FaDownload />
              &nbsp; Download Selected
            </button>
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.name}
              className={selectedNames.has(item.name) ? 'selected' : ''}
              onClick={() => toggleName(item.name)}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedNames.has(item.name)}
                  onChange={() => toggleName(item.name)}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.device}</td>
              <td>{item.path}</td>
              <td>
                <StatusCell status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const SelectAllCheckbox: FC<{
  allNames: TableItem['name'][]
  selectedNames: SelectedNames
  setSelectedNames: Dispatch<SetStateAction<SelectedNames>>
}> = ({ allNames, selectedNames, setSelectedNames }) => {
  const checkboxRef = useRef<HTMLInputElement>(null)

  const allNamesSelected = selectedNames.size === allNames.length
  const someNamesSelected = !allNamesSelected && selectedNames.size > 0

  useEffect(() => {
    if (!checkboxRef.current) return
    // Set checkbox as "indeterminate" if only some items are selected
    // Note: indeterminate is a prop, not an attr, so we use an el ref
    // -> https://stackoverflow.com/a/52859693
    checkboxRef.current.indeterminate = someNamesSelected
  }, [someNamesSelected])

  return (
    <label>
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={allNamesSelected}
        onChange={(e) => {
          // Select all or none
          e.target.checked
            ? setSelectedNames(new Set(allNames))
            : setSelectedNames(new Set())
        }}
      />
      &nbsp;{' '}
      {allNamesSelected
        ? 'All Selected'
        : someNamesSelected
        ? `Selected ${selectedNames.size}`
        : 'None Selected'}
    </label>
  )
}

const StatusCell: FC<{ status: TableItem['status'] }> = ({ status }) => (
  <div className="status-cell">
    {capitalize(status)}
    {status === 'available' && <div className="available-dot" />}
  </div>
)
