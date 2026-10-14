import type { Register } from 'claude-code'

// Writes the configured message to ~/.claude/onyx-hello.txt each time a session
// starts, so we can see the mod was installed and that its option arrived.
export const register: Register = (on, options) => {
  on('session.start', async ($, e, next) => {
    try {
      const home = await $.env.get('HOME')
      const line = `${new Date().toISOString()} ${$.plugin.name}: ${String(options.message)}\n`
      await $.fs.write(`${home}/.claude/onyx-hello.txt`, line)
    } catch {}
    return next(e)
  })
}
