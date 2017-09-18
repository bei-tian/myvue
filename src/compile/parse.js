import { generate } from './codegen'

export function parse(template) {
  let code = generate(template)
  code = `with(this){return ${code}}`
  return new Function(code)
}

