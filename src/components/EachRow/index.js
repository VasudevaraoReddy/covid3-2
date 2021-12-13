const EachRow = props => {
  const {details, onClickEachState} = props
  const {confirmed, name, active, deceased, recovered, population} = details
  const internationalNumberFormat = new Intl.NumberFormat('en-US')
  return (
    <tr onClick={event => onClickEachState(event, details)}>
      <td className="tro">{name}</td>
      <td className="tr1">{internationalNumberFormat.format(confirmed)}</td>
      <td className="tr2">{internationalNumberFormat.format(active)}</td>
      <td className="tr3">{internationalNumberFormat.format(recovered)}</td>
      <td className="tr4">{internationalNumberFormat.format(deceased)}</td>
      <td className="tr4">{internationalNumberFormat.format(population)}</td>
    </tr>
  )
}

export default EachRow
