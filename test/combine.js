import test from 'ava'
import fs from 'fs'
import combine from '../lib/combine'

test(async t => {
  let content = await combine({
    cdn: 'https://g.alicdn.com',
    repository: 'kissy/k',
    stableVersion: '1.4.0',
    greyVersion: '1.4.2',
    file: 'seed-min.js'
  })

  t.truthy(content)
})