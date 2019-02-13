function Log(type: 'warn' | 'error' | 'debug' | 'info', ...messages: any[]) {
  console[type](...messages)
}

export default Log
