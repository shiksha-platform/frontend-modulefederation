import posthog from 'posthog-js'

export const capture = (event, data) => {
  posthog.init(process.env.PH_PROJECT_API_KEY, {
    api_host: process.env.PH_INSTANCE_ADDRESS,
    autocapture: false
  })
  if (event !== 'PAGE') {
    posthog.capture(event, data)
  }
}
