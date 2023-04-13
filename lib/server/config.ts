import fs from 'node:fs'
import { resolve } from 'node:path'
import { createDefu } from 'defu'
import { md5 } from './utils'

const applyDefaults = createDefu((obj, key, value) => {
  if (value === '') {
    return true
  }
})

const raw = JSON.parse(fs.readFileSync(resolve(process.cwd(), 'osmium-config.json'), 'utf-8'))
const config: Osmium.Config = applyDefaults(
  raw,
  {
    path: '/',
    ogImageGenerateURL: `${raw.link}/api/og-image?title=$title`,
    emailHash: raw.email && md5(raw.email),
  },
)

// Stripe out some private fields
const { databaseId, collectionId, email, ...clientConfig } = config

export {
  config,
  clientConfig,
}
