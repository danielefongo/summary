module.exports = function(loader, toggl, timeSlotter, asker, config) {

  this.run = async () => {
    const moment = loader.load('moment')

    const granularity = await chooseGranularity(asker)
    const start = moment().startOf(granularity)
    const end = moment().endOf(granularity)
    const summary = await toggl.getSummary(start, end)

    summary.forEach(it => console.log(it.description))
  }

  this.help = () => {
    return "show a summary of tracked hours for all projects in the workspace"
  }
}

async function chooseGranularity(asker) {
  return asker.inquire('Select granularity', 'list', ['day', 'week', 'month', 'year'])
}