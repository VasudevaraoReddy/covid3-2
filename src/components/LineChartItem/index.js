/* eslint-disable consistent-return */
import {Component} from 'react'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'
import './index.css'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const lineGraphs = [
  {
    id: 'confirmed',
    color: '#ff073a',
  },
  {
    id: 'deceased',
    color: ' #6c757d',
  },
  {
    id: 'recovered',
    color: '#28a745',
  },
  {
    id: 'active',
    color: '#007bff',
  },
  {
    id: 'tested',
    color: '#9673B9',
  },
]

class LineChartItem extends Component {
  state = {allGraphData: []}

  componentDidMount() {
    this.getCovidTimeLineDetails()
  }

  numFormatter = num => {
    if (num > 999 && num < 1000000) {
      return `${(num / 1000).toFixed(1)}K` // convert to K for number from > 1000 < 1 million
    }
    if (num > 1000000) {
      return `${(num / 1000000).toFixed(1)}M` // convert to M for number from > 1 million
    }
    if (num < 900) {
      return num // if value < 1000, nothing to do
    }
  }

  numFormatter1 = each => {
    if (each.id === 'confirmed') {
      return (
        <YAxis
          stroke={each.color}
          tickFormatter={confirmed => this.numFormatter(confirmed)}
        />
      )
    }
    if (each.id === 'deceased') {
      return (
        <YAxis
          stroke={each.color}
          tickFormatter={deceased => this.numFormatter(deceased)}
        />
      )
    }
    if (each.id === 'recovered') {
      return (
        <YAxis
          stroke={each.color}
          tickFormatter={recovered => this.numFormatter(recovered)}
        />
      )
    }
    if (each.id === 'active') {
      return (
        <YAxis
          stroke={each.color}
          tickFormatter={active => this.numFormatter(active)}
        />
      )
    }
    if (each.id === 'tested') {
      return (
        <YAxis
          stroke={each.color}
          tickFormatter={tested => this.numFormatter(tested)}
        />
      )
    }
  }

  dateFormatter = d => {
    const monthFromDate = new Date(d).getMonth()
    return months[monthFromDate]
  }

  getCovidTimeLineDetails = async () => {
    const {sName} = this.props
    const graphData = []
    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${sName}`,
    )
    const data1 = await response.json()
    const datesFromResponse = data1[`${sName}`].dates
    const dateKeys = Object.keys(datesFromResponse)
    dateKeys.forEach(eachDateKey => {
      if (datesFromResponse[eachDateKey]) {
        const {total} = datesFromResponse[eachDateKey]
        const graphConfirmed = total.confirmed ? total.confirmed : 0
        const graphDeceased = total.deceased ? total.deceased : 0
        const graphRecovered = total.recovered ? total.recovered : 0
        const graphTested = total.tested ? total.tested : 0
        const graphDate = eachDateKey
        const graphVaccinated = total.vaccinated1
          ? total.vaccinated1 + total.vaccinated2
          : 0
        const combinedData = {
          confirmed: graphConfirmed,
          deceased: graphDeceased,
          recovered: graphRecovered,
          tested: graphTested,
          date: graphDate,
          vaccinated: graphVaccinated,
          active: graphConfirmed - (graphDeceased + graphRecovered),
        }
        graphData.push(combinedData)
      }
    })
    this.setState({allGraphData: graphData})
  }

  render() {
    const {allGraphData} = this.state
    return (
      <div>
        <div className="line-chart-ul-desktop">
          <BarChart data={allGraphData.slice(-10)} width={900} height={400}>
            <XAxis
              dataKey="date"
              tickFormatter={date => this.dateFormatter(date)}
              stroke="#ff073a"
            />
            <YAxis
              tickFormatter={confirmed => this.numFormatter(confirmed)}
              stroke="#ff073a"
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="confirmed" fill="#ff073a" className="bar" />
          </BarChart>
        </div>
        <div className="line-chart-ul-mobile">
          <BarChart data={allGraphData.slice(-10)} width={320} height={200}>
            <XAxis
              dataKey="date"
              tickFormatter={date => this.dateFormatter(date)}
              stroke="#ff073a"
            />
            <YAxis
              tickFormatter={confirmed => this.numFormatter(confirmed)}
              stroke="#ff073a"
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="confirmed" fill="#ff073a" className="bar" />
          </BarChart>
        </div>
        <ul className="line-chart-ul-desktop">
          {lineGraphs.map(each => (
            <li key={each.id} className={`graph-page-${each.id} li-line-chart`}>
              <LineChart data={allGraphData} width={900} height={300}>
                <XAxis
                  dataKey="date"
                  stroke={each.color}
                  tickCount={1}
                  tickFormatter={date => this.dateFormatter(date)}
                />
                {this.numFormatter1(each)}
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={each.id} stroke={each.color} />
              </LineChart>
            </li>
          ))}
        </ul>
        <ul className="line-chart-ul-mobile">
          {lineGraphs.map(each => (
            <li key={each.id} className={`graph-page-${each.id} li-line-chart`}>
              <LineChart data={allGraphData} width={320} height={200}>
                <XAxis
                  dataKey="date"
                  stroke={each.color}
                  tickCount={1}
                  tickFormatter={date => this.dateFormatter(date)}
                />
                {this.numFormatter1(each)}
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={each.id} stroke={each.color} />
              </LineChart>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default LineChartItem
