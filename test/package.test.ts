import { test } from 'vitest'
import { exec } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec)

test('Check @notionhq/client version', async () => {
  const { stdout } = await execPromise('npm list @notionhq/client')
  const match = stdout.match(/@notionhq\/client@(\S+)/)
  const version = match ? match[1] : ''
  test.is(version, '2.19.0')
})
