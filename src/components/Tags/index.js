import './index.css'

const Tags = props => {
  const {tagsList, activeTabId, isActive} = props
  const {displayText, optionId} = tagsList

  const handleActiveTab = () => {
    activeTabId(optionId)
  }

  const btnClass = isActive ? 'isActive-button' : 'tag-button'

  return (
    <li>
      <button type="button" className={btnClass} onClick={handleActiveTab}>
        {displayText}
      </button>
    </li>
  )
}
export default Tags
